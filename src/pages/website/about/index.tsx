import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO, pageSEO } from "@/components/seo";
import {
  IconHeart,
  IconShield,
  IconAward,
  IconUsers,
  IconTarget,
  IconTrendingUp,
  IconStethoscope,
  IconBulb,
  IconArrowRight,
  IconCheck,
  IconStar,
  IconCalendar,
  IconMedal,
} from "@tabler/icons-react";

export function AboutPage() {
  const values = [
    {
      icon: IconHeart,
      title: "Patient-Centered Care",
      description:
        "Every decision we make is guided by what's best for the newborns and families we serve.",
      color: "text-red-500",
    },
    {
      icon: IconShield,
      title: "Safety First",
      description:
        "Uncompromising commitment to safety standards and regulatory compliance in all our products.",
      color: "text-blue-500",
    },
    {
      icon: IconBulb,
      title: "Innovation",
      description:
        "Continuous research and development to advance neonatal phototherapy technology.",
      color: "text-yellow-500",
    },
    {
      icon: IconUsers,
      title: "Collaboration",
      description:
        "Working closely with healthcare professionals to understand and meet their needs.",
      color: "text-green-500",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "NeoCare was established with a mission to revolutionize neonatal care.",
    },
    {
      year: "2021",
      title: "First Prototype",
      description:
        "Developed our first LED-based phototherapy prototype with IoT capabilities.",
    },
    {
      year: "2022",
      title: "Clinical Trials",
      description:
        "Completed successful clinical trials in partnership with leading hospitals.",
    },
    {
      year: "2023",
      title: "FDA Approval",
      description:
        "Received FDA approval and CE marking for commercial distribution.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Expanded to serve over 500 healthcare facilities worldwide.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "Pediatrician with 15+ years in neonatal care",
      icon: IconStethoscope,
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      description: "Biomedical engineer specializing in LED technology",
      icon: IconBulb,
    },
    {
      name: "Dr. Ahmad Hassan",
      role: "Head of Research",
      description: "PhD in Biomedical Engineering, 20+ publications",
      icon: IconMedal,
    },
    {
      name: "Lisa Rodriguez",
      role: "VP of Operations",
      description: "Expert in medical device manufacturing",
      icon: IconTarget,
    },
  ];

  const achievements = [
    "500+ Healthcare facilities served",
    "10,000+ Successful treatments",
    "99.8% Device reliability rate",
    "24/7 Global support coverage",
    "ISO 13485 Certified",
    "FDA Approved & CE Marked",
  ];

  return (
    <>
      <SEO {...pageSEO.about} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="mx-auto">
                  <IconUsers className="mr-1 h-3 w-3" />
                  About NeoCare
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Pioneering the Future of{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Neonatal Care
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Founded with a mission to transform neonatal healthcare
                  through innovative technology, NeoCare is dedicated to
                  improving outcomes for the most vulnerable patients.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Rated <span className="font-semibold">4.9/5</span> by
                  healthcare professionals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconHeart className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    To provide innovative, safe, and effective phototherapy
                    solutions that improve outcomes for newborns with jaundice
                    while supporting healthcare professionals with advanced
                    monitoring and control systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconTarget className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    To be the global leader in neonatal phototherapy technology,
                    setting new standards for safety, efficacy, and user
                    experience in newborn care worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                    <IconAward className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Promise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    Ensuring the highest standards of quality, reliability, and
                    safety in every device we manufacture, backed by
                    comprehensive support and continuous innovation.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Values */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <Badge variant="outline">
                  <IconShield className="mr-1 h-3 w-3" />
                  Our Values
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  What Drives Us Forward
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div
                        className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${value.color} bg-muted`}
                      >
                        <value.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconCalendar className="mr-1 h-3 w-3" />
                Our Journey
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Milestones in <span className="text-blue-600">Innovation</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From concept to global impact, our journey reflects our
                commitment to advancing neonatal healthcare technology.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <IconUsers className="mr-1 h-3 w-3" />
                Leadership Team
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Meet Our <span className="text-green-600">Experts</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our team combines decades of experience in healthcare,
                engineering, and medical device development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-full flex items-center justify-center mb-4">
                      <member.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-blue-600 font-medium">
                      {member.role}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <Badge variant="outline">
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  Our Impact
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Making a Difference in{" "}
                  <span className="text-blue-600">Healthcare</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <IconCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="text-lg px-8">
                  <Link to="/features" className="flex items-center gap-2">
                    Explore Our Technology
                    <IconArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
