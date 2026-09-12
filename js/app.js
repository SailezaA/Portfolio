/**
 * Pragya Awasthi Portfolio - Main Application Controller
 * Modern ES6 Component Architecture & Lifecycle Coordinator
 */

// 1. Data Imports
import { profileData } from './data/profileData.js';
import { statsData } from './data/statsData.js';
import { skillsData, skillFilterTabs } from './data/skillsData.js';
import { projectsData, projectFilterTabs } from './data/projectsData.js';
import { experienceData } from './data/experienceData.js';
import { academicEducation, certificationsData } from './data/educationData.js';

// 2. Component Imports
import { createStatCard } from './components/StatCard.js';
import { createSkillCard } from './components/SkillCard.js';
import { createProjectCard } from './components/ProjectCard.js';
import { createTimelineItem } from './components/TimelineItem.js';
import { createAcademicCard, createCertItem } from './components/EducationCard.js';
import { ProjectModal } from './components/ProjectModal.js';
import { ResumeModal } from './components/ResumeModal.js';
import { showToast } from './components/Toast.js';

// 3. Application Lifecycle
document.addEventListener('DOMContentLoaded', () => {
  // Mount dynamic component lists
  mountStats();
  mountSkills();
  mountProjects();
  mountExperience();
  mountEducation();

  // Initialize interactive features
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilterAndSearch();
  initProjectFilter();
  initModals();
  initClipboardAndContact();
  initBackToTop();
});

/* ==========================================================================
   Component Mounting Functions
   ========================================================================== */
function mountStats() {
  const container = document.getElementById('statsGrid');
  if (!container) return;
  container.innerHTML = statsData.map(stat => createStatCard(stat)).join('');
}

function mountSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container) return;
  container.innerHTML = skillsData.map(category => createSkillCard(category)).join('');
}

function mountProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  container.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
}

function mountExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;
  container.innerHTML = experienceData.map(item => createTimelineItem(item)).join('');
}

function mountEducation() {
  const eduContainer = document.getElementById('educationList');
  const certContainer = document.getElementById('certificationsList');

  if (eduContainer) {
    eduContainer.innerHTML = academicEducation.map(edu => createAcademicCard(edu)).join('');
  }

  if (certContainer) {
    certContainer.innerHTML = certificationsData.map(cert => createCertItem(cert)).join('');
  }
}

/* ==========================================================================
   Interactive Controllers
   ========================================================================== */

/**
 * 1. Theme Switcher (Dark / Light Mode)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

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

/**
 * 2. Mobile Navigation Drawer
 */
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

  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });
}

/**
 * 3. ScrollSpy & Active Nav Links
 */
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

/**
 * 4. Skills Filtering & Live Search
 */
function initSkillsFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.skills-filter-wrapper .filter-btn');
  const categoryCards = document.querySelectorAll('.skill-category-card');
  const searchInput = document.getElementById('skillSearchInput');
  const allSkillTags = document.querySelectorAll('.skill-tag');

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
          const parentCard = tag.closest('.skill-category-card');
          if (parentCard) parentCard.style.display = 'flex';
        } else {
          tag.classList.remove('search-match');
        }
      });
    });
  }
}

/**
 * 5. Projects Category Filter
 */
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

/**
 * 6. Modals Initialization
 */
function initModals() {
  new ProjectModal(projectsData);
  new ResumeModal();
}

