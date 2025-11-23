import { Code, Database, Brain, Network } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FuturePlansSection() {
  const plans = [
    {
      title: "Web Development",
      description: "Master modern web technologies to build scalable applications.",
      icon: Code,
    },
    {
      title: "Data Science",
      description: "Unlock the power of data to drive decision-making and innovation.",
      icon: Database,
    },
    {
      title: "Artificial Intelligence",
      description: "Explore the frontiers of AI and create intelligent systems.",
      icon: Brain,
    },
    {
      title: "Machine Learning",
      description: "Teach computers to learn from data and improve over time.",
      icon: Network,
    },
  ]

  return (
    <section id="future-plans" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Future Horizons</h2>
          <p className="text-lg text-muted-foreground">
            We are constantly expanding our curriculum to cover the most cutting-edge technologies. Here is what's
            coming next to Techshala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <plan.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
