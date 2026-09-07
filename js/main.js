/**
 * Pragya Awasthi Portfolio - Interactive Controller
 * High-performance, zero-dependency Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilter();
  initProjectFilter();
  initProjectModals();
  initResumeModal();
  initClipboardAndContact();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  // Set initial theme
  const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'theme');
    });
  }

  // Listen for system theme changes if user hasn't explicitly set one
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileNav) return;

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', isOpen);
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  }

  menuBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });
}

/* ==========================================================================
   3. ScrollSpy & Active Nav Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. Skills Matrix Filtering & Live Search
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-wrapper .filter-btn');
  const categoryCards = document.querySelectorAll('.skill-category-card');
  const searchInput = document.getElementById('skillSearchInput');
  const allSkillTags = document.querySelectorAll('.skill-tag');

  // Category filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      categoryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Live search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (!query) {
        allSkillTags.forEach(tag => tag.classList.remove('search-match'));
        return;
      }

      allSkillTags.forEach(tag => {
        const skillName = (tag.getAttribute('data-name') || tag.textContent).toLowerCase();
        if (skillName.includes(query)) {
          tag.classList.add('search-match');
          // Make sure parent category card is visible
          const parentCard = tag.closest('.skill-category-card');
          if (parentCard) parentCard.style.display = 'flex';
        } else {
          tag.classList.remove('search-match');
        }
      });
    });
  }
}

/* ==========================================================================
   5. Projects Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-proj-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-proj-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project Details Modal (Deep Dives)
   ========================================================================== */
