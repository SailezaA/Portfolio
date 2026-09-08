/**
 * Technical Skills & Competencies Data Model
 */
export const skillsData = [
  {
    id: "devops-automation",
    category: "devops",
    icon: "devops",
    title: "DevOps & Automation",
    subtitle: "CI/CD & Infrastructure Automation",
    skills: [
      { name: "Docker", featured: true },
      { name: "Kubernetes", featured: true },
      { name: "Jenkins", featured: true },
      { name: "Ansible", featured: false },
      { name: "Terraform", featured: true },
      { name: "Git", featured: false },
      { name: "GitHub Actions", featured: false },
      { name: "CI/CD Pipelines", featured: false }
    ]
  },
  {
    id: "cloud-infrastructure",
    category: "devops",
    icon: "cloud",
    title: "Cloud & Infrastructure",
    subtitle: "Cloud Architecture & Administration",
    skills: [
      { name: "AWS (EC2, S3, IAM, VPC)", featured: true },
      { name: "Linux Administration", featured: true },
      { name: "Computer Networking", featured: false },
      { name: "Bash Scripting", featured: false },
      { name: "Security & Permissions", featured: false }
    ]
  },
  {
    id: "monitoring-observability",
    category: "devops",
    icon: "monitoring",
    title: "Monitoring & Observability",
    subtitle: "Metrics, Logs & Production Telemetry",
    skills: [
      { name: "Prometheus", featured: true },
      { name: "Grafana Dashboards", featured: true },
      { name: "Centralized Logging", featured: false },
      { name: "Alertmanager & Rules", featured: false },
      { name: "Health Checks & Uptime", featured: false }
    ]
  },
  {
    id: "web-backend",
    category: "web",
    icon: "web",
    title: "Web & Backend",
    subtitle: "Enterprise Systems & APIs",
    skills: [
      { name: "ERPNext Customization", featured: true },
      { name: "Frappe Framework", featured: true },
      { name: "FastAPI", featured: true },
      { name: "Django", featured: false },
      { name: "RESTful APIs", featured: false },
      { name: "HTML5", featured: false },
      { name: "CSS3 & Responsive UI", featured: false }
    ]
  },
  {
    id: "machine-learning",
    category: "ml",
    icon: "ml",
    title: "Machine Learning & AI",
    subtitle: "Computer Vision, NLP & Inference",
    skills: [
      { name: "PyTorch", featured: true },
      { name: "UNet Segmentation", featured: true },
      { name: "TensorFlow", featured: false },
      { name: "Scikit-Learn", featured: false },
      { name: "Pandas & NumPy", featured: false },
      { name: "Natural Language Processing", featured: false },
      { name: "Streamlit", featured: false },
      { name: "Cosine Similarity", featured: false }
    ]
  },
  {
    id: "languages-databases",
    category: "prog",
    icon: "prog",
    title: "Languages & Databases",
    subtitle: "Core Programming Foundations",
    skills: [
      { name: "Python", featured: true },
      { name: "SQL (MariaDB / PostgreSQL)", featured: true },
      { name: "JavaScript (ES6+)", featured: false },
      { name: "Bash / Shell", featured: false },
      { name: "OOP & System Design", featured: false }
    ]
  }
];

export const skillFilterTabs = [
  { filter: "all", label: "All Skills" },
  { filter: "devops", label: "DevOps & Cloud" },
  { filter: "web", label: "Web & Backend" },
  { filter: "ml", label: "Machine Learning" },
  { filter: "prog", label: "Languages & DB" }
];
