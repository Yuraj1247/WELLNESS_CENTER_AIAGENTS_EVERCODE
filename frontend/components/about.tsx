import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Heart } from "lucide-react"

interface AboutProps {
  dict: any
}

export default function About({ dict }: AboutProps) {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: dict.about.stats.patients,
      color: "text-blue-500",
    },
    {
      icon: Award,
      value: "25+",
      label: dict.about.stats.doctors,
      color: "text-green-500",
    },
    {
      icon: Clock,
      value: "20+",
      label: dict.about.stats.experience,
      color: "text-purple-500",
    },
    {
      icon: Heart,
      value: "15+",
      label: dict.about.stats.services,
      color: "text-red-500",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {dict.about.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{dict.about.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                          <IconComponent className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/30 to-transparent"></div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/40 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Heart className="h-24 w-24 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
