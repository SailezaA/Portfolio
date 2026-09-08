/**
 * ResumeModal Component
 * Full-screen printable CV viewer dialog and PDF print controller
 */

export class ResumeModal {
  constructor() {
    this.resumeModal = document.getElementById('resumeModal');
    this.closeBtn = document.getElementById('closeResumeModal');
    this.printBtn = document.getElementById('printResumeBtn');
    this.init();
  }

  init() {
    if (!this.resumeModal) return;

    // Trigger buttons
    document.addEventListener('click', (e) => {
      const triggerBtn = e.target.closest('.resume-trigger-btn');
      if (triggerBtn) {
        e.preventDefault();
        this.open();
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => window.print());
    }

    this.resumeModal.addEventListener('click', (e) => {
      if (e.target === this.resumeModal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.resumeModal.classList.contains('open')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.resumeModal) return;
    this.resumeModal.classList.add('open');
    this.resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.resumeModal) return;
    this.resumeModal.classList.remove('open');
    this.resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
