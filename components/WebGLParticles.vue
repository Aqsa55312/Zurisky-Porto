<template>
  <canvas
    v-if="supported"
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 -z-[5] h-full w-full"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
/**
 * Global WebGL particle field (raw WebGL, no library).
 * Soft glowing dots in brand colors drifting slowly upward with twinkle.
 * Palette follows the active route (home / projects / project category)
 * with smooth color lerping. Pauses when the tab is hidden; static single
 * frame for prefers-reduced-motion; lighter load on touch devices.
 */
type RGB = [number, number, number]

const PALETTES: Record<string, RGB[]> = {
  home: [
    [0.55, 0.36, 0.98],
    [0.06, 0.73, 0.51],
    [0.23, 0.51, 0.96]
  ],
  ocean: [
    [0.23, 0.51, 0.96],
    [0.13, 0.83, 0.93],
    [0.55, 0.36, 0.98]
  ],
  aurora: [
    [0.06, 0.73, 0.51],
    [0.55, 0.36, 0.98],
    [0.23, 0.51, 0.96]
  ],
  indigo: [
    [0.39, 0.4, 0.95],
    [0.23, 0.51, 0.96],
    [0.55, 0.36, 0.98]
  ]
}

const VS = `
attribute vec2 aPos;
attribute float aSize;
attribute vec3 aColor;
attribute vec3 aMisc;
uniform vec2 uRes;
uniform float uTime;
uniform float uPR;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  clip.y *= -1.0;
  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = aSize * uPR;
  vColor = aColor;
  vAlpha = aMisc.y * (0.6 + 0.4 * sin(uTime * aMisc.z + aMisc.x));
}
`.trim()

