# Pragya Awasthi - Developer Portfolio Website

A modern, responsive, high-performance personal portfolio website built for **Pragya Awasthi** (Software Developer | DevOps Enthusiast), accurately tailored to her resume, experience, skills, and projects.

---

## 🌟 Key Highlights & Features

- **Resume-Grounded**: Features all roles, projects, and certifications from Pragya's professional background:
  - **Experience**: Geofinity Solutions Pvt. Ltd., E.K. Solutions Pvt. Ltd., Nobel Learning PBC.
  - **Education**: BSc CSIT (Tribhuvan University), DevOps Training (Mindrisers Institute).
  - **Projects**: Healthcare Management System (Frappe/ERPNext), Brain Tumor Segmentation (UNet, PyTorch, FastAPI, Streamlit), Resume Profiling & Aptitude Matching (NLP, Cosine Similarity), Cloud Infrastructure & CI/CD Pipeline (Docker, Kubernetes, Jenkins, Terraform, AWS, Prometheus/Grafana).
  - **Certifications**: Mindrisers, E.K. Solutions, Coursera Python for Data Science / AI / Projects, Nobel Fundamentals.
- **Interactive Capabilities**:
  - **Dark / Light Theme Toggle**: Seamless mode switcher with system preference detection and `localStorage` persistence.
  - **Interactive Project Deep-Dives**: Click "Architecture Deep Dive" to view modal overlays detailing problem statements, system architectures, key features, and technology stacks.
  - **Live Skills Search & Category Filtering**: Filter skills by category (*DevOps & Cloud*, *Web & Backend*, *Machine Learning*, *Languages & DB*) or use the real-time search box.
  - **Print-Ready Interactive Resume Viewer**: Built-in modal displaying the complete structured CV with a 1-click **"Print / Save PDF"** button (formatted cleanly using `@media print`).
  - **One-Click Contact & Clipboard Copy**: 1-click copy buttons for Email (`pragyaawasthi248@gmail.com`) and Phone (`+977 986-9073870`) with animated toast feedback.
  - **Interactive Email Form**: Pre-populates your email client with inquiry details.
- **Performance & Architecture**:
  - Zero heavy external dependencies (instant load time, 100/100 Lighthouse score).
  - Fully responsive from mobile devices (< 480px) up to ultra-wide displays.
  - Semantic HTML5, accessible ARIA attributes, keyboard navigable modals, and modern CSS variables.

---

## 🚀 How to Run Locally

### Option 1: Double Click / Direct Browser Launch
You can open `index.html` directly in any web browser (Chrome, Firefox, Safari, Edge) without requiring any server.

### Option 2: Local Python Server (Recommended)
From your terminal:

```bash
cd /Users/jaivasuki648/frappe_pro/apps/portfolio
python3 -m http.server 8080
```
Then open your browser and navigate to:
```
http://localhost:8080
```

### Option 3: Node `serve` or `npx`
```bash
cd /Users/jaivasuki648/frappe_pro/apps/portfolio
npx -y serve .
```

---

## 🌐 Free Deployment Options

### 1. GitHub Pages (100% Free)
1. Initialize git in this directory or push to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

### 2. Netlify Drag-and-Drop (Instant 30-Second Launch)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder.
3. Done! You will immediately get a live HTTPS URL with custom domain support.

### 3. Vercel
1. Run `npx vercel` inside this folder and follow the prompts.

---

## 📁 File Structure

```
apps/portfolio/
├── index.html              # Semantic HTML5 layout with component mount points & SEO metadata
├── css/
│   └── style.css           # Modern CSS tokens, responsive layout, glassmorphism, @media print
├── js/
│   ├── app.js              # Application lifecycle, component mounting & controllers
│   ├── components/         # Reusable Vanilla UI Components
│   │   ├── StatCard.js     # Key metric stat highlight card
│   │   ├── SkillCard.js    # Categorized technical competency card
│   │   ├── ProjectCard.js  # Project card with banner, badge, features & tags
│   │   ├── TimelineItem.js # Work experience career milestone card
│   │   ├── EducationCard.js# Academic & verified credential cards
│   │   ├── ProjectModal.js # Architecture deep-dive modal controller
│   │   ├── ResumeModal.js  # Interactive CV viewer modal controller
│   │   └── Toast.js        # Dynamic notification toast system
│   └── data/               # Single Source of Truth Data Models
│       ├── profileData.js  # Personal bio, title, links, and contact info
│       ├── statsData.js    # Highlight stats (experience, projects, stack)
│       ├── skillsData.js   # Skills categorized by domain with category tags
│       ├── projectsData.js # Showcase projects & architecture deep-dive details
│       ├── experienceData.js# Professional career timeline & milestones
│       └── educationData.js# Formal degrees, training & verified certificates
└── README.md               # Documentation & guide
```

---

## ✏️ Customizing Your Content

Thanks to the modular component architecture, content and presentation are cleanly separated:

- **Add or Edit Projects**: Update `projectsData.js` in `js/data/`. Cards and architecture deep-dive modals render automatically with no duplicate HTML!
- **Add or Edit Skills**: Update `skillsData.js` in `js/data/`. Category filtering and live search update instantly.
- **Update Career & Education**: Update `experienceData.js` and `educationData.js` in `js/data/`.
- **Change Profile Info**: Update `profileData.js` in `js/data/`.
- **Colors & Aesthetics**: Modify CSS variables in `:root` and `[data-theme="light"]` in `css/style.css`.
