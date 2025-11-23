"use client"

import { useEffect } from "react"
import { Instagram, ExternalLink, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { "feed-id": string };
    }
  }
}

export function GallerySection() {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://w.behold.so/widget.js"
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    // CHANGED: py-16 to py-8 to reduce vertical spacing
    <section id="gallery" className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl space-y-8">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600 rounded-full mb-1">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            TechShala Gram
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Catch our latest workshops, student projects, and behind-the-scenes moments directly from our Instagram feed.
          </p>
        </div>

        <div className="min-h-[400px] w-full bg-white rounded-xl shadow-sm p-2 md:p-4 border border-gray-100">
            <behold-widget feed-id="TNrlMVv5fmmKmBByPOtU"></behold-widget>
        </div>

        <div className="flex justify-center">
          <Button 
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all h-10 px-6 rounded-full text-sm"
            onClick={() => window.open("https://instagram.com/techshala.official", "_blank")}
          >
            <Heart className="w-4 h-4 mr-2 fill-white/20 group-hover:scale-110 transition-transform" />
            Follow @techshala.official
            <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
          </Button>
        </div>

      </div>
    </section>
  )
}