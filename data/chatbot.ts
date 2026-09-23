/**
 * Dummy chatbot brain — local rule-based answers, no backend.
 * Every answer has English + Indonesian variants.
 * Edit keywords/answers here to change bot behavior.
 */

export interface ChatAnswer {
  en: string
  id: string
}

export interface ChatIntent {
  id: string
  keywords: string[]
  answer: ChatAnswer
}

export interface QuickReply {
  en: string
  id: string
}

export const chatWelcome: ChatAnswer = {
  en: "Hi! I'm Zurisky AI — ask me about skills, experience, projects, or how to contact Zurisky.",
  id: 'Halo! Saya Zurisky AI — tanya saya tentang keahlian, pengalaman, proyek, atau cara menghubungi Zurisky.'
}

export const chatQuickReplies: QuickReply[] = [
  { en: 'What are his skills?', id: 'Apa keahliannya?' },
  { en: 'Show projects', id: 'Lihat proyek' },
  { en: 'Work experience', id: 'Pengalaman kerja' },
  { en: 'Contact info', id: 'Info kontak' }
]

export const chatFallback: ChatAnswer = {
  en: 'I can help with topics like skills, experience, projects, education, or contact info. What would you like to know?',
  id: 'Saya bisa bantu soal keahlian, pengalaman, proyek, pendidikan, atau info kontak. Mau tahu yang mana?'
}

