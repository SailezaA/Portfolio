/**
 * EducationCard Component
 * Renders academic qualification and verified certification cards
 */

export function createAcademicCard(edu) {
  return `
    <div class="edu-card">
      <div class="edu-card-top">
        <span class="edu-badge ${edu.badgeClass}">${edu.badge}</span>
        <span class="edu-period">${edu.period}</span>
      </div>
      <h4 class="edu-degree">${edu.title}</h4>
      <h5 class="edu-institution">${edu.institution}</h5>
      <div class="edu-location">${edu.location}</div>
      <p class="edu-desc">
        ${edu.description}
      </p>
    </div>
  `;
}

export function createCertItem(cert) {
  return `
    <div class="cert-item">
      <div class="cert-icon ${cert.colorClass}">
        ${cert.icon}
      </div>
      <div class="cert-info">
        <h4 class="cert-name">${cert.name}</h4>
        <span class="cert-issuer">${cert.issuer}</span>
        <span class="cert-date">${cert.date}</span>
      </div>
    </div>
  `;
}
