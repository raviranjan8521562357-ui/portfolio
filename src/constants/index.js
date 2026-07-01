import {
  mobile,
  backend,
  creator,
  web,
  carrent,
  jobit,
  tripguide,
  research,
  translate,
  chatbot,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Engineer",
    icon: web,
  },
  {
    title: "Machine Learning",
    icon: mobile,
  },
  {
    title: "Full Stack Developer",
    icon: backend,
  },
  {
    title: "Computer Vision",
    icon: creator,
  },
];

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "REST APIs", "Streamlit"],
  },
  {
    title: "Databases & Cloud",
    skills: ["MySQL", "PostgreSQL", "Supabase"],
  },
  {
    title: "AI / Machine Learning",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "LangChain",
      "LangGraph",
      "RAG",
      "Computer Vision",
      "Prompt Engineering",
      "Agentic AI",
    ],
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "OpenCV",
      "Matplotlib",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Postman", "n8n"],
  },
  {
    title: "Core Computer Science",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "DBMS",
      "Operating Systems",
    ],
  },
];

const experiences = [
  {
    title: "Smart AI Attendance System",
    company_name: "Python, Streamlit, Supabase, OpenCV",
    icon: research,
    iconBg: "#383E56",
    points: [
      "AI-powered biometric attendance platform using face recognition for real-time tracking.",
      "Built dedicated teacher and student dashboards for managing attendance workflows.",
      "Integrated Supabase for cloud database storage and real-time data synchronization.",
      "Supports real-time attendance tracking with automated face detection and recognition.",
    ],
  },
  {
    title: "AI-Powered Resume ATS",
    company_name: "Python, FastAPI, React, FAISS, RAG",
    icon: translate,
    iconBg: "#E6DEDD",
    points: [
      "Built a full-stack AI Resume ATS & Candidate Intelligence System.",
      "Automated resume parsing and candidate ranking using NLP and embeddings.",
      "Implemented semantic search using FAISS for fast and accurate retrieval.",
      "Generated recruiter-friendly candidate reports with AI-powered insights.",
    ],
  },
  {
    title: "ResearchMind – Multi-Agent AI",
    company_name: "Python, LangChain, Streamlit, Tavily, Mistral AI",
    icon: chatbot,
    iconBg: "#E6DEDD",
    points: [
      "Built a multi-agent research assistant with specialized AI agents.",
      "Includes Search Agent, Reader Agent, Writer Agent and Critic Agent for end-to-end research.",
      "Generates structured AI research reports with citations and analysis.",
      "Supports real-time research execution with streaming results.",
    ],
  },
  {
    title: "Pneumonia Detection – Deep Learning",
    company_name: "Python, TensorFlow, ResNet50, OpenCV",
    icon: research,
    iconBg: "#383E56",
    points: [
      "Developed a pneumonia detection model using chest X-ray images and deep learning.",
      "Used transfer learning with ResNet50 for high-accuracy medical image classification.",
      "Applied preprocessing and data augmentation techniques to improve model robustness.",
      "Designed for future medical imaging applications and clinical deployment.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Cloud Computing – NPTEL Certification with Silver Medal, demonstrating strong understanding of cloud infrastructure and services.",
    name: "NPTEL",
    designation: "Silver Medal",
    company: "Cloud Computing",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/NPTEL_logo.png/220px-NPTEL_logo.png",
  },
  {
    testimonial:
      "Computer Organization and Architecture – NPTEL Certification, covering processor design, memory hierarchy, and system architecture.",
    name: "NPTEL",
    designation: "Certified",
    company: "Computer Organization",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/NPTEL_logo.png/220px-NPTEL_logo.png",
  },
  {
    testimonial:
      "IoT Architectures and Protocols – NPTEL Certification, covering IoT system design, communication protocols, and edge computing.",
    name: "NPTEL",
    designation: "Certified",
    company: "IoT Architectures",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/NPTEL_logo.png/220px-NPTEL_logo.png",
  },
];

const projects = [
  {
    name: "Smart AI Attendance System",
    description:
      "AI-powered biometric attendance platform using face recognition. Built teacher and student dashboards with Supabase cloud database and real-time attendance tracking.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "OpenCV", color: "green-text-gradient" },
      { name: "Streamlit", color: "pink-text-gradient" },
      { name: "Supabase", color: "orange-text-gradient" },
    ],
    features: [
      "Real-time face recognition attendance",
      "Teacher & student dashboards",
      "Cloud-synced database with Supabase",
    ],
    image: carrent,
    linkedin_link: "",
    github_link: "https://github.com/raviranjan8521562357-ui",
    live_demo_link: "",
  },
  {
    name: "AI Resume ATS System",
    description:
      "Full-stack AI Resume ATS with automated resume parsing, candidate ranking, semantic search using FAISS embeddings, and recruiter-friendly candidate intelligence reports.",
    tags: [
      { name: "FastAPI", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
      { name: "FAISS", color: "pink-text-gradient" },
      { name: "RAG", color: "orange-text-gradient" },
    ],
    features: [
      "Automated resume parsing & ranking",
      "Semantic search with FAISS embeddings",
      "AI-powered candidate intelligence reports",
    ],
    image: jobit,
    linkedin_link: "",
    github_link: "https://github.com/raviranjan8521562357-ui",
    live_demo_link: "",
  },
  {
    name: "ResearchMind – Multi-Agent AI",
    description:
      "Multi-agent AI research assistant with Search, Reader, Writer and Critic agents. Generates structured research reports with real-time execution using LangChain and Mistral AI.",
    tags: [
      { name: "LangChain", color: "blue-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "Mistral AI", color: "pink-text-gradient" },
      { name: "Tavily", color: "orange-text-gradient" },
    ],
    features: [
      "Multi-agent research pipeline",
      "Structured report generation with citations",
      "Real-time streaming execution",
    ],
    image: tripguide,
    linkedin_link: "",
    github_link: "https://github.com/raviranjan8521562357-ui",
    live_demo_link: "",
  },
];

export { services, skillCategories, experiences, testimonials, projects };
