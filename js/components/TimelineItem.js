/**
 * TimelineItem Component
 * Renders a professional work experience timeline card
 */
export function createTimelineItem(exp) {
  const currentBadgeHtml = exp.isCurrent 
    ? `<span class="exp-badge current-badge">${exp.badge}</span>`
    : `<span class="exp-badge">${exp.badge}</span>`;

  const bulletsHtml = exp.bullets.map(bullet => `
    <li>${bullet}</li>
  `).join('');

  const techStackHtml = exp.techStack.map(tech => `
    <span class="tech-pill">${tech}</span>
  `).join('');

  return `
    <div class="timeline-item">
      <div class="timeline-marker">
        <span class="marker-dot"></span>
        <span class="marker-line"></span>
      </div>
      <div class="timeline-content">
        <div class="exp-card">
          <div class="exp-card-header">
            <div>
              ${currentBadgeHtml}
              <h3 class="exp-role">${exp.role}</h3>
              <h4 class="exp-company">${exp.company}</h4>
            </div>
            <div class="exp-meta">
              <span class="exp-date">${exp.period}</span>
              <span class="exp-duration">${exp.duration}</span>
              <span class="exp-location">${exp.location}</span>
            </div>
          </div>

          <p class="exp-summary">
            ${exp.summary}
          </p>

          <ul class="exp-bullets">
            ${bulletsHtml}
          </ul>

          <div class="exp-tech-stack">
            ${techStackHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}
