import { Navbar } from "@/components/navbar"
import { PlanCustomizer } from "@/components/plan-customizer"

export default function CustomizePlanPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Customize Your Learning Plan</h1>
          <p className="text-lg text-muted-foreground">
            Tailor the perfect educational experience for your students. Select the number of mentors, choose your
            project kits, and we'll handle the rest.
          </p>
        </div>

        <PlanCustomizer />
      </div>
    </main>
  )
}
