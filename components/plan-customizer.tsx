"use client"

import * as React from "react"
import { Minus, Plus, Users, Package, HeartHandshake, Info, School, Loader2, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlanCustomizer() {
  // --- Counters State ---
  const [mentors, setMentors] = React.useState(0)
  const [studentCount, setStudentCount] = React.useState(50)
  const [kit2Project, setKit2Project] = React.useState(0)
  const [kit4Project, setKit4Project] = React.useState(0)
  const [kit6Project, setKit6Project] = React.useState(0)
  
  // --- UI State ---
  const [showEnquiry, setShowEnquiry] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // --- Form Data State ---
  const [contactForm, setContactForm] = React.useState({
    name: "",
    email: ""
  })

  // --- Calculations ---
  const totalKitsSelected = kit2Project + kit4Project + kit6Project
  const recommendedMentors = Math.max(1, Math.round(studentCount / 50))
  // 7 kits per 50 students logic (No decimals)
  const recommendedMinKits = Math.ceil((studentCount / 50) * 7)

  // Helper functions
  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, max?: number, step = 1) => {
    if (max !== undefined && value >= max) return
    setter(value + step)
  }

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, step = 1) => {
    if (value <= 0) return
    setter(value - step)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactForm({
        ...contactForm,
        [e.target.id]: e.target.value
    })
  }

  const handleEnquire = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const planDetails = `
      CUSTOM PLAN DETAILS:
      --------------------
      • Number of Students: ${studentCount}
      • Recommended Kits for this size: ${recommendedMinKits}
      
      SELECTIONS:
      • Expert Mentors: ${mentors}
      • Starter Kits (2 Proj): ${kit2Project}
      • Explorer Kits (4 Proj): ${kit4Project}
      • Innovator Kits (6 Proj): ${kit6Project}
      
      TOTALS:
      • Total Kits/Volunteers: ${totalKitsSelected}
    `

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: `Plan Enquiry: ${studentCount} Students`,
          message: planDetails,
        }),
      })

      if (response.ok) {
        alert("Enquiry Sent Successfully!")
        setShowEnquiry(false)
        setContactForm({ name: "", email: "" })
      } else {
        alert("Failed to send enquiry. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-8">
      {/* Student Count Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Number of Students</h3>
              <p className="text-muted-foreground">Approximate total class size</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-lg">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrement(setStudentCount, studentCount, 10)}
              disabled={studentCount <= 10}
              className="h-10 w-10"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-2xl font-bold w-20 text-center">{studentCount}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => increment(setStudentCount, studentCount, 1000, 10)}
              className="h-10 w-10"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Expert Mentors</h3>
              <p className="text-muted-foreground">Select up to 10 specialized mentors</p>
              
              {/* UPDATED MENTOR TEXT */}
              <div className="flex items-start gap-2 mt-3 text-xs text-blue-700 bg-blue-50 p-3 rounded-md max-w-lg">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  If you wish, you can choose 1 mentor for all the student ranges or select multiple mentors as per the range.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-lg">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrement(setMentors, mentors)}
                disabled={mentors <= 0}
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{mentors}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => increment(setMentors, mentors, 10)}
                disabled={mentors >= 10}
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">
                Recommended: {recommendedMentors} {recommendedMentors === 1 ? "Mentor" : "Mentors"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kits Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Select Your Kits</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-muted-foreground">
               Recommendation for {studentCount} Students:
            </p>
            <p className="text-lg font-bold text-primary">
               At least {recommendedMinKits} Kits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kit Cards */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold mb-2">Starter Kit</h3>
            <p className="text-muted-foreground text-sm mb-6">Includes materials for 2 distinct robotics projects.</p>
            <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
              <Button variant="ghost" size="sm" onClick={() => decrement(setKit2Project, kit2Project)} disabled={kit2Project <= 0}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold">{kit2Project}</span>
              <Button variant="ghost" size="sm" onClick={() => increment(setKit2Project, kit2Project)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg">Popular</div>
            <h3 className="text-lg font-bold mb-2">Explorer Kit</h3>
            <p className="text-muted-foreground text-sm mb-6">Comprehensive set for 4 advanced projects.</p>
            <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
              <Button variant="ghost" size="sm" onClick={() => decrement(setKit4Project, kit4Project)} disabled={kit4Project <= 0}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold">{kit4Project}</span>
              <Button variant="ghost" size="sm" onClick={() => increment(setKit4Project, kit4Project)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold mb-2">Innovator Kit</h3>
            <p className="text-muted-foreground text-sm mb-6">Complete master set for 6 complex projects.</p>
            <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
              <Button variant="ghost" size="sm" onClick={() => decrement(setKit6Project, kit6Project)} disabled={kit6Project <= 0}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold">{kit6Project}</span>
              <Button variant="ghost" size="sm" onClick={() => increment(setKit6Project, kit6Project)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteers & Kits Summary */}
      <div className={`rounded-2xl p-8 border transition-colors ${
          totalKitsSelected < recommendedMinKits 
            ? "bg-amber-50 border-amber-200" 
            : "bg-secondary/30 border-secondary"
        }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <HeartHandshake className={`w-6 h-6 ${totalKitsSelected < recommendedMinKits ? "text-amber-600" : "text-primary"}`} />
              <h3 className="text-xl font-bold">Required Volunteers</h3>
            </div>
            <p className="text-muted-foreground max-w-md">
               We provide one specialized volunteer for every kit selected.
            </p>
            
            <div className={`flex items-start gap-2 text-sm p-3 rounded-md border ${
                totalKitsSelected < recommendedMinKits 
                  ? "bg-amber-100 text-amber-800 border-amber-200" 
                  : "bg-primary/5 text-primary/80 border-primary/10"
              }`}>
              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Recommendation:</strong> For {studentCount} students, we suggest at least 
                <strong> {recommendedMinKits} kits</strong> (Ratio: 7 per 50 students).
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm min-w-[150px]">
            <span className={`text-4xl font-bold ${totalKitsSelected < recommendedMinKits ? "text-amber-600" : "text-primary"}`}>
                {totalKitsSelected}
            </span>
            <span className="text-sm font-medium text-muted-foreground">Volunteers</span>
          </div>
        </div>
      </div>

      {/* Action Area with Bottom Recommendation Text */}
      <div className="flex flex-col items-center pt-6 space-y-6">
        <Button
          size="lg"
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={() => setShowEnquiry(true)}
          disabled={totalKitsSelected === 0 && mentors === 0}
        >
          Enquire Now
        </Button>

        {/* NEW RECOMMENDATION NOTE AT BOTTOM */}
        <p className="text-xs text-center text-muted-foreground max-w-lg px-4 leading-relaxed">
          * These recommendations are just to make your work easier and ensure students understand the concepts effectively for the price paid.
        </p>
      </div>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95">
            <h3 className="text-2xl font-bold mb-4">Complete Your Enquiry</h3>
            
            <div className="bg-muted/50 p-4 rounded-lg mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{studentCount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Kits:</span>
                    <span className={`font-medium ${totalKitsSelected < recommendedMinKits ? "text-amber-600" : "text-primary"}`}>
                        {totalKitsSelected} 
                        {totalKitsSelected < recommendedMinKits && ` (Rec: ${recommendedMinKits})`}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Mentors:</span>
                    <span className="font-medium">{mentors}</span>
                </div>
            </div>
            
            <form onSubmit={handleEnquire} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">School/Organization Name</label>
                <input
                  id="name"
                  required
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Enter name..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Enter email..."
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                    variant="ghost" 
                    type="button" 
                    onClick={() => setShowEnquiry(false)}
                    disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                     <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                     "Send Enquiry"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}