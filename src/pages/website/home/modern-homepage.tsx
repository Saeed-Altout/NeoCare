import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconHeart,
  IconActivity,
  IconShield,
  IconChartBar,
  IconWifi,
  IconThermometer,
  IconBulb,
  IconSettings,
  IconUsers,
  IconAward,
  IconArrowRight,
  IconCheck,
  IconStar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconStethoscope,
} from "@tabler/icons-react";

export function ModernHomePage() {
  const features = [
    {
      icon: IconHeart,
      title: "Safe & Gentle",
      description:
        "Advanced LED technology provides effective treatment while ensuring patient safety and comfort.",
      color: "text-red-500",
    },
    {
      icon: IconActivity,
      title: "Real-time Monitoring",
      description:
        "Continuous monitoring of vital parameters with instant alerts and data logging.",
      color: "text-green-500",
    },
    {
      icon: IconThermometer,
      title: "Temperature Control",
      description:
        "Precise temperature regulation with automated cooling systems for optimal conditions.",
      color: "text-blue-500",
    },
    {
      icon: IconWifi,
      title: "Smart Connectivity",
      description:
        "IoT-enabled device with wireless monitoring and remote management capabilities.",
      color: "text-purple-500",
    },
    {
      icon: IconChartBar,
      title: "Data Analytics",
      description:
        "Comprehensive reporting and analytics for treatment optimization and outcome tracking.",
      color: "text-orange-500",
    },
    {
      icon: IconShield,
      title: "Clinical Grade",
      description:
        "Medical-grade components and compliance with international safety standards.",
      color: "text-indigo-500",
    },
  ];

  const specifications = [
    { label: "LED Wavelength", value: "450-470 nm" },
    { label: "Light Intensity", value: "30-50 μW/cm²/nm" },
    { label: "Treatment Area", value: "60 x 40 cm" },
    { label: "Power Consumption", value: "< 150W" },
    { label: "Operating Temperature", value: "20-30°C" },
    { label: "Connectivity", value: "Wi-Fi, Bluetooth" },
  ];

  const benefits = [
    "Reduces treatment time by up to 40%",
    "Minimizes heat exposure to newborns",
    "Automated session management",
    "Real-time parameter monitoring",
    "Comprehensive data logging",
    "Remote monitoring capabilities",
    "User-friendly interface",
    "24/7 technical support",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <IconAward className="mr-1 h-3 w-3" />
                  Medical Grade Device
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Advanced{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Neonatal
                  </span>{" "}
                  Phototherapy
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionary LED-based phototherapy system designed for safe
                  and effective treatment of neonatal jaundice with intelligent
                  monitoring and control.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Link to="#features" className="flex items-center gap-2">
                    Explore Features
                    <IconArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Link to="#contact" className="flex items-center gap-2">
                    Contact Us
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold">500+</span>{" "}
                  healthcare facilities
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative mx-auto w-32 h-32">
                      <IconStethoscope className="w-32 h-32 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-600">
                        NeoCare
                      </h3>
                      <p className="text-muted-foreground">
                        Phototherapy System
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                  <IconShield className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                  <IconBulb className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mx-auto">
              <IconSettings className="mr-1 h-3 w-3" />
              Advanced Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Cutting-Edge Technology for{" "}
              <span className="text-blue-600">Optimal Care</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our phototherapy system combines advanced LED technology with
              intelligent monitoring to deliver superior treatment outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-muted ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">
                  <IconChartBar className="mr-1 h-3 w-3" />
                  Technical Specifications
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Precision Engineering for{" "}
                  <span className="text-green-600">Medical Excellence</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Every component is carefully designed and tested to meet the
                  highest standards of medical device safety and efficacy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Key Benefits</h3>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <IconCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline">
                <IconUsers className="mr-1 h-3 w-3" />
                About NeoCare
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Dedicated to{" "}
                <span className="text-blue-600">Neonatal Healthcare</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconHeart className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To provide innovative, safe, and effective phototherapy
                    solutions that improve outcomes for newborns with jaundice.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconShield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Our Commitment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ensuring the highest standards of safety, quality, and
                    reliability in every device we manufacture.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconAward className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To be the leading provider of advanced neonatal care
                    technologies worldwide, improving lives one baby at a time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconMail className="mr-1 h-3 w-3" />
                Get in Touch
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ready to Transform{" "}
                <span className="text-blue-600">Neonatal Care</span>?
              </h2>
              <p className="text-xl text-muted-foreground">
                Contact us to learn more about NeoCare and how it can benefit
                your facility.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconMail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">info@neocare.com</p>
                  <p className="text-muted-foreground">support@neocare.com</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconPhone className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">24/7 Support</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconMapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">123 Medical Drive</p>
                  <p className="text-muted-foreground">
                    Healthcare City, HC 12345
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8">
                <Link to="/auth/sign-up" className="flex items-center gap-2">
                  Get Started Today
                  <IconArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
