import { Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LeaderProps {
  name: string
  role: string
  imageSrc: string
  bio: string
  linkedinUrl: string
}

function LeaderCard({ name, role, imageSrc, bio, linkedinUrl }: LeaderProps) {
  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-muted shadow-lg border border-primary/10">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default State - Name Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-red-950/90 to-transparent transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="text-red-200 font-medium">{role}</p>
      </div>

      {/* Hover State - Full Overlay with Details */}
      <div className="absolute inset-0 bg-red-950/90 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {name}
        </h3>
        <p className="text-red-200 font-medium mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {role}
        </p>
        <p className="text-white/90 mb-8 leading-relaxed text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
          {bio}
        </p>
        <Link
          href={linkedinUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-red-900 transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200"
        >
          <Linkedin className="w-5 h-5" />
          <span>Connect on LinkedIn</span>
        </Link>
      </div>
    </div>
  )
}

export function LeadershipSection() {
  const leaders = [
    {
      name: "Mohammed Hassaan Ali",
      role: "Founder & CEO",
      imageSrc: "/hassaan-ali.jpg",
      bio: "Visionary leader dedicated to democratizing technology education. Passionate about bridging the gap between raw talent and industry demands.",
      linkedinUrl: "#",
    },
    {
      name: "Mohammed Shaik Sahil",
      role: "Co-Founder & COO",
      imageSrc: "/shaiksahil.png",
      bio: "Operational strategist ensuring excellence in every program. Focused on creating scalable pathways for student success and organizational growth.",
      linkedinUrl: "https://www.linkedin.com/in/mdshaiksahil",
    },
  ]

  return (
    <section id="leadership" className="py-16 px-4 bg-background border-t border-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The minds behind Techshala, driving innovation and education forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-4xl mx-auto">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} {...leader} />
          ))}
        </div>
      </div>
    </section>
  )
}
