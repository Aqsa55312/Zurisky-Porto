export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  description: string
  descriptionId?: string
  longDescription?: string
  longDescriptionId?: string
  category: string[]
  year: string
  featured: boolean
  cover: string
  coverAlt: string
  images: ProjectImage[]
  technologies: string[]
  features: string[]
  featuresId?: string[]
  problem?: string
  problemId?: string
  solution?: string
  solutionId?: string
  architecture?: string[]
  architectureId?: string[]
  contribution: string
  contributionId?: string
  challenges?: string[]
  challengesId?: string[]
  results?: string[]
  resultsId?: string[]
  github: string | null
  demo: string | null
}

export interface Experience {
  company: string
  location?: string
  role: string
  period: string
  technologies: string[]
  description?: string
  descriptionId?: string
  highlights?: string[]
  highlightsId?: string[]
}

export interface SkillCategory {
  name: string
  technologies: string[]
  /** Self-assessed proficiency 0-100 by technology name. Missing = chip only. */
  levels?: Record<string, number>
}

export interface Education {
  institution: string
  location?: string
  degree: string
  status: string
  period?: string
  gpa?: string
  description: string
  descriptionId?: string
  notableProjects?: string[]
  notableProjectsId?: string[]
}

export interface Organization {
  name: string
  location?: string
  role: string
  period?: string
  responsibilities?: string[]
  responsibilitiesId?: string[]
  highlights?: string[]
  highlightsId?: string[]
}

export interface ContactChannel {
  name: string
  label: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  shortName: string
  initials: string
  photo: string
  photoAlt: string
  headline: string
  headlineId?: string
  role: string
  shortDescription: string
  shortDescriptionId?: string
  location: string
  email: string
  phone: string
  phoneHref: string
  github: string
  linkedin: string
  cvPath: string
  availability: string
  availabilityId?: string
}
