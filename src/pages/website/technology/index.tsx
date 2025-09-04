import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO, pageSEO } from "@/components/seo";
import {
  IconChartBar,
  IconCpu,
  IconBulb,
  IconWifi,
  IconShield,
  IconDatabase,
  IconSettings,
  IconActivity,
  IconArrowRight,
  IconCheck,
  IconBolt,
  IconEye,
  IconCloud,
  IconDevices,
  IconCode,
} from "@tabler/icons-react";

export function TechnologyPage() {
  const technicalSpecs = [
    {
      category: "LED System",
      icon: IconBulb,
      color: "text-yellow-500",
      specs: [
        { label: "Wavelength", value: "450-470 nm (Blue LED)" },
        { label: "Light Intensity", value: "30-50 μW/cm²/nm" },
        { label: "Treatment Area", value: "60 x 40 cm" },
        { label: "LED Lifetime", value: "> 50,000 hours" },
        { label: "Uniformity", value: "> 80%" },
        { label: "Spectral Purity", value: "> 95%" },
      ],
    },
    {
      category: "Power & Thermal",
      icon: IconBolt,
      color: "text-orange-500",
      specs: [
        { label: "Power Consumption", value: "< 150W" },
        { label: "Input Voltage", value: "100-240V AC" },
        { label: "Operating Temperature", value: "20-30°C" },
        { label: "Cooling System", value: "Active air cooling" },
        { label: "Noise Level", value: "< 45 dB" },
        { label: "Heat Generation", value: "Minimal (< 5°C rise)" },
      ],
    },
    {
      category: "Connectivity",
      icon: IconWifi,
      color: "text-blue-500",
      specs: [
        { label: "Wi-Fi", value: "802.11 b/g/n/ac" },
        { label: "Bluetooth", value: "5.0 LE" },
        { label: "Ethernet", value: "10/100 Mbps" },
        { label: "USB", value: "USB 3.0 x2" },
        { label: "Serial", value: "RS-232/485" },
        { label: "Cloud API", value: "RESTful API" },
      ],
    },
    {
      category: "Safety & Compliance",
      icon: IconShield,
      color: "text-green-500",
      specs: [
        { label: "Medical Standards", value: "IEC 60601-1, 60601-2-50" },
        { label: "EMC Compliance", value: "IEC 60601-1-2" },
        { label: "FDA Approval", value: "Class II Medical Device" },
        { label: "CE Marking", value: "MDD 93/42/EEC" },
        { label: "ISO Certification", value: "ISO 13485" },
        { label: "IP Rating", value: "IP54 (Dust/Water resistant)" },
      ],
    },
  ];

  const systemArchitecture = [
    {
      component: "LED Control Unit",
      description: "Advanced microcontroller-based LED driver with PWM control",
      features: [
        "Real-time intensity adjustment",
        "Thermal protection",
        "Fault detection",
      ],
      icon: IconCpu,
    },
    {
      component: "Sensor Array",
      description:
        "Multi-sensor system for comprehensive environmental monitoring",
      features: [
        "Temperature sensors",
        "Light intensity meters",
        "Humidity detection",
      ],
      icon: IconActivity,
    },
    {
      component: "Communication Hub",
      description:
        "Multi-protocol communication interface for seamless connectivity",
      features: [
        "Wi-Fi/Bluetooth modules",
        "Cloud synchronization",
        "Local data storage",
      ],
      icon: IconWifi,
    },
    {
      component: "Safety Controller",
      description:
        "Dedicated safety system with redundant monitoring capabilities",
      features: [
        "Emergency stop circuit",
        "Thermal monitoring",
        "System diagnostics",
      ],
      icon: IconShield,
    },
  ];

  const softwareFeatures = [
    {
      title: "Embedded Firmware",
      description: "Real-time operating system for precise device control",
      technologies: ["FreeRTOS", "ARM Cortex-M7", "C/C++"],
      icon: IconCode,
    },
    {
      title: "Mobile Application",
      description:
        "Cross-platform mobile app for device monitoring and control",
      technologies: ["React Native", "TypeScript", "Real-time WebSocket"],
      icon: IconDevices,
    },
    {
      title: "Web Dashboard",
      description: "Comprehensive web-based management and analytics platform",
      technologies: ["React", "Node.js", "PostgreSQL"],
      icon: IconChartBar,
    },
    {
      title: "Cloud Platform",
      description:
        "Scalable cloud infrastructure for data processing and storage",
      technologies: ["AWS/Azure", "Docker", "Microservices"],
      icon: IconCloud,
    },
  ];

  const innovativeFeatures = [
    {
      title: "Adaptive Light Control",
      description:
        "AI-powered system that automatically adjusts light intensity based on treatment progress and patient response.",
      benefits: [
        "Optimized treatment duration",
        "Reduced energy consumption",
        "Improved outcomes",
      ],
      icon: IconEye,
    },
    {
      title: "Predictive Analytics",
      description:
        "Machine learning algorithms analyze treatment data to predict optimal therapy parameters.",
      benefits: [
        "Treatment optimization",
        "Early intervention alerts",
        "Outcome prediction",
      ],
      icon: IconChartBar,
    },
    {
      title: "Remote Monitoring",
      description:
        "Real-time monitoring capabilities allow healthcare providers to oversee treatments remotely.",
      benefits: [
        "24/7 monitoring",
        "Instant alerts",
        "Telemedicine integration",
      ],
      icon: IconActivity,
    },
    {
      title: "Data Integration",
      description:
        "Seamless integration with hospital information systems and electronic medical records.",
      benefits: [
        "EMR synchronization",
        "Workflow integration",
        "Comprehensive reporting",
      ],
      icon: IconDatabase,
    },
  ];

  const certifications = [
    { name: "FDA Approved", description: "Class II Medical Device clearance" },
    { name: "CE Marked", description: "European Conformity certification" },
    { name: "ISO 13485", description: "Medical device quality management" },
    { name: "IEC 60601", description: "Medical electrical equipment safety" },
    { name: "FCC Certified", description: "Electromagnetic compatibility" },
    {
      name: "RoHS Compliant",
      description: "Restriction of hazardous substances",
    },
  ];

  return (
    <>
      <SEO {...pageSEO.technology} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="mx-auto">
                  <IconCpu className="mr-1 h-3 w-3" />
                  Advanced Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Precision Engineering for{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Medical Excellence
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Explore the cutting-edge technology and engineering excellence
                  that powers the NeoCare phototherapy system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconSettings className="mr-1 h-3 w-3" />
                Technical Specifications
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Detailed{" "}
                <span className="text-blue-600">System Specifications</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {technicalSpecs.map((category, index) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-muted ${category.color}`}
                      >
                        <category.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">
                        {category.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-border/40 last:border-0"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {spec.label}
                          </span>
                          <span className="text-sm font-bold">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconCpu className="mr-1 h-3 w-3" />
                System Architecture
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Advanced <span className="text-green-600">Hardware Design</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Modular architecture designed for reliability, scalability, and
                ease of maintenance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {systemArchitecture.map((component, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <component.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">
                        {component.component}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="space-y-2">
                      {component.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <IconCheck className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Software & Platforms */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconCode className="mr-1 h-3 w-3" />
                Software Platforms
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Modern <span className="text-purple-600">Software Stack</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {softwareFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3">
                      <feature.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="space-y-1">
                      {feature.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Innovative Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconBulb className="mr-1 h-3 w-3" />
                Innovation
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Next-Generation{" "}
                <span className="text-blue-600">Capabilities</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {innovativeFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <IconCheck className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconShield className="mr-1 h-3 w-3" />
                Certifications & Compliance
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Industry <span className="text-green-600">Standards</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Full compliance with international medical device standards and
                regulations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconShield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8">
                <Link to="/about" className="flex items-center gap-2">
                  Learn More About NeoCare
                  <IconArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