export const chatIntents: ChatIntent[] = [
  {
    id: 'greeting',
    keywords: ['halo', 'hello', 'hi', 'hey', 'hai', 'pagi', 'siang', 'sore', 'malam', 'yo ', 'assalamu'],
    answer: {
      en: 'Hello! Great to see you here. Want to know about skills, projects, or experience?',
      id: 'Halo! Senang bertemu di sini. Mau tahu tentang keahlian, proyek, atau pengalaman?'
    }
  },
  {
    id: 'who',
    keywords: ['siapa', 'who', 'tentang', 'about', 'profil', 'profile', 'owner', 'kamu siapa', 'background', 'dirimu', 'yourself'],
    answer: {
      en: 'Zurisky Aqsa Firmansyah is a Full-Stack Developer & AI Enthusiast from Bandung, Indonesia — an Informatics Engineering student at ULBI focused on backend, APIs, and applied AI.',
      id: 'Zurisky Aqsa Firmansyah adalah Full-Stack Developer & AI Enthusiast dari Bandung — mahasiswa Teknik Informatika ULBI yang fokus pada backend, API, dan AI terapan.'
    }
  },
  {
    id: 'skills',
    keywords: ['skill', 'keahlian', 'teknologi', 'tech', 'stack', 'bisa apa', 'menguasai', 'bahasa', 'framework', 'mampu'],
    answer: {
      en: 'Core stack: TypeScript, React, Vue/Nuxt, Laravel, Go, Flask, PostgreSQL, MySQL, Flutter — plus AI (OCR, LLMs, Computer Vision). Full breakdown with proficiency bars is in the Tech Stack section!',
      id: 'Stack inti: TypeScript, React, Vue/Nuxt, Laravel, Go, Flask, PostgreSQL, MySQL, Flutter — plus AI (OCR, LLM, Computer Vision). Rincian lengkap dengan bar proficiency ada di bagian Tech Stack!'
    }
  },
  {
    id: 'experience',
    keywords: ['pengalaman', 'experience', 'kerja', 'work', 'magang', 'intern', 'perusahaan', 'company', 'karir', 'career', 'kantor', 'job'],
    answer: {
      en: '5 professional roles: Nose Herbalindo (React + Golang), Telkom Indonesia (AI Developer, 92% NSQ accuracy), Asadel Liamsindo (LabView AI), PixelDege (12+ client projects), and PT POS (Flask + MySQL). See the Experience timeline for metrics!',
      id: '5 peran profesional: Nose Herbalindo (React + Golang), Telkom Indonesia (AI Developer, akurasi NSQ 92%), Asadel Liamsindo (LabView AI), PixelDege (12+ proyek klien), dan PT POS (Flask + MySQL). Lihat timeline Experience untuk metriknya!'
    }
  },
  {
    id: 'projects',
    keywords: ['proyek', 'project', 'portofolio', 'portfolio', 'karya', 'aplikasi', 'dibuat', 'built', 'app'],
    answer: {
      en: 'Featured works: Multi-Platform E-Commerce System (Laravel + Flutter), HealthLens AI (OCR + AI lab interpretation), PUMK/TJSL Dashboard, Gudang Pro inventory, and KineticView AI vision. Open the Projects page for case studies!',
      id: 'Karya unggulan: Multi-Platform E-Commerce System (Laravel + Flutter), HealthLens AI (interpretasi lab OCR + AI), Dashboard PUMK/TJSL, Gudang Pro inventory, dan KineticView AI vision. Buka halaman Projects untuk studi kasusnya!'
    }
  },
  {
    id: 'health',
    keywords: ['healthlens', 'labview', 'kesehatan', 'health', 'lab', 'ocr'],
    answer: {
      en: 'HealthLens / LabView AI turns lab-result photos into structured data with Tesseract OCR + Gemini AI, shown in a health dashboard (React, Capacitor, Firebase) — cutting interpretation time by 70%.',
      id: 'HealthLens / LabView AI mengubah foto hasil lab menjadi data terstruktur dengan Tesseract OCR + Gemini AI dalam dashboard kesehatan (React, Capacitor, Firebase) — memangkas waktu interpretasi hingga 70%.'
    }
  },
  {
    id: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'toko', 'shop', 'jualan', 'cart', 'belanja'],
    answer: {
      en: 'The Multi-Platform E-Commerce System uses Laravel + MySQL with JWT-secured REST APIs, a React.js web client, and a Flutter mobile app for real-time shopping on both platforms.',
      id: 'Multi-Platform E-Commerce System memakai Laravel + MySQL dengan REST API ber-JWT, klien web React.js, dan aplikasi mobile Flutter untuk belanja real-time di kedua platform.'
    }
  },
  {
    id: 'education',
    keywords: ['pendidikan', 'education', 'kuliah', 'kampus', 'universitas', 'ulbi', 'gpa', 'ipk', 'studi', 'study', 'sekolah', 'school', 'degree'],
    answer: {
      en: 'Diploma in Informatics Engineering at Universitas Logistik dan Bisnis Internasional (ULBI), Bandung — GPA 3.50/4.00, since Sep 2023. Notable: math quiz app, Warjo food website, Himajas e-canteen.',
      id: 'Diploma Teknik Informatika di Universitas Logistik dan Bisnis Internasional (ULBI), Bandung — IPK 3,50/4,00 sejak Sep 2023. Penting: aplikasi kuis matematika, website Warjo food, e-canteen Himajas.'
    }
  },
  {
    id: 'organization',
    keywords: ['organisasi', 'organization', 'mpm', 'novo', 'komisi', 'bem', 'ukm', 'kema'],
    answer: {
      en: 'Coordinator of Commission 2 at MPM KEMA (leading 8 members, 40% faster reporting) and former Novo Club member (leadership & public speaking workshops).',
      id: 'Koordinator Komisi 2 di MPM KEMA (memimpin 8 anggota, pelaporan 40% lebih cepat) dan mantan anggota Novo Club (workshop kepemimpinan & public speaking).'
    }
  },
  {
    id: 'contact',
    keywords: ['kontak', 'contact', 'hubungi', 'email', 'telepon', 'phone', 'whatsapp', 'linkedin', 'github', 'nomor', 'number'],
    answer: {
      en: 'Reach him at zurizky.ayudish7@gmail.com, +62 838-3010-4314, GitHub: github.com/Aqsa55312, LinkedIn: linkedin.com/in/zurisky-aqsa-firmansyah. Or hit "Get In Touch" in the Contact section!',
      id: 'Hubungi di zurizky.ayudish7@gmail.com, +62 838-3010-4314, GitHub: github.com/Aqsa55312, LinkedIn: linkedin.com/in/zurisky-aqsa-firmansyah. Atau klik "Hubungi Saya" di bagian Contact!'
    }
  },
  {
    id: 'cv',
    keywords: ['cv', 'resume', 'download', 'lamaran'],
    answer: {
      en: 'You can download his CV with the "Download CV" button in the navbar, hero, or mobile menu!',
      id: 'Anda bisa mengunduh CV-nya lewat tombol "Unduh CV" di navbar, hero, atau menu mobile!'
    }
  },
  {
    id: 'hire',
    keywords: ['hire', 'freelance', 'jasa', 'bayar', 'price', 'harga', 'gaji', 'salary', 'rekrut', 'recruit', 'kerja sama', 'kolaborasi', 'collab'],
    answer: {
      en: 'He is open to full-stack engineering, AI development, and collaborative projects. Best next step: send an email or LinkedIn message via the Contact section!',
      id: 'Ia terbuka untuk full-stack engineering, pengembangan AI, dan proyek kolaboratif. Langkah terbaik: kirim email atau pesan LinkedIn lewat bagian Contact!'
    }
  },
  {
    id: 'ai',
    keywords: ['artificial', 'kecerdasan', 'machine learning', 'computer vision', 'llm', 'gemini', 'tesseract'],
    answer: {
      en: 'His AI focus: OCR pipelines, LLM integration (Gemini/OpenRouter), and Computer Vision including object detection — applied in HealthLens, LabView AI, and KineticView AI.',
      id: 'Fokus AI-nya: pipeline OCR, integrasi LLM (Gemini/OpenRouter), dan Computer Vision termasuk object detection — diterapkan di HealthLens, LabView AI, dan KineticView AI.'
    }
  },
  {
    id: 'thanks',
    keywords: ['terima kasih', 'thanks', 'thank', 'makasih', 'thankyou', 'oke', 'ok ', 'okay', 'sip', 'mantap', 'bagus'],
    answer: {
      en: "You're welcome! Anything else — projects, skills, or contact info?",
      id: 'Sama-sama! Ada lagi — proyek, keahlian, atau info kontak?'
    }
  },
  {
    id: 'bye',
    keywords: ['dadah', 'bye', 'sampai jumpa', 'see you', 'daag'],
    answer: {
      en: 'See you! Good luck — and don’t forget to check the Projects page.',
      id: 'Sampai jumpa! Semoga beruntung — dan jangan lupa cek halaman Projects.'
    }
  }
]

/** First intent whose keyword appears in the message wins; else null. */
export function matchIntent(message: string): ChatIntent | null {
  const text = ` ${message.toLowerCase()} `
  for (const intent of chatIntents) {
    const hit = intent.keywords.some((k) => {
      const key = k.toLowerCase().trim()
      // Short keywords use word boundaries so "hi" doesn't match "machine".
      if (key.length <= 3) {
        return new RegExp(`\\b${key}\\b`).test(text)
      }
      return text.includes(key)
    })
    if (hit) return intent
  }
  return null
}
