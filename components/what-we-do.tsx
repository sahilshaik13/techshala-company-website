import { Rocket, Bot, Users, PackageOpen, BrainCircuit, Globe2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Rocket,
    title: "Future-Ready Education",
    description:
      "We conduct classes in schools to demystify upcoming technology, ensuring students are prepared to match the evolving pace of the digital world.",
  },
  {
    icon: Bot,
    title: "Interactive Robotics",
    description:
      "Complete hands-on learning with no complex textbooks. We teach robotics in an interactive way that engages students directly with the technology.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Guided by specialized mentors in the robotics field and personally trained volunteers who bring passion and expertise to every classroom.",
  },
  {
    icon: PackageOpen,
    title: "Accessible Resources",
    description:
      "We provide budget-friendly robot kits for rent or purchase, ensuring schools have effective tools without the high costs.",
  },
  {
    icon: BrainCircuit,
    title: "Impactful Curriculum",
    description:
      "Meticulously designed processes tailored for every age group to ensure deep understanding and long-term knowledge retention.",
  },
  {
    icon: Globe2,
    title: "Systemic Transformation",
    description:
      "Techshala isn't just a company; we aim to revolutionize the entire education system so that the future is useful for everyone and no one is left behind.",
  },
]

export function WhatWeDoSection() {
  return (
    <section id="about" className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What We Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Bridging the gap between traditional education and the future of technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-background rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/customize-plan">
            <Button
              size="lg"
              className="rounded-full text-base px-8 h-12 shadow-md hover:scale-105 transition-transform"
            >
              Customize Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
