import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const defaultSEO = {
  title: "NeoCare - Advanced Neonatal Phototherapy System",
  description:
    "Revolutionary LED-based phototherapy system for safe and effective treatment of neonatal jaundice with intelligent monitoring and real-time control.",
  keywords:
    "neonatal phototherapy, jaundice treatment, LED therapy, medical device, newborn care, phototherapy system, bilirubin reduction, healthcare technology",
  image: "https://neocare.medical/og-image.jpg",
  url: "https://neocare.medical/",
  type: "website",
  author: "NeoCare Medical Technologies",
};

// Helper function to update meta tags
const updateMetaTag = (name: string, content: string, property?: boolean) => {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement("meta");
    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
};

// Helper function to update link tags
const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute("href", href);
};

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | NeoCare` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    author: author || defaultSEO.author,
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update primary meta tags
    updateMetaTag("title", seo.title);
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords);
    updateMetaTag("author", seo.author);

    // Update canonical link
    updateLinkTag("canonical", seo.url);

    // Update Open Graph meta tags
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", seo.url, true);
    updateMetaTag("og:title", seo.title, true);
    updateMetaTag("og:description", seo.description, true);
    updateMetaTag("og:image", seo.image, true);
    updateMetaTag("og:site_name", "NeoCare", true);
    updateMetaTag("og:locale", "en_US", true);

    // Update Twitter meta tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    updateMetaTag("twitter:url", seo.url, true);
    updateMetaTag("twitter:title", seo.title, true);
    updateMetaTag("twitter:description", seo.description, true);
    updateMetaTag("twitter:image", seo.image, true);

    // Update additional meta tags
    updateMetaTag("theme-color", "#2563eb");
    updateMetaTag("msapplication-TileColor", "#2563eb");
    updateMetaTag("application-name", "NeoCare");
    updateMetaTag("apple-mobile-web-app-title", "NeoCare");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");

    // Handle article-specific meta tags
    if (type === "article") {
      if (publishedTime) {
        updateMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag("article:modified_time", modifiedTime, true);
      }
      if (author) {
        updateMetaTag("article:author", author, true);
      }
      if (section) {
        updateMetaTag("article:section", section, true);
      }
      if (tags) {
        // Remove existing article:tag meta tags
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());
        
        // Add new article:tag meta tags
        tags.forEach(tag => {
          updateMetaTag("article:tag", tag, true);
        });
      }
    }
  }, [seo.title, seo.description, seo.keywords, seo.image, seo.url, seo.author, type, publishedTime, modifiedTime, section, tags]);

  // This component doesn't render anything
  return null;
}

// Predefined SEO configs for different pages
export const pageSEO = {
  home: {
    title: "Advanced Neonatal Phototherapy System",
    description:
      "Revolutionary LED-based phototherapy system for safe and effective treatment of neonatal jaundice with intelligent monitoring and real-time control.",
    keywords:
      "neonatal phototherapy, jaundice treatment, LED therapy, medical device, newborn care, phototherapy system, bilirubin reduction, healthcare technology",
    url: "https://neocare.medical/",
  },
  about: {
    title: "About NeoCare - Pioneering Neonatal Healthcare",
    description:
      "Learn about NeoCare's mission to transform neonatal healthcare through innovative phototherapy technology. Meet our expert team and discover our journey in medical device development.",
    keywords:
      "NeoCare company, medical device manufacturer, neonatal healthcare, phototherapy innovation, medical technology team, healthcare solutions",
    url: "https://neocare.medical/about",
  },
  features: {
    title: "Advanced Features - NeoCare Phototherapy System",
    description:
      "Discover the cutting-edge features of NeoCare phototherapy system: real-time monitoring, intelligent LED control, safety systems, and advanced analytics for optimal neonatal care.",
    keywords:
      "phototherapy features, LED light therapy, real-time monitoring, medical device safety, intelligent control system, neonatal care technology",
    url: "https://neocare.medical/features",
  },
  technology: {
    title: "Technology & Specifications - NeoCare System",
    description:
      "Explore the advanced technology powering NeoCare: precision LED wavelengths, IoT connectivity, AI-powered analytics, and comprehensive technical specifications.",
    keywords:
      "phototherapy technology, LED specifications, medical device engineering, IoT healthcare, AI analytics, technical specifications",
    url: "https://neocare.medical/technology",
  },
  dashboard: {
    title: "Dashboard - NeoCare Management System",
    description:
      "Access the NeoCare dashboard for comprehensive patient management, real-time monitoring, treatment analytics, and device control.",
    keywords:
      "medical dashboard, patient management, treatment monitoring, healthcare analytics, device control",
    url: "https://neocare.medical/dashboard",
  },
  signIn: {
    title: "Sign In - NeoCare Portal",
    description:
      "Sign in to your NeoCare account to access patient management, treatment monitoring, and advanced phototherapy system controls.",
    keywords:
      "NeoCare login, medical portal, healthcare access, patient management login",
    url: "https://neocare.medical/auth/sign-in",
  },
  signUp: {
    title: "Sign Up - Join NeoCare",
    description:
      "Create your NeoCare account to access advanced neonatal phototherapy management tools and join healthcare professionals worldwide.",
    keywords:
      "NeoCare registration, medical account, healthcare signup, phototherapy access",
    url: "https://neocare.medical/auth/sign-up",
  },
};
