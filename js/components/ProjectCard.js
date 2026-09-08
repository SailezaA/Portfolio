/**
 * ProjectCard Component
 * Renders a showcase project card with banner, badges, tags, and deep-dive button
 */
export function createProjectCard(project) {
  const featuresHtml = project.featuresPreview.map(feat => `
    <div class="feat-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${feat}</span>
    </div>
  `).join('');

  const techTagsHtml = project.techStackPreview.map(tag => `
    <span class="tag">${tag}</span>
  `).join('');

  return `
    <article class="project-card" data-proj-category="${project.category}">
      <div class="project-card-banner ${project.bannerClass}">
        <div class="project-type-badge">${project.categoryLabel}</div>
        <div class="project-banner-icon">
          ${project.icon}
        </div>
      </div>

      <div class="project-card-body">
        <div class="project-meta-top">
          <span class="project-year">${project.year}</span>
          <span class="project-status">${project.status}</span>
        </div>
        
        <h3 class="project-title">${project.title}</h3>
        
        <p class="project-desc">
          ${project.description}
        </p>

        <div class="project-features">
          ${featuresHtml}
        </div>

        <div class="project-tech-tags">
          ${techTagsHtml}
        </div>

        <div class="project-footer">
          <button class="btn btn-outline btn-sm open-modal-btn" data-project="${project.id}" aria-label="Open architecture deep dive for ${project.title}">
            <span>Architecture Deep Dive</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}
