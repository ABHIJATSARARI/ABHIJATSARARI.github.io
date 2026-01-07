import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Abhijat Sarari | AI Architect & System Engineer from the Future",
  description: "Step into the future of technology. Abhijat Sarari - System Engineer at Wipro, Microsoft Learn Student Ambassador, AI/ML visionary with 148 hackathons, 36 innovative projects, and 600+ certifications. Building tomorrow's intelligence today.",
  keywords: [
    // Name variations
    "Abhijat Sarari",
    "Abhijat",
    "Sarari",
    // Titles
    "AI Engineer",
    "AI Architect",
    "System Engineer",
    "System Architect",
    "ML Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Software Engineer",
    "Full Stack Developer",
    // Skills
    "Machine Learning Expert",
    "Deep Learning",
    "Neural Networks",
    "Natural Language Processing",
    "NLP Expert",
    "Computer Vision",
    "Generative AI",
    "LLM",
    "ChatGPT",
    "Python Developer",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    // Cloud
    "Cloud Computing",
    "AWS Solutions Architect",
    "Azure AI Engineer",
    "Google Cloud Platform",
    "GCP",
    "DevOps",
    "Kubernetes",
    "Docker",
    // Organizations
    "Microsoft Student Ambassador",
    "Microsoft Learn Student Ambassador",
    "MLSA",
    "Wipro",
    "Wipro System Engineer",
    "BITS Pilani",
    "IIT Kharagpur",
    // Achievements
    "Hackathon Champion",
    "Hackathon Winner",
    "Microsoft Imagine Cup",
    "600 Certifications",
    "148 Hackathons",
    // Location
    "India",
    "Indian Developer",
    "Lucknow",
    // Portfolio
    "Developer Portfolio",
    "Tech Portfolio",
    "AI Portfolio",
  ],
  authors: [{ name: "Abhijat Sarari", url: "https://abhijatsarari.dev" }],
  creator: "Abhijat Sarari",
  publisher: "Abhijat Sarari",
  metadataBase: new URL("https://abhijatsarari.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abhijat Sarari | AI Architect from the Future",
    description: "Step into the future. 148 Hackathons. 36 Projects. 600+ Certifications. Experience innovation like never before.",
    url: "https://abhijatsarari.dev",
    siteName: "Abhijat Sarari - Digital Presence",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhijat Sarari - AI Architect & System Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijat Sarari | AI Architect from the Future",
    description: "Step into the future. 148 Hackathons. 36 Projects. 600+ Certifications.",
    images: ["/og-image.png"],
    creator: "@AbhijatSarari",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
    { media: "(prefers-color-scheme: light)", color: "#050508" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// JSON-LD Structured Data - Multiple Schemas
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://abhijatsarari.dev/#person",
  name: "Abhijat Sarari",
  url: "https://abhijatsarari.dev",
  image: "https://abhijatsarari.dev/profile.jpg",
  jobTitle: "System Engineer & AI/ML Specialist",
  description: "AI Architect, System Engineer at Wipro, Microsoft Learn Student Ambassador with 148+ hackathons and 600+ certifications.",
  email: "abhijatsarari@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Wipro",
    url: "https://www.wipro.com",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "BITS Pilani",
      url: "https://www.bits-pilani.ac.in",
    },
    {
      "@type": "EducationalOrganization",
      name: "BBAU",
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Cloud Computing",
    "Data Science",
    "Python",
    "TensorFlow",
    "PyTorch",
    "AWS",
    "Azure",
    "Google Cloud",
    "System Engineering",
    "Natural Language Processing",
    "Computer Vision",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Solutions Architect",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Azure AI Engineer",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Microsoft Learn Student Ambassador",
      credentialCategory: "Recognition",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/abhijatsarari/",
    "https://github.com/ABHIJATSARARI",
    "https://medium.com/@AbhijatSarari",
    "https://devpost.com/AbhijatSarari",
    "https://www.credly.com/users/abhijatsarari",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://abhijatsarari.dev/#website",
  url: "https://abhijatsarari.dev",
  name: "Abhijat Sarari - AI Architect Portfolio",
  description: "Portfolio of Abhijat Sarari - System Engineer, AI Architect, and Microsoft Student Ambassador",
  publisher: {
    "@id": "https://abhijatsarari.dev/#person",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://abhijatsarari.dev/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Abhijat Sarari's expertise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhijat Sarari specializes in AI/ML, Cloud Computing (AWS, Azure, GCP), System Engineering, and Full-Stack Development. He has expertise in Python, TensorFlow, PyTorch, and has 600+ certifications.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Abhijat Sarari work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhijat Sarari currently works as a System Engineer at Wipro, handling Citibank and RBS projects. He previously worked at Sciffer Analytics and IIT Kharagpur.",
      },
    },
    {
      "@type": "Question",
      name: "How many hackathons has Abhijat won?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhijat has participated in 148+ hackathons and won multiple awards including at Microsoft Imagine Cup, Dell Hackathon, and Google Cloud events.",
      },
    },
    {
      "@type": "Question",
      name: "What certifications does Abhijat have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhijat has 600+ certifications from providers including Google, Microsoft, AWS, IBM, and Coursera. Notable ones include AWS Solutions Architect and Azure AI Engineer.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Abhijat Sarari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact Abhijat via email at abhijatsarari@gmail.com or connect on LinkedIn at linkedin.com/in/abhijatsarari.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://abhijatsarari.dev",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://abhijatsarari.dev/#about",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: "https://abhijatsarari.dev/#projects",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: "https://abhijatsarari.dev/#contact",
    },
  ],
};

const jsonLd = [personSchema, websiteSchema, faqSchema, breadcrumbSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          as="style"
        />

        {/* Favicon */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="futuristic-body">
        {/* Ambient background layers */}
        <div className="ambient-layer ambient-layer-1" aria-hidden="true" />
        <div className="ambient-layer ambient-layer-2" aria-hidden="true" />
        <div className="ambient-layer ambient-layer-3" aria-hidden="true" />

        {/* Main content */}
        <ThemeProvider>
          <div className="content-layer">
            {children}
          </div>
        </ThemeProvider>

        {/* Noise overlay for texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Scanline effect */}
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
