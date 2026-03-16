// ======================================================
// EXPERIENCE TYPE
// ======================================================
export type Experience = {
    draft?: boolean // Optional: true if this experience is a draft, not published
    title: string   // Title of the experience or role
    date: string    // Date string (e.g., "May 2026")
    range: string   // Duration (e.g., "May 2020 - May 2021")
    company: string // Name of the company or institution
    link: string    // URL to company or project
    skills: string[] // List of skills used in this experience
    content: string  // Detailed description of the experience
    category: 'work' | 'education' // Distinguishes work experience vs. education
}

// ======================================================
// PROJECT TYPE
// ======================================================
export type Project = {
    draft?: boolean           // Optional: true if this project is a draft
    name: string              // Project name
    date: string              // Date string (e.g., "2022-12-06")
    range: string             // Duration (e.g. "May - May")
    skills: string[]          // Skills or technologies used
    tags: string[]            // Tags for filtering/searching
    images: string[]          // Array of image URLs for project gallery
    shortDescription: string  // Brief description for quick overview
    links: { [key: string]: string } // Key-value object for external links (e.g. demo, repo)
    content: string           // Detailed project description
    thumbnail?: string        // Optional thumbnail image URL
}

// ======================================================
// SOCIAL LINKS TYPE
// ======================================================
export type SocialLinks = {
    name: string // Name of the social platform
    link: string // URL to profile
}