/**
 * 7. Clipboard Copy & Contact Form
 */
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

  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check anti-bot honeypot
      const honey = contactForm.querySelector('input[name="_honey"]')?.value;
      if (honey) {
        contactForm.reset();
        showToast('Message sent successfully!', 'success');
        return;
      }

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim() || 'Portfolio Inquiry';
      const message = messageInput.value.trim();

      // Validate required fields
      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }

      // Reset feedback container
      if (formFeedback) {
        formFeedback.style.display = 'none';
        formFeedback.className = 'form-feedback';
        formFeedback.innerHTML = '';
      }

      // Check if browsing locally via file:// protocol
      if (window.location.protocol === 'file:') {
        showToast('Local file (file://) detected. Testing requires web server.', 'error');
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileData.email)}&su=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(`Hi Pragya,\n\nName: ${name}\nEmail: ${email}\n\n${message}`)}`;
        if (formFeedback) {
          formFeedback.className = 'form-feedback info';
          formFeedback.innerHTML = `
            <div class="form-feedback-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="form-feedback-content">
              <strong>Local File Preview (<code>file:///</code>) Detected:</strong><br>
              Browsers block external form API requests from local files.<br>
              Please test form submissions on your live GitHub Pages site:
              <div class="form-feedback-actions">
                <a href="https://sailezaa.github.io/Portfolio/#contact" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                  Open Live GitHub Pages
                </a>
                <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
                  Open in Web Gmail
                </a>
              </div>
            </div>
          `;
          formFeedback.style.display = 'flex';
        }
        return;
      }

      // Show button loading spinner & disable during transmission
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner" aria-hidden="true"></span>
          <span>Sending Message...</span>
        `;
      }

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profileData.email)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: `[Portfolio Contact] ${subject} - from ${name}`,
            message: message,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const data = await response.json().catch(() => null);

        // 1. Handle One-Time Activation Requirement from FormSubmit
        if (data && data.message && /activ/i.test(data.message)) {
          showToast('Almost there! Please check your email to activate the form.', 'info');
          if (formFeedback) {
            formFeedback.className = 'form-feedback info';
            formFeedback.innerHTML = `
              <div class="form-feedback-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <div class="form-feedback-content">
                <strong>One-Time Activation Required:</strong><br>
                FormSubmit has received your message and sent an activation email to <strong>${profileData.email}</strong>.<br><br>
                Please open your Gmail, click <strong>"Activate Form"</strong> in the email, and from then on all messages will arrive directly in your inbox!
                <div class="form-feedback-actions">
                  <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                    Open Gmail to Activate
                  </a>
                  <button type="button" class="btn btn-sm btn-secondary copy-email-fallback-btn" data-email="${profileData.email}">
                    Copy ${profileData.email}
                  </button>
                </div>
              </div>
            `;
            formFeedback.style.display = 'flex';

            const copyFallbackBtn = formFeedback.querySelector('.copy-email-fallback-btn');
            if (copyFallbackBtn) {
              copyFallbackBtn.addEventListener('click', async () => {
                try {
                  await navigator.clipboard.writeText(profileData.email);
                  showToast(`Copied ${profileData.email} to clipboard!`, 'success');
                } catch (err) {
                  showToast(`Email: ${profileData.email}`);
                }
              });
            }
          }
          return;
        }

        // 2. Handle Web Server requirement message
        if (data && data.message && /web server|HTML files/i.test(data.message)) {
          showToast('Form submission requires a web server.', 'error');
          if (formFeedback) {
            formFeedback.className = 'form-feedback info';
            formFeedback.innerHTML = `
              <div class="form-feedback-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <div class="form-feedback-content">
                <strong>Web Server Required:</strong> FormSubmit requires the page to be hosted on HTTP/HTTPS.<br>
                Please test directly on your live deployed portfolio:
                <div class="form-feedback-actions">
                  <a href="https://sailezaa.github.io/Portfolio/#contact" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                    Open Live GitHub Pages
                  </a>
                </div>
              </div>
            `;
            formFeedback.style.display = 'flex';
          }
          return;
        }

        // 3. Normal Success Delivery
        if (response.ok && (!data || data.success === 'true' || data.success === true)) {
          contactForm.reset();
          showToast('Message sent directly to Pragya\'s inbox!', 'success');

          if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `
              <div class="form-feedback-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div class="form-feedback-content">
                <strong>Thank you, ${name}!</strong> Your message has been transmitted directly to Pragya's inbox (${profileData.email}). Expect a reply soon.
              </div>
            `;
            formFeedback.style.display = 'flex';
          }
        } else {
          throw new Error(data?.message || 'Transmission could not be completed.');
        }
      } catch (error) {
        console.error('Contact Form Error:', error);
        showToast('Unable to send automatically. Please use the direct links below.', 'error');

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileData.email)}&su=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`Hi Pragya,\n\nName: ${name}\nEmail: ${email}\n\n${message}`)}`;
        const errorMessage = error?.message && error.message !== 'Failed to fetch'
          ? error.message
          : 'An adblocker or network error prevented automatic delivery.';

        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = `
            <div class="form-feedback-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="form-feedback-content">
              <strong>Transmission issue:</strong> ${errorMessage}
              <div class="form-feedback-actions">
                <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                  Open in Web Gmail
                </a>
                <button type="button" class="btn btn-sm btn-secondary copy-email-fallback-btn" data-email="${profileData.email}">
                  Copy Email Address
                </button>
              </div>
            </div>
          `;
          formFeedback.style.display = 'flex';

          const copyFallbackBtn = formFeedback.querySelector('.copy-email-fallback-btn');
          if (copyFallbackBtn) {
            copyFallbackBtn.addEventListener('click', async () => {
              try {
                await navigator.clipboard.writeText(profileData.email);
                showToast(`Copied ${profileData.email} to clipboard!`, 'success');
              } catch (err) {
                showToast(`Email: ${profileData.email}`);
              }
            });
          }
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }
}

/**
 * 8. Back to Top Smooth Scroll
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
