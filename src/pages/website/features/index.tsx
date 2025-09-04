import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO, pageSEO } from "@/components/seo";
import {
  IconHeart,
  IconActivity,
  IconShield,
  IconThermometer,
  IconWifi,
  IconChartBar,
  IconSettings,
  IconBulb,
  IconEye,
  IconCloud,
  IconLock,
  IconArrowRight,
  IconCheck,
  IconAlertTriangle,
  IconTrendingUp,
  IconDevices,
  IconBell,
  IconDatabase,
} from "@tabler/icons-react";

export function FeaturesPage() {
  const coreFeatures = [
    {
      icon: IconHeart,
      title: "Safe & Gentle Treatment",
      description:
        "Advanced LED technology provides effective phototherapy while ensuring maximum patient safety and comfort.",
      benefits: [
        "Reduced heat exposure",
        "Gentle on newborn skin",
        "Clinically proven efficacy",
      ],
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/10",
    },
    {
      icon: IconActivity,
      title: "Real-time Monitoring",
      description:
        "Continuous monitoring of vital parameters with instant alerts and comprehensive data logging.",
      benefits: [
        "24/7 parameter tracking",
        "Instant alert notifications",
        "Automated data recording",
      ],
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/10",
    },
    {
      icon: IconThermometer,
      title: "Precision Temperature Control",
      description:
        "Advanced thermal management system maintains optimal treatment conditions automatically.",
      benefits: [
        "Automated cooling system",
        "Temperature stability ±0.5°C",
        "Overheating protection",
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
      icon: IconWifi,
      title: "Smart Connectivity",
      description:
        "IoT-enabled device with wireless monitoring and seamless integration capabilities.",
      benefits: [
        "Wi-Fi & Bluetooth enabled",
        "Cloud data synchronization",
        "Remote monitoring access",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
    },
    {
      icon: IconChartBar,
      title: "Advanced Analytics",
      description:
        "Comprehensive reporting and analytics for treatment optimization and outcome tracking.",
      benefits: [
        "Treatment effectiveness metrics",
        "Progress visualization",
        "Outcome predictions",
      ],
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
    },
    {
      icon: IconShield,
      title: "Clinical Grade Safety",
      description:
        "Medical-grade components with full compliance to international safety standards.",
      benefits: ["FDA approved", "CE marked", "ISO 13485 certified"],
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/10",
    },
  ];

  const advancedFeatures = [
    {
      icon: IconEye,
      title: "Intelligent Light Management",
      description:
        "Adaptive LED intensity control based on real-time bilirubin monitoring.",
      specs: [
        "450-470nm wavelength",
        "30-50 μW/cm²/nm intensity",
        "Automatic adjustment",
      ],
    },
    {
      icon: IconCloud,
      title: "Cloud Integration",
      description:
        "Secure cloud platform for data storage, analysis, and remote access.",
      specs: [
        "HIPAA compliant storage",
        "Real-time synchronization",
        "Multi-device access",
      ],
    },
    {
      icon: IconLock,
      title: "Security & Privacy",
      description:
        "Enterprise-grade security with end-to-end encryption and access controls.",
      specs: ["AES-256 encryption", "Role-based access", "Audit trail logging"],
    },
    {
      icon: IconBell,
      title: "Smart Notifications",
      description:
        "Customizable alert system with multiple notification channels.",
      specs: [
        "Email & SMS alerts",
        "Mobile app notifications",
        "Custom alert rules",
      ],
    },
    {
      icon: IconDatabase,
      title: "Data Management",
      description:
        "Comprehensive data collection, storage, and analysis capabilities.",
      specs: [
        "Automated data backup",
        "Export capabilities",
        "Long-term storage",
      ],
    },
    {
      icon: IconDevices,
      title: "Multi-Device Support",
      description:
        "Compatible with various devices and hospital information systems.",
      specs: [
        "EMR integration",
        "Mobile compatibility",
        "Cross-platform support",
      ],
    },
  ];

  const safetyFeatures = [
    {
      title: "Emergency Stop System",
      description:
        "Immediate treatment cessation with single-button emergency stop.",
      icon: IconAlertTriangle,
    },
    {
      title: "Automatic Failsafe",
      description: "Built-in redundancy systems prevent equipment malfunction.",
      icon: IconShield,
    },
    {
      title: "Temperature Monitoring",
      description:
        "Continuous thermal monitoring with automatic cooling activation.",
      icon: IconThermometer,
    },
    {
      title: "LED Lifetime Tracking",
      description:
        "Automatic monitoring of LED performance and replacement alerts.",
      icon: IconBulb,
    },
  ];

  const performanceMetrics = [
    {
      label: "Treatment Efficacy",
      value: "95%",
      description: "Successful treatment rate",
    },
    {
      label: "Energy Efficiency",
      value: "40%",
      description: "Reduction in power consumption",
    },
    {
      label: "Setup Time",
      value: "2 min",
      description: "Average device setup time",
    },
    { label: "Uptime", value: "99.8%", description: "Device reliability rate" },
  ];

  return (
    <>
      <SEO {...pageSEO.features} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="mx-auto">
                  <IconSettings className="mr-1 h-3 w-3" />
                  Advanced Features
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Cutting-Edge Technology for{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Optimal Care
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Discover the comprehensive features that make NeoCare the most
                  advanced phototherapy system for neonatal jaundice treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconHeart className="mr-1 h-3 w-3" />
                Core Features
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Essential Features for{" "}
                <span className="text-blue-600">Superior Care</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className={`${feature.bgColor} rounded-t-lg`}>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-white/80 ${feature.color}`}
                      >
                        <feature.icon className="h-6 w-6" />
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

        {/* Advanced Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconBulb className="mr-1 h-3 w-3" />
                Advanced Capabilities
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Next-Generation{" "}
                <span className="text-green-600">Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced features that set NeoCare apart from traditional
                phototherapy systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="space-y-1">
                      {feature.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">
                            {spec}
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

        {/* Safety Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconShield className="mr-1 h-3 w-3" />
                Safety First
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Comprehensive{" "}
                <span className="text-red-600">Safety Systems</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Multiple layers of safety features ensure the highest level of
                patient protection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                      <feature.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconTrendingUp className="mr-1 h-3 w-3" />
                Performance Metrics
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Proven <span className="text-blue-600">Results</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold mb-1">
                      {metric.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8">
                <Link to="/technology" className="flex items-center gap-2">
                  Explore Technical Specifications
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
