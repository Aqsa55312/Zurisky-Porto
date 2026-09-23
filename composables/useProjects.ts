import { projects } from '~/data/projects'
import type { Project } from '~/types'

export function useProjects() {
  const allProjects = computed<Project[]>(() => projects)

  const featuredProjects = computed<Project[]>(() => projects.filter((p) => p.featured))

  const getProjectBySlug = (slug: string): Project | undefined =>
    projects.find((p) => p.slug === slug)

  const getRelatedProjects = (slug: string, limit = 3): Project[] =>
    projects.filter((p) => p.slug !== slug).slice(0, limit)

  const allTechnologies = computed<string[]>(() => {
    const set = new Set<string>()
    for (const p of projects) for (const t of p.technologies) set.add(t)
    return [...set].sort()
  })

  function filterProjects(options: { category?: string; tech?: string; query?: string }): Project[] {
    const category = options.category ?? 'All'
    const tech = options.tech ?? 'All'
    const query = (options.query ?? '').trim().toLowerCase()
    return projects.filter((p) => {
      const matchCategory = category === 'All' || p.category.includes(category)
      const matchTech = tech === 'All' || p.technologies.includes(tech)
      const matchQuery =
        query.length === 0 ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query))
      return matchCategory && matchTech && matchQuery
    })
  }

  return { allProjects, featuredProjects, getProjectBySlug, getRelatedProjects, allTechnologies, filterProjects }
}
