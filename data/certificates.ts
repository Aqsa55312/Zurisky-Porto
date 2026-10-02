import type { Certificate } from '~/types'

/**
 * Real credentials — verified against the actual certificate documents.
 * Images live in public/images/certificates/
 */
export const certificates: Certificate[] = [
  {
    slug: 'magang-telkom-infranexia',
    title: 'Sertifikat Magang Kerja — PT Telkom Infrastruktur Indonesia',
    titleId: 'Sertifikat Magang Kerja — PT Telkom Infrastruktur Indonesia',
    issuer: 'PT Telkom Infrastruktur Indonesia (InfraNexia)',
    year: '2026',
    image: '/images/certificates/magang-telkom-infranexia.webp',
    imageAlt: 'Sertifikat Magang Kerja Telkom Infrastruktur Indonesia - Zurisky Aqsa Firmansyah',
    credentialUrl: null,
    credentialId: 'Tel.084/PS000/JIFC-1D00000/2026',
    skills: ['AI Development', 'Machine Learning', 'Data Analysis', 'Python'],
    featured: true
  },
  {
    slug: 'it-ai-agent-programming',
    title: 'IT - AI Agent for Programming',
    titleId: 'IT - AI Agent for Programming',
    issuer: 'Hacktiv8 Indonesia × IBM SkillsBuild',
    year: '2026',
    image: '/images/certificates/it-ai-agent-programming.webp',
    imageAlt: 'IT AI Agent for Programming certificate from Hacktiv8 and IBM SkillsBuild',
    credentialUrl: null,
    credentialId: '01442/H8/CSR/ISUE/V/2026',
    skills: ['AI Agents', 'Agentic Development', 'IBM SkillsBuild', 'Python'],
    featured: true
  },
  {
    slug: 'maju-bareng-ai',
    title: 'AI Productivity & AI API Integration for Developers',
    titleId: 'AI Productivity & AI API Integration for Developers',
    issuer: 'Hacktiv8 Indonesia (Maju Bareng AI / Google.org)',
    year: '2026',
    image: '/images/certificates/maju-bareng-ai-hacktiv8.webp',
    imageAlt: 'Maju Bareng AI certificate from Hacktiv8 Indonesia',
    credentialUrl: null,
    credentialId: '03080/H8/CSR/MBA2/V/2026',
    skills: ['AI Productivity', 'AI API Integration', 'Gemini API', 'Python'],
    featured: true
  },
  {
    slug: 'ibm-phase-2',
    title: 'IBM SkillsBuild University Education (IBM - Phase 2)',
    titleId: 'IBM SkillsBuild University Education (IBM - Phase 2)',
    issuer: 'Hacktiv8 Indonesia × IBM SkillsBuild',
    year: '2026',
    image: '/images/certificates/ibm-phase-2.webp',
    imageAlt: 'IBM Phase 2 certificate from Hacktiv8 Indonesia and IBM SkillsBuild',
    credentialUrl: null,
    credentialId: '00008/H8/CSR/ISUE/V/2026',
    skills: ['Artificial Intelligence', 'Data Science', 'IBM SkillsBuild'],
    featured: true
  },
  {
    slug: 'ibm-ai-agents',
    title: 'Unleashing the Power of AI Agents',
    titleId: 'Unleashing the Power of AI Agents',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    image: '/images/certificates/ibm-ai-agents.webp',
    imageAlt: 'Unleashing the Power of AI Agents certificate from IBM SkillsBuild',
    credentialUrl: null,
    credentialId: 'ALM-COURSE_3825456',
    skills: ['AI Agents', 'Autonomous AI', 'IBM SkillsBuild'],
    featured: false
  },
  {
    slug: 'ibm-intro-llm',
    title: 'Introduction to Large Language Models',
    titleId: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    image: '/images/certificates/ibm-intro-llm.webp',
    imageAlt: 'Introduction to Large Language Models certificate from IBM SkillsBuild',
    credentialUrl: null,
    credentialId: 'ALM-COURSE_4064939',
    skills: ['LLM', 'Generative AI', 'IBM SkillsBuild'],
    featured: false
  },
  {
    slug: 'ibm-ai-healthcare',
    title: 'AI in Healthcare: Improving Care and Efficiency',
    titleId: 'AI in Healthcare: Improving Care and Efficiency',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    image: '/images/certificates/ibm-ai-healthcare.webp',
    imageAlt: 'AI in Healthcare certificate from IBM SkillsBuild',
    credentialUrl: null,
    credentialId: 'ALM-COURSE_3947375',
    skills: ['AI in Healthcare', 'Health Tech', 'IBM SkillsBuild'],
    featured: false
  }
]

export const featuredCertificates = (limit = 4): Certificate[] =>
  certificates.filter((c) => c.featured).slice(0, limit)