const FS = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.08, d) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a);
}
`.trim()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const supported = ref(true)
const route = useRoute()
const colorMode = useColorMode()
const { getProjectBySlug } = useProjects()

const paletteKey = computed<string>(() => {
  if (route.name === 'projects') return 'ocean'
  const slug = route.params.slug
  if (typeof slug === 'string' && slug.length > 0) {
    const cats = getProjectBySlug(slug)?.category ?? []
    if (cats.includes('AI')) return 'aurora'
    if (cats.includes('Mobile')) return 'home'
    if (cats.includes('Dashboard')) return 'ocean'
    return 'indigo'
  }
  return 'home'
})

let raf = 0
let stopLoop: (() => void) | null = null

interface P {
  x: number
  y: number
  size: number
  vy: number
  swayAmp: number
  swayFreq: number
  phase: number
  alpha: number
  twinkle: number
  ci: number
  bright: number
}

function compile(glc: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = glc.createShader(type)
  if (!sh) return null
  glc.shaderSource(sh, src)
  glc.compileShader(sh)
  if (!glc.getShaderParameter(sh, glc.COMPILE_STATUS)) {
    glc.deleteShader(sh)
    return null
  }
  return sh
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const glc = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false })
  if (!glc) {
    supported.value = false
    return
  }

  const vs = compile(glc, glc.VERTEX_SHADER, VS)
  const fs = compile(glc, glc.FRAGMENT_SHADER, FS)
  if (!vs || !fs) {
    supported.value = false
    return
  }
  const prog = glc.createProgram()
  if (!prog) {
    supported.value = false
    return
  }
  glc.attachShader(prog, vs)
  glc.attachShader(prog, fs)
  glc.linkProgram(prog)
  if (!glc.getProgramParameter(prog, glc.LINK_STATUS)) {
    supported.value = false
    return
  }
  glc.useProgram(prog)

  const loc = {
    aPos: glc.getAttribLocation(prog, 'aPos'),
    aSize: glc.getAttribLocation(prog, 'aSize'),
    aColor: glc.getAttribLocation(prog, 'aColor'),
    aMisc: glc.getAttribLocation(prog, 'aMisc'),
    uRes: glc.getUniformLocation(prog, 'uRes'),
    uTime: glc.getUniformLocation(prog, 'uTime'),
    uPR: glc.getUniformLocation(prog, 'uPR')
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches

  let W = 0
  let H = 0
  let parts: P[] = []
  let posBuf: WebGLBuffer | null = null
  let colBuf: WebGLBuffer | null = null
  const posArr = new Float32Array(0)
  const colArr = new Float32Array(0)
  let posData = posArr
  let colData = colArr

  const seed = (): void => {
    const area = W * H
    let n = Math.floor(area / 16000)
    n = Math.max(35, Math.min(110, n))
    if (coarse) n = Math.floor(n * 0.5)
    parts = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 1.6 + Math.random() * 2.6,
      vy: 6 + Math.random() * 14,
      swayAmp: 8 + Math.random() * 18,
      swayFreq: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.45 + Math.random() * 0.4,
      twinkle: 0.6 + Math.random() * 1.4,
      ci: i % 3,
      bright: 0.85 + Math.random() * 0.3
    }))
    posData = new Float32Array(n * 2)
    colData = new Float32Array(n * 3)
    if (posBuf) glc.deleteBuffer(posBuf)
    if (colBuf) glc.deleteBuffer(colBuf)
    posBuf = glc.createBuffer()
    colBuf = glc.createBuffer()
  }

  const resize = (): void => {
    const pr = Math.min(window.devicePixelRatio || 1, 1.5)
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = Math.floor(W * pr)
    canvas.height = Math.floor(H * pr)
    glc.viewport(0, 0, canvas.width, canvas.height)
    glc.uniform2f(loc.uRes, W, H)
    glc.uniform1f(loc.uPR, pr)
    seed()
  }

  const cur: RGB[] = [
    [...(PALETTES.home[0] as RGB)],
    [...(PALETTES.home[1] as RGB)],
    [...(PALETTES.home[2] as RGB)]
  ]

  const applyBlending = (): void => {
    if (colorMode.value === 'dark') {
      glc.blendFunc(glc.SRC_ALPHA, glc.ONE)
    } else {
      glc.blendFunc(glc.SRC_ALPHA, glc.ONE_MINUS_SRC_ALPHA)
    }
  }

  const render = (t: number): void => {
    const tgt = PALETTES[paletteKey.value] ?? PALETTES.home
    const tone = colorMode.value === 'dark' ? 1 : 0.72
    for (let k = 0; k < 3; k++) {
      const c = cur[k] as RGB
      const g = (tgt[k] ?? tgt[0]) as RGB
      c[0] += (g[0] - c[0]) * 0.04
      c[1] += (g[1] - c[1]) * 0.04
      c[2] += (g[2] - c[2]) * 0.04
    }
    const dt = 1 / 60
    const time = t / 1000
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i] as P
      p.y -= p.vy * dt
      if (p.y < -12) {
        p.y = H + 12
        p.x = Math.random() * W
      }
      posData[i * 2] = p.x + Math.sin(time * p.swayFreq + p.phase) * p.swayAmp
      posData[i * 2 + 1] = p.y
      const c = cur[p.ci] as RGB
      colData[i * 3] = Math.min(1, c[0] * p.bright * tone)
      colData[i * 3 + 1] = Math.min(1, c[1] * p.bright * tone)
      colData[i * 3 + 2] = Math.min(1, c[2] * p.bright * tone)
    }
    glc.clearColor(0, 0, 0, 0)
    glc.clear(glc.COLOR_BUFFER_BIT)
    glc.uniform1f(loc.uTime, time)
    glc.bindBuffer(glc.ARRAY_BUFFER, posBuf)
    glc.bufferData(glc.ARRAY_BUFFER, posData, glc.DYNAMIC_DRAW)
    glc.enableVertexAttribArray(loc.aPos)
    glc.vertexAttribPointer(loc.aPos, 2, glc.FLOAT, false, 0, 0)
    glc.bindBuffer(glc.ARRAY_BUFFER, colBuf)
    glc.bufferData(glc.ARRAY_BUFFER, colData, glc.DYNAMIC_DRAW)
    glc.enableVertexAttribArray(loc.aColor)
    glc.vertexAttribPointer(loc.aColor, 3, glc.FLOAT, false, 0, 0)
    glc.drawArrays(glc.POINTS, 0, parts.length)
  }

  // Static attribute buffers (size / color-base / misc), refreshed on reseed.
  let sizeBuf: WebGLBuffer | null = null
  let miscBuf: WebGLBuffer | null = null
  const bindStatic = (): void => {
    const n = parts.length
    const sizes = new Float32Array(n)
    const misc = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const p = parts[i] as P
      sizes[i] = p.size
      misc[i * 3] = p.phase
      misc[i * 3 + 1] = p.alpha * (colorMode.value === 'dark' ? 1 : 0.8)
      misc[i * 3 + 2] = p.twinkle
    }
    if (sizeBuf) glc.deleteBuffer(sizeBuf)
    if (miscBuf) glc.deleteBuffer(miscBuf)
    sizeBuf = glc.createBuffer()
    miscBuf = glc.createBuffer()
    glc.bindBuffer(glc.ARRAY_BUFFER, sizeBuf)
    glc.bufferData(glc.ARRAY_BUFFER, sizes, glc.STATIC_DRAW)
    glc.enableVertexAttribArray(loc.aSize)
    glc.vertexAttribPointer(loc.aSize, 1, glc.FLOAT, false, 0, 0)
    glc.bindBuffer(glc.ARRAY_BUFFER, miscBuf)
    glc.bufferData(glc.ARRAY_BUFFER, misc, glc.STATIC_DRAW)
    glc.enableVertexAttribArray(loc.aMisc)
    glc.vertexAttribPointer(loc.aMisc, 3, glc.FLOAT, false, 0, 0)
  }

  applyBlending()
  resize()
  bindStatic()

  // Route/theme changes re-tint + re-blend on next frames automatically.
  const stopWatch = watch([paletteKey, () => colorMode.value], () => {
    applyBlending()
    bindStatic()
  })

  if (reduced) {
    render(0)
  } else {
    let running = true
    const loop = (t: number): void => {
      if (!running) return
      render(t)
      raf = requestAnimationFrame(loop)
    }
    const onVis = (): void => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(loop)
    stopLoop = () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
    }
  }

  const onResize = (): void => {
    resize()
    bindStatic()
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    stopWatch()
    window.removeEventListener('resize', onResize)
    if (stopLoop) stopLoop()
    cancelAnimationFrame(raf)
    const ext = glc.getExtension('WEBGL_lose_context')
    if (ext) ext.loseContext()
  })
})
</script>
