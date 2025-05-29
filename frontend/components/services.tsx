import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Bone, Baby, Sparkles, Users } from "lucide-react"

interface ServicesProps {
  dict: any
}

const serviceIcons = [
  { icon: Heart, color: "text-red-500" },
  { icon: Heart, color: "text-blue-500" },
  { icon: Bone, color: "text-green-500" },
  { icon: Baby, color: "text-pink-500" },
  { icon: Sparkles, color: "text-yellow-500" },
  { icon: Users, color: "text-purple-500" },
]

export default function Services({ dict }: ServicesProps) {
  const services = [
    dict.services.general,
    dict.services.cardiology,
    dict.services.orthopedics,
    dict.services.pediatrics,
    dict.services.dermatology,
    dict.services.gynecology,
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {dict.services.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{dict.services.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[index].icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-8 w-8 ${serviceIcons[index].color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300"
                  >
                    {dict.common.learnMore}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {dict.common.viewAll}
          </Button>
        </div>
      </div>
    </section>
  )
}
