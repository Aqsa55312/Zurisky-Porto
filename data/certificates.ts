import type { Certificate } from '~/types'

/**
 * Certificates — EMPTY until the owner provides real credentials.
 * Only genuine certificates go here. The Certificates section, nav link,
 * and footer link render ONLY when this array is non-empty.
 *
 * To add one:
 * 1. Drop the image (WebP/PNG/JPG) into public/images/certificates/
 *    e.g. public/images/certificates/aws-cloud-practitioner.webp
 * 2. Append an entry below (copy the commented example).
 *
 * // {
 * //   slug: 'aws-cloud-practitioner',
 * //   title: 'AWS Certified Cloud Practitioner',
 * //   issuer: 'Amazon Web Services',
 * //   year: '2025',
 * //   image: '/images/certificates/aws-cloud-practitioner.webp',
 * //   imageAlt: 'AWS Certified Cloud Practitioner certificate',
 * //   credentialUrl: 'https://www.credly.com/badges/REPLACE_WITH_REAL_ID',
 * //   credentialId: 'REPLACE_WITH_REAL_ID',
 * //   skills: ['Cloud', 'AWS'],
 * //   featured: true
 * // },
 */
export const certificates: Certificate[] = [
  // ── DUMMY DATA — replace with real credentials, then delete `sample: true` ──
  {
    slug: 'belajar-dasar-pemrograman-web',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    image: '/images/certificates/cert-dummy-1.webp',
    imageAlt: 'Sample web programming certificate artwork',
    credentialUrl: null,
    credentialId: null,
    skills: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    sample: true
  },
  {
    slug: 'belajar-membuat-aplikasi-flutter',
    title: 'Belajar Membuat Aplikasi Flutter',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    image: '/images/certificates/cert-dummy-2.webp',
    imageAlt: 'Sample Flutter certificate artwork',
    credentialUrl: null,
    credentialId: null,
    skills: ['Flutter', 'Dart'],
    featured: true,
    sample: true
  },
  {
    slug: 'machine-learning-foundations',
    title: 'Machine Learning Foundations',
    issuer: 'Coursera',
    year: '2025',
    image: '/images/certificates/cert-dummy-3.webp',
    imageAlt: 'Sample machine learning certificate artwork',
    credentialUrl: null,
    credentialId: null,
    skills: ['Machine Learning', 'Python'],
    featured: true,
    sample: true
  }
]

export const featuredCertificates = (limit = 3): Certificate[] =>
  certificates.filter((c) => c.featured).slice(0, limit)