const projectData = {
  healthcare: {
    title: "Healthcare Management System",
    category: "Enterprise & Healthcare Software (Frappe / ERPNext)",
    status: "Production Active (2025 – Present)",
    summary: "An end-to-end hospital administration and clinical operations platform engineered to automate patient care workflows, manage appointments, and maintain electronic medical records (EMR).",
    problem: "Healthcare facilities often deal with fragmented systems for registration, doctor consultations, lab results, and billing, causing scheduling overlaps, billing discrepancies, and delayed patient care.",
    architecture: "Built on top of the Frappe Framework and ERPNext, utilizing Python for business logic, MariaDB for relational storage, and JavaScript for client-side doctype scripting. Implemented custom DocTypes, automated workflow states, server scripts, and role-based permissions (RBAC) ensuring doctor-patient confidentiality.",
    keyFeatures: [
      "Centralized Patient Management: Demographic profiles, medical histories, vitals logs, and allergy alerts.",
      "Smart Appointment Booking: Doctor schedule slots, queue management, real-time availability, and rescheduling.",
      "Clinical Record Management: Digital prescriptions, diagnosis notes, and follow-up reminders.",
      "ERPNext Integration: Direct linkage to billing, service invoicing, and pharmacy inventory.",
      "REST API Endpoints: For seamless data interchange with external patient portals and laboratory devices."
    ],
    techStack: ["Frappe Framework", "ERPNext", "Python", "MariaDB", "JavaScript", "REST APIs", "HTML5/CSS3"]
  },

  unet: {
    title: "Brain Tumor Segmentation using UNet",
    category: "Medical AI & Computer Vision (PyTorch)",
    status: "Completed & Deployed (2024)",
    summary: "Deep learning segmentation system designed to identify and delineate brain tumors from MRI scans with pixel-level precision, deployed for real-time clinician evaluation.",
    problem: "Manual identification and boundary delineation of brain tumors on magnetic resonance imaging (MRI) is tedious, prone to human fatigue, and subject to inter-observer variability in clinical environments.",
    architecture: "Developed a custom convolutional UNet architecture from scratch using PyTorch, featuring a contraction encoder path for feature extraction, bottleneck, and symmetric expansion decoder path with skip connections for high-resolution localization. Integrated with a FastAPI REST server for fast inference and Streamlit for an interactive user portal.",
    keyFeatures: [
      "Custom UNet Neural Network: Trained with combined Binary Cross-Entropy (BCE) and Soft Dice Loss.",
      "Data Augmentation Pipeline: Rotation, affine scaling, horizontal flips, and normalization to handle MRI intensity variation.",
      "FastAPI Low-Latency Inference: Model weights loaded in memory for sub-second inference response.",
      "Streamlit Clinical Dashboard: Allows medical professionals to upload MRI slices and view real-time segmented masks overlaid on the original scan.",
      "Model Evaluation: Evaluated using Dice Similarity Coefficient (DSC) and Intersection over Union (IoU)."
    ],
    techStack: ["PyTorch", "UNet", "FastAPI", "Streamlit", "Python", "Computer Vision", "NumPy", "Scikit-Learn"]
  },

  "resume-matcher": {
    title: "Resume Profiling & Aptitude Matching",
    category: "Natural Language Processing (NLP)",
    status: "Completed (2023)",
    summary: "Intelligent recruitment automation system using Natural Language Processing and Cosine Similarity to match candidate qualifications with complex job descriptions.",
    problem: "Recruiters spend hundreds of hours manually screening resumes against job descriptions, which introduces cognitive bias and often overlooks qualified applicants with non-standard formatting.",
    architecture: "Pipeline reads unstructured PDF/DOCX resumes, applies text normalization, tokenization, stop-word removal, and lemmatization, followed by TF-IDF (Term Frequency-Inverse Document Frequency) vectorization. Calculates vector angular distances via Cosine Similarity to compute a definitive aptitude affinity score.",
    keyFeatures: [
      "Automated Text Extraction: Handles multi-format candidate resumes and extracts relevant experience blocks.",
      "Cosine Similarity Engine: Computes mathematical affinity scores between job descriptions and candidates.",
      "Skills Gap Analysis: Highlights matching competencies and flags missing prerequisite skills.",
      "Scored Ranking Dashboard: Presents candidates in prioritized order for faster interview scheduling.",
      "70%+ Screening Time Reduction: Drastically accelerated candidate shortlisting in testing."
    ],
    techStack: ["Python", "NLP", "Scikit-Learn", "Pandas", "NumPy", "Cosine Similarity", "TF-IDF Vectorization"]
  },

  "devops-pipeline": {
    title: "Cloud Infrastructure & CI/CD Automation Pipeline",
    category: "DevOps & Infrastructure as Code",
    status: "Trained & Validated (2025)",
    summary: "Production-grade automated software delivery system featuring containerization, Kubernetes cluster orchestration, Jenkins pipelines, Terraform on AWS, and Prometheus/Grafana observability.",
    problem: "Manual deployments are slow, error-prone, and lead to environment drifts between development, staging, and production environments with lack of visibility into system health.",
    architecture: "Docker multi-stage builds create lightweight, secure container images. Jenkins automates Git commit webhooks, runs linting, unit tests, and triggers builds. Kubernetes manages container replication, zero-downtime rolling updates, and self-healing. AWS cloud infrastructure is provisioned through Terraform, with Prometheus scraping metrics and Grafana displaying real-time operational telemetry.",
    keyFeatures: [
      "Docker Multi-Stage Optimization: Reduced image footprints by >60% and minimized attack surfaces.",
      "Declarative Kubernetes Manifests: Deployments, Services, ConfigMaps, Secrets, and Ingress routing.",
      "Jenkins CI/CD Pipeline: Automated multi-stage pipeline with automated rollback on test failures.",
      "Infrastructure as Code (IaC): Terraform modules for reproducible VPC, EC2, and security groups on AWS.",
      "Full-Stack Observability: Prometheus scrape jobs and custom Grafana dashboards for latency, CPU/memory, and HTTP status codes."
    ],
    techStack: ["Docker", "Kubernetes", "Jenkins", "Ansible", "Terraform", "AWS", "Prometheus", "Grafana", "Linux"]
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModal');
  const contentContainer = document.getElementById('modalProjectContent');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !contentContainer) return;

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    contentContainer.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-project-category">${data.category}</div>
        <h3 class="modal-project-title" id="modalTitle">${data.title}</h3>
        <div class="modal-project-meta">
          <span>${data.status}</span>
        </div>
      </div>

      <div class="modal-body-section">
        <h4>Overview</h4>
        <p>${data.summary}</p>
      </div>

      <div class="modal-body-section">
        <h4>The Challenge</h4>
        <p>${data.problem}</p>
      </div>

      <div class="modal-body-section">
        <h4>Architecture &amp; Engineering</h4>
        <p>${data.architecture}</p>
      </div>

      <div class="modal-body-section">
        <h4>Key Accomplishments &amp; Features</h4>
        <ul class="modal-feature-list">
          ${data.keyFeatures.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-tech-box">
        <h4>Technologies Employed</h4>
        <div class="project-tech-tags" style="margin-top: 0.65rem; margin-bottom: 0;">
          ${data.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openProject(projKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Interactive Resume Modal & PDF Print
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeResumeModal');
  const printBtn = document.getElementById('printResumeBtn');
  const triggerBtns = document.querySelectorAll('.resume-trigger-btn');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   8. Clipboard Copy & Contact Form
   ========================================================================== */
function initClipboardAndContact() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const contactForm = document.getElementById('contactForm');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied to clipboard: ${textToCopy}`);
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Format mailto link to open client
      const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
      const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:pragyaawasthi248@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      window.location.href = mailtoUrl;

      showToast('Opening your email client to send message...', 'success');
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
  
  if (type === 'theme') {
    iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3200);
}
