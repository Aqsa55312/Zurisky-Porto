import type { SkillCategory } from '~/types'

/**
 * NOTE (owner): `levels` are self-assessed proficiency estimates (0-100).
 * Adjust any number to match your own assessment — bars update automatically.
 * Skills without a level render as plain chips (e.g. Soft Skills).
 */
export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    technologies: ['Java (OOP)', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'c', 'c#', 'Go', 'kotlin', 'swift', 'Dart'],
    levels: {
      'Java (OOP)': 75, Python: 88, 'JavaScript (ES6+)': 90, TypeScript: 86,
      c: 65, 'c#': 68, Go: 82, kotlin: 70, swift: 65, Dart: 78
    }
  },
  {
    name: 'Frontend',
    technologies: ['Next.js', 'Vue.js', 'React.js', 'Tailwind CSS', 'Bootstrap', 'HTML', 'CSS', 'JavaScript (ES6+)', 'TypeScript', 'Dart'],
    levels: {
      'Next.js': 80, 'Vue.js': 90, 'React.js': 92, 'Tailwind CSS': 90, Bootstrap: 78,
      HTML: 92, CSS: 88, 'JavaScript (ES6+)': 90, TypeScript: 86, Dart: 78
    }
  },
  {
    name: 'Backend',
    technologies: ['Laravel', 'NestJS', 'PHP', 'Flask', 'Golang', 'Express', 'SpringBoot', 'FastAPI', 'Node.js', 'Symfony', 'Django'],
    levels: {
      Laravel: 88, NestJS: 78, PHP: 85, Flask: 90, Golang: 86, Express: 80,
      SpringBoot: 70, FastAPI: 82, 'Node.js': 84, Symfony: 68, Django: 72
    }
  },
  {
    name: 'Mobile',
    technologies: ['Flutter', 'Capacitor', 'Android Studio (Native)', 'Ionic', 'kotlin', 'Swift', 'react native'],
    levels: {
      Flutter: 84, Capacitor: 80, 'Android Studio (Native)': 70, Ionic: 65,
      kotlin: 70, Swift: 65, 'react native': 72
    }
  },
  {
    name: 'Databases',
    technologies: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Firebase/Firestore', 'Supabase', 'SQLServer'],
    levels: {
      PostgreSQL: 88, MySQL: 90, SQLite: 80, MongoDB: 78, Redis: 82,
      'Firebase/Firestore': 84, Supabase: 76, SQLServer: 70
    }
  },
  {
    name: 'API & Security',
    technologies: ['RESTful API Design', 'JWT', 'OAuth', 'Postman', 'OpenAPI'],
    levels: { 'RESTful API Design': 90, JWT: 88, OAuth: 78, Postman: 92, OpenAPI: 80 }
  },
  {
    name: 'Architecture & Tools',
    technologies: ['MVC', 'SOA', 'Agile Kanban', 'Scrum', 'Git/GitHub', 'Docker'],
    levels: { MVC: 85, SOA: 75, 'Agile Kanban': 88, Scrum: 88, 'Git/GitHub': 90, Docker: 84 }
  },
  {
    name: 'AI & Data',
    technologies: ['Computer Vision', 'Machine Learning workflows', 'Tesseract OCR', 'Gemini 2.5 Flash integration'],
    levels: {
      'Computer Vision': 86, 'Machine Learning workflows': 80,
      'Tesseract OCR': 88, 'Gemini 2.5 Flash integration': 85
    }
  },
  {
    name: 'Soft Skills',
    technologies: [
      'Leadership',
      'Team Management',
      'Communication',
      'Negotiation',
      'Critical Thinking',
      'Problem Solving',
      'Time Management',
      'Adaptability',
      'Detail Oriented'
    ]
  }
]
