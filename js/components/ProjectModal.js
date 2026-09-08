/**
 * ProjectModal Component
 * Interactive modal dialog for deep-dive architectural breakdowns
 */

export class ProjectModal {
  constructor(projectsData) {
    this.projectsData = projectsData;
    this.modal = document.getElementById('projectModal');
    this.closeBtn = document.getElementById('closeProjectModal');
    this.contentContainer = document.getElementById('modalProjectContent');
    this.init();
  }

  init() {
    if (!this.modal || !this.contentContainer) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('open')) {
        this.close();
      }
    });

    // Delegate project modal buttons
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.open-modal-btn');
      if (openBtn) {
        const projectId = openBtn.getAttribute('data-project');
        this.open(projectId);
      }
    });
  }

  open(projectId) {
    const project = this.projectsData.find(p => p.id === projectId);
    if (!project || !project.modal) return;

    const { modal, title } = project;

    this.contentContainer.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-project-category">${modal.category}</div>
        <h3 class="modal-project-title" id="modalTitle">${title}</h3>
        <div class="modal-project-meta">
          <span>${modal.status}</span>
        </div>
      </div>

      <div class="modal-body-section">
        <h4>Overview</h4>
        <p>${modal.summary}</p>
      </div>

      <div class="modal-body-section">
        <h4>The Challenge</h4>
        <p>${modal.problem}</p>
      </div>

      <div class="modal-body-section">
        <h4>Architecture &amp; Engineering</h4>
        <p>${modal.architecture}</p>
      </div>

      <div class="modal-body-section">
        <h4>Key Accomplishments &amp; Features</h4>
        <ul class="modal-feature-list">
          ${modal.keyFeatures.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-tech-box">
        <h4>Technologies Employed</h4>
        <div class="project-tech-tags" style="margin-top: 0.65rem; margin-bottom: 0;">
          ${modal.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    this.modal.classList.add('open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
