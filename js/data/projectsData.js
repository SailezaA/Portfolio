/**
 * Featured Projects & Architecture Deep Dives Data Model
 * Single Source of Truth for both Showcase Cards and Detailed Modals
 */
export const projectsData = [
  {
    id: "healthcare",
    category: "web",
    categoryLabel: "Enterprise & Healthcare",
    bannerClass: "banner-healthcare",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
    year: "2025 – Present",
    status: "Production Active",
    title: "Healthcare Management System",
    description: "End-to-end clinical and hospital operations platform developed on Frappe and modern web technologies. Integrates patient records, doctor scheduling, queue management, and automated invoicing.",
    featuresPreview: [
      "Comprehensive patient registration & EMR history tracking",
      "Dynamic appointment slot allocation & patient workflows",
      "Customized ERPNext and Frappe modules for healthcare operations"
    ],
    techStackPreview: ["Frappe", "ERPNext", "Python", "MariaDB", "JavaScript", "REST API"],
    modal: {
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
    }
  },
  {
    id: "unet",
    category: "ml",
    categoryLabel: "Medical AI & Deep Learning",
    bannerClass: "banner-ml",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04Z"/></svg>`,
    year: "2024 – 2024",
    status: "Completed & Deployed",
    title: "Brain Tumor Segmentation using UNet",
    description: "Medical image segmentation system using a custom UNet architecture developed with PyTorch. Features end-to-end data preprocessing, augmentation, FastAPI real-time inference, and Streamlit visualization.",
    featuresPreview: [
      "Built a UNet model from scratch for medical image segmentation",
      "FastAPI backend for high-speed sub-second real-time inference",
      "Streamlit interactive dashboard for clinical MRI slice inspection"
    ],
    techStackPreview: ["PyTorch", "UNet", "FastAPI", "Streamlit", "Computer Vision", "NumPy"],
    modal: {
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
    }
  },
  {
    id: "resume-matcher",
    category: "ml",
    categoryLabel: "NLP & Candidate Matching",
    bannerClass: "banner-nlp",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    year: "2023 – 2023",
    status: "Completed",
    title: "Resume Profiling & Aptitude Matching",
    description: "AI-driven recruitment intelligence pipeline designed to match candidate profiles with job descriptions using TF-IDF vectorization and Cosine Similarity, automating candidate screening.",
    featuresPreview: [
      "Candidate-to-job matching engine using Cosine Similarity",
      "Automated parts of the candidate selection pipeline",
      "Designed system to improve recruitment and candidate screening efficiency"
    ],
    techStackPreview: ["Python", "NLP", "Scikit-Learn", "Pandas", "NumPy", "Cosine Similarity"],
    modal: {
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
    }
  },
  {
    id: "devops-pipeline",
    category: "devops",
    categoryLabel: "DevOps & Infrastructure as Code",
    bannerClass: "banner-devops",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    year: "2025",
    status: "Trained & Validated",
    title: "Cloud Infrastructure & CI/CD Pipeline",
    description: "Production-grade automated software delivery system encompassing Docker multi-stage containers, Kubernetes cluster management, Jenkins CI/CD, Terraform AWS infrastructure, and Prometheus/Grafana monitoring.",
    featuresPreview: [
      "Docker multi-stage optimization & Kubernetes manifests",
      "Jenkins declarative CI/CD pipeline with automated testing",
      "Terraform AWS provisioning & Prometheus/Grafana alerting"
    ],
    techStackPreview: ["Docker", "Kubernetes", "Jenkins", "Ansible", "Terraform", "AWS", "Prometheus", "Grafana"],
    modal: {
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
  }
];

export const projectFilterTabs = [
  { filter: "all", label: "All Projects" },
  { filter: "web", label: "Frappe & Web" },
  { filter: "devops", label: "DevOps & Cloud" },
  { filter: "ml", label: "Machine Learning" }
];
