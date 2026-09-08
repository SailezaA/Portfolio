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

      const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
      const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${profileData.email}?subject=${encodedSubject}&body=${encodedBody}`;

      window.location.href = mailtoUrl;

      showToast('Opening your email client to send message...', 'success');
      contactForm.reset();
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
