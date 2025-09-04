import { Helmet } from "react-helmet-async";

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

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="NeoCare" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags &&
            tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      {/* Additional meta tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content="NeoCare" />
      <meta name="apple-mobile-web-app-title" content="NeoCare" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
  );
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
