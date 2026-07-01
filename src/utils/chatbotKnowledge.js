// Knowledge base for the chatbot - Ravi Ranjan Kumar

export const personalInfo = {
  name: "Ravi Ranjan Kumar",
  role: "AI Engineer | Machine Learning Engineer | Full Stack Developer",
  location: "India",
  email: "raviranjan.cse2003@gmail.com",
  phone: "+91 9546358236",

  skills: {
    languages: ["Python", "Java", "SQL"],
    frontend: ["React"],
    backend: ["FastAPI", "REST API", "Streamlit"],
    databases: ["MySQL", "PostgreSQL", "Supabase"],
    ai_ml: ["Machine Learning", "Deep Learning", "LLMs", "LangChain", "RAG", "Computer Vision"],
    libraries: ["TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "OpenCV", "Matplotlib"],
    core_cs: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems"],
    soft_skills: ["Problem Solving", "Team Collaboration", "Research"]
  },

  education: [
    {
      institution: "Chandigarh University",
      degree: "B.E. Computer Science and Engineering",
      duration: "April 2022 – July 2026",
    }
  ],

  projects: [
    {
      name: "Smart AI Attendance System",
      description: "AI-powered biometric attendance platform using face recognition. Built teacher and student dashboards with Supabase cloud database and real-time attendance tracking.",
      technologies: ["Python", "Streamlit", "Supabase", "OpenCV"],
    },
    {
      name: "AI-Powered Resume ATS & Candidate Intelligence System",
      description: "Full-stack AI Resume ATS with automated resume parsing, candidate ranking, semantic search using FAISS embeddings, and recruiter-friendly candidate reports.",
      technologies: ["Python", "FastAPI", "React", "FAISS", "RAG"],
    },
    {
      name: "ResearchMind – Multi-Agent AI Research System",
      description: "Multi-agent research assistant with Search, Reader, Writer and Critic agents. Generates structured AI research reports with real-time execution.",
      technologies: ["Python", "LangChain", "Streamlit", "Tavily", "Mistral AI"],
    },
    {
      name: "Pneumonia Detection Using Deep Learning",
      description: "Pneumonia detection model using chest X-ray images with transfer learning (ResNet50). Applied preprocessing and data augmentation for medical imaging.",
      technologies: ["Python", "TensorFlow", "ResNet50", "OpenCV"],
    }
  ],

  certifications: [
    {
      title: "Cloud Computing – NPTEL (Silver Medal)",
      description: "Certified in Cloud Computing with a Silver Medal from NPTEL"
    },
    {
      title: "Computer Organization and Architecture – NPTEL",
      description: "Certified in Computer Organization and Architecture from NPTEL"
    },
    {
      title: "IoT Architectures and Protocols – NPTEL",
      description: "Certified in IoT Architectures and Protocols from NPTEL"
    }
  ],

  interests: ["AI/ML Research", "Full Stack Development", "Computer Vision", "LLM Applications"],

  availability: "Open to AI/ML Engineer, Machine Learning Engineer, and Full Stack Developer opportunities"
};

// Intelligent response system
export const getResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();

  // Greeting responses
  if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return `Hello! 👋 I'm an AI assistant here to help you learn more about ${personalInfo.name}, an ${personalInfo.role}. Feel free to ask me about skills, education, projects, certifications, or anything else!`;
  }

  // Name queries
  if (message.match(/\b(name|who are you|who is this|introduce)\b/)) {
    return `This portfolio belongs to **${personalInfo.name}**, an **${personalInfo.role}** based in ${personalInfo.location}. He is a final-year CSE student at Chandigarh University, specializing in building real-world AI applications. How can I help you learn more?`;
  }

  // Skills queries
  if (message.match(/\b(skill|technology|tech stack|know|proficient|expertise|programming)\b/)) {
    return `${personalInfo.name} has extensive expertise in:\n\n**Languages:** ${personalInfo.skills.languages.join(', ')}\n\n**AI/ML:** ${personalInfo.skills.ai_ml.join(', ')}\n\n**Libraries:** ${personalInfo.skills.libraries.join(', ')}\n\n**Backend:** ${personalInfo.skills.backend.join(', ')}\n\n**Frontend:** ${personalInfo.skills.frontend.join(', ')}\n\n**Databases:** ${personalInfo.skills.databases.join(', ')}\n\n**Core CS:** ${personalInfo.skills.core_cs.join(', ')}`;
  }

  // AI/ML specific queries
  if (message.match(/\b(ai|artificial intelligence|machine learning|ml|llm|langchain|rag|deep learning|computer vision)\b/)) {
    return `${personalInfo.name} is highly skilled in AI/ML!\n\n**AI/ML Skills:** ${personalInfo.skills.ai_ml.join(', ')}\n\n**Libraries:** ${personalInfo.skills.libraries.join(', ')}\n\n**Recent AI Projects:**\n• Smart AI Attendance System using face recognition\n• AI-Powered Resume ATS with semantic search and FAISS\n• ResearchMind – Multi-Agent AI Research System\n• Pneumonia Detection using Deep Learning (ResNet50)`;
  }

  // Education queries
  if (message.match(/\b(education|university|college|degree|study|student|academic)\b/)) {
    const edu = personalInfo.education[0];
    return `**Education:**\n\n🎓 **${edu.institution}**\n${edu.degree}\n${edu.duration}\n\n${personalInfo.name} is a final-year CSE student with hands-on experience building 4+ end-to-end AI systems.`;
  }

  // General experience/work queries
  if (message.match(/\b(experience|work|job|worked|career|professional|intern)\b/)) {
    return `${personalInfo.name} is a final-year CSE student at Chandigarh University (April 2022 – July 2026) with hands-on experience building 4+ end-to-end AI systems:\n\n**1. Smart AI Attendance System** – Face recognition platform\n**2. AI-Powered Resume ATS** – Semantic search & candidate ranking\n**3. ResearchMind** – Multi-Agent AI Research System\n**4. Pneumonia Detection** – Deep learning medical imaging\n\nHe is skilled in Python, Java, TensorFlow, FastAPI, React, LangChain, RAG, and Computer Vision.`;
  }

  // Projects queries
  if (message.match(/\b(project|built|created|developed|portfolio)\b/)) {
    const projects = personalInfo.projects.map((p, i) =>
      `**${i + 1}. ${p.name}**\n${p.description}\nTech: ${p.technologies.join(', ')}`
    ).join('\n\n');
    return `Here are the projects by ${personalInfo.name}:\n\n${projects}\n\nThese projects showcase expertise in AI/ML, Computer Vision, LLMs, and full-stack development!`;
  }

  // Certifications queries
  if (message.match(/\b(certification|certificate|achievement|award|nptel)\b/)) {
    const certs = personalInfo.certifications.map((c, i) =>
      `**${i + 1}. ${c.title}**\n${c.description}`
    ).join('\n\n');
    return `${personalInfo.name} has earned the following certifications:\n\n${certs}`;
  }

  // Contact queries
  if (message.match(/\b(contact|email|phone|reach|connect|hire|available|touch)\b/)) {
    return `You can reach ${personalInfo.name} at:\n\n📧 **Email:** ${personalInfo.email}\n📱 **Phone:** ${personalInfo.phone}\n\n${personalInfo.name} is currently **${personalInfo.availability}**.\n\nFeel free to reach out for AI/ML projects, full-stack development, or collaboration opportunities!`;
  }

  // Backend specific
  if (message.match(/\b(backend|back-end|server|api|fastapi|flask|rest)\b/)) {
    return `${personalInfo.name} is skilled in backend development!\n\n**Backend:** ${personalInfo.skills.backend.join(', ')}\n\n**Databases:** ${personalInfo.skills.databases.join(', ')}\n\nHe has built full-stack applications with FastAPI, React, and Supabase for projects like the AI Resume ATS and Smart AI Attendance System.`;
  }

  // Python specific
  if (message.match(/\b(python|pytorch|tensorflow|scikit)\b/)) {
    return `${personalInfo.name} is highly proficient in Python for AI/ML!\n\n**Libraries:** ${personalInfo.skills.libraries.join(', ')}\n\n**Backend:** ${personalInfo.skills.backend.join(', ')}\n\nPython is his primary language for building AI systems, ML models, and backend services.`;
  }

  // Database queries
  if (message.match(/\b(database|sql|mysql|postgresql|supabase|dbms)\b/)) {
    return `${personalInfo.name} works with multiple database systems:\n\n**Databases:** ${personalInfo.skills.databases.join(', ')}\n\nHe has experience in database design and building data-driven applications including the Smart AI Attendance System with Supabase.`;
  }

  // LangChain/RAG specific
  if (message.match(/\b(langchain|rag|retrieval|agent|multi-agent)\b/)) {
    return `${personalInfo.name} is experienced with LangChain, RAG, and multi-agent systems!\n\nHe has built:\n• ResearchMind – Multi-Agent AI Research System with Search, Reader, Writer and Critic agents\n• AI-Powered Resume ATS with semantic search using FAISS and RAG\n\nThese showcase his ability to build intelligent, context-aware AI applications.`;
  }

  // Interests/hobbies
  if (message.match(/\b(interest|hobby|hobbies|like|enjoy|passion)\b/)) {
    return `${personalInfo.name} is passionate about: ${personalInfo.interests.join(', ')}.`;
  }

  // Help/capabilities
  if (message.match(/\b(help|can you|what can|capabilities)\b/)) {
    return `I can help you learn about ${personalInfo.name}:\n\n• **Skills** - AI/ML, Full Stack, Databases\n• **Education** - Chandigarh University, B.E. CSE\n• **Projects** - AI Attendance, Resume ATS, ResearchMind, Pneumonia Detection\n• **Certifications** - NPTEL Cloud Computing (Silver Medal), and more\n• **Contact** - Email and phone information\n\nJust ask me anything!`;
  }

  // Thank you
  if (message.match(/\b(thank|thanks|appreciate)\b/)) {
    return `You're welcome! Feel free to ask if you have any other questions about ${personalInfo.name}! 😊`;
  }

  // Goodbye
  if (message.match(/\b(bye|goodbye|see you|later)\b/)) {
    return `Goodbye! Feel free to come back anytime if you have more questions about ${personalInfo.name}. Have a great day! 👋`;
  }

  // Default response
  return `I'm here to help you learn about ${personalInfo.name}, an AI Engineer & ML Engineer with expertise in building real-world AI applications!\n\nYou can ask me about:\n• **AI/ML Skills** - LangChain, RAG, TensorFlow, PyTorch, Computer Vision\n• **Full Stack** - FastAPI, React, Streamlit\n• **Education** - Chandigarh University, B.E. CSE\n• **Projects** - AI Attendance, Resume ATS, ResearchMind, Pneumonia Detection\n• **Certifications** - NPTEL certifications\n• **Contact Information**\n\nWhat would you like to know?`;
};
