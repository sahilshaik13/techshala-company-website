import { HeroSection } from "@/components/hero-section"
import { LeadershipSection } from "@/components/leadership-section"
import { WhatWeDoSection } from "@/components/what-we-do"
import { FuturePlansSection } from "@/components/future-plans"
import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import Image from "next/image"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <LeadershipSection />
      <WhatWeDoSection />
      <FuturePlansSection />
      <ContactSection />

      {/* Simple Footer */}
      <footer className="py-8 border-t border-primary/10 bg-muted/50 flex flex-col items-center gap-4 text-center px-4">
        <div className="relative h-9 w-28">
          <Image
            src="/transparent-logo-techshala.png"
            alt="Techshala Logo"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="space-y-2 max-w-2xl">
          <p className="text-sm text-muted-foreground font-medium">Techshala is a registered company under MSME.</p>
          <p className="text-xs text-muted-foreground/80">
            Possession of the logo or the name will be penalized as per the law. &copy; {new Date().getFullYear()} All
            rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
