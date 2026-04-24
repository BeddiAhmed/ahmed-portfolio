export type ProjectStatus = 'live' | 'inProgress' | 'archived'

export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  status: ProjectStatus
  liveUrl?: string
  dashboardUrl?: string
  repoUrl?: string
  category: string
}

export const projects: Project[] = [
  {
    slug: 'gta-energy-dashboard',
    title: 'Greater Tortue Ahmeyim LNG Dashboard',
    description: 'Interactive production forecasts, revenue projections, and comparative analysis for the GTA LNG project.',
    longDescription: 'A comprehensive data dashboard tracking the Greater Tortue Ahmeyim LNG project across Mauritania and Senegal. Visualizes production timelines, royalty revenue streams, and regional economic impact.',
    stack: ['Python', 'Plotly', 'Pandas', 'Next.js'],
    status: 'live',
    dashboardUrl: '/dashboards/dashboard.html',
    category: 'energy',
  },
  {
    slug: 'sahel-trade-flows',
    title: 'Sahel Trade Flow Tracker',
    description: 'Mapping formal and informal trade corridors across the Sahel region using UN Comtrade and satellite data.',
    longDescription: 'An analysis of trade dynamics in the Sahel, combining official trade statistics with satellite imagery to estimate informal cross-border flows.',
    stack: ['Python', 'GeoPandas', 'Folium', 'R'],
    status: 'inProgress',
    category: 'trade',
  },
  {
    slug: 'mauritania-gdp-decomposition',
    title: 'Mauritania GDP Decomposition',
    description: 'Sector-by-sector growth accounting for Mauritania from 2000–2024, with resource-windfall scenarios.',
    longDescription: 'A detailed growth accounting exercise decomposing Mauritania\'s GDP into contributions from fisheries, mining, agriculture, and services — with forward scenarios for the gas windfall.',
    stack: ['R', 'ggplot2', 'World Bank API'],
    status: 'live',
    category: 'economics',
  },
  {
    slug: 'mena-energy-transition',
    title: 'MENA Energy Transition Index',
    description: 'Scoring 22 MENA countries on renewable energy capacity, policy frameworks, and investment attractiveness.',
    longDescription: 'A composite index built from IEA, IRENA, and World Bank data, scoring Middle East and North Africa countries on their energy transition readiness.',
    stack: ['Python', 'Streamlit', 'Plotly'],
    status: 'archived',
    category: 'energy',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((p) => p.status === status)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
