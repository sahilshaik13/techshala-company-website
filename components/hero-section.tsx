import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-40">
      {/* Background Image with Circuit Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Updated to use the new circuit background image with correct path */}
        {/* added object-top to prevent the image from being cut off at the top */}
        <img
          src="/circuit.jpg"
          alt="Circuit Board Background"
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 p-8 md:p-16 rounded-2xl bg-white/80 backdrop-blur-md border border-primary/10 shadow-xl">
          {/* Logo Placeholder */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground drop-shadow-sm">
            Tech for Every Talent, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Dreams for Every Mind.
            </span>
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <h2 className="font-semibold text-primary text-2xl uppercase tracking-wider">What We Stand For</h2>
            <p className="font-light text-foreground/80">
              We’re not just teaching tech — we’re building bridges between curiosity and confidence. Between forgotten
              towns and global opportunities. Between passion and purpose.
            </p>
          </div>

          <div className="pt-8">
            <Link href="/#about">
              <Button
                size="lg"
                className="rounded-full text-base px-8 h-12 shadow-md hover:scale-105 transition-transform"
              >
                Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
