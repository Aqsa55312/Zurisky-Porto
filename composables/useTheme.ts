export function useTheme() {
  const colorMode = useColorMode()

  const isDark = computed<boolean>({
    get: () => colorMode.value === 'dark',
    set: (v: boolean) => {
      colorMode.preference = v ? 'dark' : 'light'
    }
  })

  const toggleTheme = (): void => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  return { colorMode, isDark, toggleTheme }
}
