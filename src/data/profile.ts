// Portfolio Data - Edit this file to update your portfolio
// The admin dashboard at /observatory-9x7k2m can help you export/view this data

export const profile = {
  name: "Abhijat Sarari",
  title: "System Engineer & AI Architect",
  tagline: "Building tomorrow's intelligence today",
  taglines: [
    "Building tomorrow's intelligence today",
    "148+ hackathons and counting",
    "Microsoft Learn Student Ambassador",
    "From code to cloud to AI",
    "600+ certifications earned",
  ],
  email: "abhijatsarari@gmail.com",
  location: "India",
  bio: "System Engineer at Wipro, Microsoft Learn Student Ambassador. Passionate about AI/ML, cloud computing, and building innovative solutions that push the boundaries of technology.",
  avatar: "/profile.jpg",
  resume: "/resume.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/abhijatsarari/",
    github: "https://github.com/ABHIJATSARARI",
    medium: "https://medium.com/@AbhijatSarari",
    devpost: "https://devpost.com/AbhijatSarari",
    twitter: "https://twitter.com/AbhijatSarari",
  },
  stats: {
    hackathons: 148,
    projects: 36,
    certifications: 600,
    publications: 5,
  },
};

export const experience = [
  {
    id: 1,
    title: "System Engineer",
    company: "Wipro",
    location: "Remote / India",
    period: "2024 - Present",
    description: "Working on enterprise solutions for major banking clients, implementing scalable microservices and system architecture.",
    technologies: ["Java", "Spring Boot", "AWS", "Microservices", "Docker"],
    current: true,
    projects: [
      {
        name: "Citibank Integration Platform",
        highlights: [
          "Designed and implemented RESTful APIs for core banking operations",
          "Reduced system latency by 40% through optimization",
          "Led migration of legacy systems to cloud infrastructure",
        ],
      },
      {
        name: "RBS Data Pipeline",
        highlights: [
          "Built real-time data processing pipeline handling 10K+ TPS",
          "Implemented monitoring and alerting systems",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "AI/ML Intern",
    company: "Sciffer Analytics",
    location: "Bangalore, India",
    period: "2023",
    description: "Developed machine learning models for business analytics and predictive solutions using Python and deep learning frameworks.",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NLP"],
    current: false,
    highlights: [
      "Built sentiment analysis model with 92% accuracy",
      "Automated data preprocessing pipeline reducing manual work by 60%",
      "Created interactive dashboards for model performance monitoring",
      "Collaborated on customer churn prediction system",
    ],
  },
  {
    id: 3,
    title: "Research Intern",
    company: "IIT Kharagpur",
    location: "Kharagpur, India",
    period: "2022",
    description: "Conducted research on NLP and computer vision applications using deep learning under faculty guidance.",
    technologies: ["PyTorch", "NLP", "Computer Vision", "BERT", "Research"],
    current: false,
    highlights: [
      "Published research paper on deep learning for climate prediction",
      "Implemented BERT-based text classification system",
      "Contributed to open-source computer vision toolkit",
      "Presented findings at departmental research symposium",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "SustainaPal",
    description: "Sustainability tracking platform that won Microsoft Imagine Cup 2024 global recognition.",
    image: "/projects/sustainapal.png",
    technologies: ["React", "Azure", "AI/ML", "Node.js"],
    liveUrl: "https://sustainapal.com",
    githubUrl: "https://github.com/ABHIJATSARARI/sustainapal",
    featured: true,
    award: "Microsoft Imagine Cup Winner",
  },
  {
    id: 2,
    title: "CLIMA.AI",
    description: "Climate intelligence platform using AI for environmental analysis. Dell Hackathon winner.",
    image: "/projects/clima-ai.png",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    liveUrl: "https://clima-ai.app",
    githubUrl: "https://github.com/ABHIJATSARARI/clima-ai",
    featured: true,
    award: "Dell Hackathon Winner",
  },
  {
    id: 3,
    title: "BridgeQuest",
    description: "Educational gamification platform for learning. Google Cloud Hackathon winner.",
    image: "/projects/bridgequest.png",
    technologies: ["Next.js", "Google Cloud", "Firebase", "TypeScript"],
    liveUrl: "https://bridgequest.dev",
    githubUrl: "https://github.com/ABHIJATSARARI/bridgequest",
    featured: true,
    award: "Google Cloud Winner",
  },
  {
    id: 4,
    title: "Olifie",
    description: "AI-powered personal assistant for productivity and task management.",
    image: "/projects/olifie.png",
    technologies: ["Python", "OpenAI", "React Native", "MongoDB"],
    liveUrl: "https://olifie.app",
    githubUrl: "https://github.com/ABHIJATSARARI/olifie",
    featured: false,
    award: "InnoHacks Top 10",
  },
];

export const skills = {
  categories: [
    {
      name: "AI/ML",
      icon: "🧠",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "Deep Learning"],
    },
    {
      name: "Cloud",
      icon: "☁️",
      skills: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    },
    {
      name: "Languages",
      icon: "💻",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C++"],
    },
    {
      name: "Web",
      icon: "🌐",
      skills: ["React", "Next.js", "Node.js", "FastAPI", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Tools",
      icon: "🛠️",
      skills: ["Git", "Linux", "VS Code", "Jupyter", "Postman", "Figma"],
    },
  ],
};

export const certifications = [
  {
    id: 1,
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    icon: "🏆",
    link: "https://aws.amazon.com/certification/",
    date: "2024",
  },
  {
    id: 2,
    name: "Azure AI Engineer",
    issuer: "Microsoft",
    icon: "🎖️",
    link: "https://learn.microsoft.com/certifications/",
    date: "2024",
  },
  {
    id: 3,
    name: "Google Cloud Professional",
    issuer: "Google",
    icon: "📜",
    link: "https://cloud.google.com/certification/",
    date: "2023",
  },
  {
    id: 4,
    name: "TensorFlow Developer",
    issuer: "Google",
    icon: "🧠",
    link: "https://www.tensorflow.org/certificate",
    date: "2023",
  },
  {
    id: 5,
    name: "Microsoft Learn Student Ambassador",
    issuer: "Microsoft",
    icon: "⭐",
    link: "https://studentambassadors.microsoft.com/",
    date: "2023",
  },
];

export const publications = [
  {
    id: 1,
    title: "Deep Learning Approaches for Climate Prediction",
    publisher: "IEEE",
    type: "Research Paper",
    link: "https://ieeexplore.ieee.org/",
    year: 2024,
  },
  {
    id: 2,
    title: "NLP Techniques for Sentiment Analysis",
    publisher: "ACM",
    type: "Conference Paper",
    link: "https://dl.acm.org/",
    year: 2023,
  },
  {
    id: 3,
    title: "Building Scalable ML Pipelines on AWS",
    publisher: "Medium",
    type: "Article",
    link: "https://medium.com/@AbhijatSarari",
    year: 2024,
  },
];

export const testimonials = [
  {
    id: 1,
    quote: "Abhijat's technical expertise and innovative thinking made him an invaluable team member.",
    author: "Senior Engineer",
    role: "Team Lead, Wipro",
  },
  {
    id: 2,
    quote: "One of the most dedicated developers I've worked with. His hackathon projects showcase true innovation.",
    author: "Mentor",
    role: "Microsoft Learn Program",
  },
  {
    id: 3,
    quote: "Abhijat's research contributions during his internship were exceptional.",
    author: "Research Supervisor",
    role: "IIT Kharagpur",
  },
];

export const achievements = [
  {
    id: 1,
    title: "SustainaPal",
    event: "Microsoft Imagine Cup 2024",
    type: "Global Winner",
    description: "World finals recognition for sustainability innovation",
  },
  {
    id: 2,
    title: "CLIMA.AI",
    event: "Dell Hackathon",
    type: "First Place",
    description: "Climate intelligence platform using AI",
  },
  {
    id: 3,
    title: "BridgeQuest",
    event: "Google Cloud Hackathon",
    type: "Winner",
    description: "Educational bridge-building gamification",
  },
  {
    id: 4,
    title: "Microsoft Ambassador",
    event: "Microsoft Learn",
    type: "Student Ambassador",
    description: "Selected as campus tech leader",
  },
];
