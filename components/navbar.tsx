"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsOpen(false)

    if (pathname === "/") {
      // If we're already on the home page, just scroll
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If we're on another page, navigate to home with hash
      router.push(`/#${id}`)
    }
  }

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Leadership", id: "leadership" },
    { name: "What We Do", id: "about" },
    { name: "Future Plans", id: "future-plans" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || pathname !== "/"
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Adjusted logo container to be wider for cropping effect */}
          {/* Increased height to h-9 to prevent cutting off the top of the logo while keeping width w-28 */}
          <div className="relative h-9 w-28">
            <Image
              src="/transparent-logo-techshala.png"
              alt="Techshala Logo"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`/#${link.id}`}
              onClick={(e) => handleNavigation(e, link.id)}
              className={cn(
                "text-sm font-medium transition-colors cursor-pointer hover:text-primary",
                isScrolled || pathname !== "/" ? "text-black" : "text-white",
              )}
            >
              {link.name}
            </a>
          ))}
          {/* Grouped buttons to reduce spacing between them and matched styling */}
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                // Cast to any to satisfy the type since we know it's compatible for the click handler
                handleNavigation(e as any, "contact")
              }}
            >
              Get in Touch
            </Button>
            <Link href="/customize-plan">
              <Button variant={pathname === "/customize-plan" ? "secondary" : "default"}>Customize Plan</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden p-2", isScrolled || pathname !== "/" ? "text-black" : "text-white")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-primary/10 p-4 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`/#${link.id}`}
                onClick={(e) => handleNavigation(e, link.id)}
                className="text-lg font-medium py-2 border-b border-primary/5 text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavigation(e, "contact")}
              className="text-lg font-medium py-2 border-b border-primary/5 text-foreground"
            >
              Get in Touch
            </a>
            <Link
              href="/customize-plan"
              className="text-lg font-medium py-2 border-b border-primary/5 text-primary"
              onClick={() => setIsOpen(false)}
            >
              Customize Plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
