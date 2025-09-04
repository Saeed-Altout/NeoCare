import { Link } from "react-router-dom";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconStethoscope,
} from "@tabler/icons-react";

export function WebsiteFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#technology" },
    { name: "Contact", href: "#contact" },
  ];

  const supportLinks = [
    { name: "Documentation", href: "#" },
    { name: "Technical Support", href: "#" },
    { name: "Training", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "Downloads", href: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Compliance", href: "#" },
  ];

  const socialLinks = [
    { name: "Twitter", icon: IconBrandTwitter, href: "#" },
    { name: "LinkedIn", icon: IconBrandLinkedin, href: "#" },
    { name: "Facebook", icon: IconBrandFacebook, href: "#" },
    { name: "Instagram", icon: IconBrandInstagram, href: "#" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <IconStethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    NeoCare
                  </span>
                  <span className="text-xs text-muted-foreground -mt-1">
                    Phototherapy System
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Advanced LED-based phototherapy system designed for safe and
              effective treatment of neonatal jaundice with intelligent
              monitoring and control.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconMail className="h-4 w-4" />
                <span>info@neocare.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconPhone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconMapPin className="h-4 w-4" />
                <span>123 Medical Drive, Healthcare City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} NeoCare. All rights reserved. Medical device for
              professional use only.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>FDA Approved</span>
              <span>CE Marked</span>
              <span>ISO 13485</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
