import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Apple, Dumbbell, Brain, Shield, Sun, Droplets, Moon } from "lucide-react"

export default async function HealthTipsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const healthTips = [
    {
      icon: Apple,
      title: "Balanced Nutrition",
      description:
        "Eat a variety of colorful fruits and vegetables daily. Include whole grains, lean proteins, and healthy fats in your diet.",
      tips: [
        "Eat 5-7 servings of fruits and vegetables daily",
        "Choose whole grains over refined grains",
        "Include lean proteins like fish, chicken, and legumes",
        "Stay hydrated with 8-10 glasses of water daily",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Dumbbell,
      title: "Regular Exercise",
      description:
        "Aim for at least 150 minutes of moderate-intensity exercise per week to maintain good health and fitness.",
      tips: [
        "30 minutes of moderate exercise 5 days a week",
        "Include both cardio and strength training",
        "Take stairs instead of elevators",
        "Walk or bike for short distances",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Take care of your mental health through stress management, adequate sleep, and social connections.",
      tips: [
        "Practice meditation or deep breathing",
        "Maintain social connections with family and friends",
        "Engage in hobbies you enjoy",
        "Seek professional help when needed",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep each night to support physical and mental health recovery.",
      tips: [
        "Maintain a consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Avoid screens 1 hour before bed",
        "Keep your bedroom cool and dark",
      ],
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Regular health checkups and screenings can help detect and prevent health issues early.",
      tips: [
        "Schedule annual health checkups",
        "Stay up to date with vaccinations",
        "Get recommended health screenings",
        "Monitor your blood pressure and cholesterol",
      ],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Droplets,
      title: "Hydration",
      description: "Proper hydration is essential for all bodily functions and maintaining optimal health.",
      tips: [
        "Drink water throughout the day",
        "Monitor urine color for hydration status",
        "Increase intake during exercise or hot weather",
        "Limit sugary and caffeinated beverages",
      ],
      color: "from-cyan-500 to-cyan-600",
    },
  ]

  const seasonalTips = [
    {
      season: "Summer",
      icon: Sun,
      tips: [
        "Stay hydrated with extra water intake",
        "Wear sunscreen with SPF 30 or higher",
        "Avoid outdoor activities during peak sun hours",
        "Eat light, fresh foods like fruits and salads",
      ],
    },
    {
      season: "Winter",
      icon: Moon,
      tips: [
        "Boost immunity with vitamin C rich foods",
        "Maintain indoor humidity levels",
        "Exercise indoors to stay active",
        "Get adequate sunlight for vitamin D",
      ],
    },
  ]

  return (
    <main className="min-h-screen mobile-content">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {dict.healthTips.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{dict.healthTips.subtitle}</p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {dict.healthTips.featured.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {dict.healthTips.featured.nutrition.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{dict.healthTips.featured.nutrition.excerpt}</p>
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                  {dict.common.readMore}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {dict.healthTips.featured.exercise.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{dict.healthTips.featured.exercise.excerpt}</p>
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                  {dict.common.readMore}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {dict.healthTips.featured.mental.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{dict.healthTips.featured.mental.excerpt}</p>
                <Button variant="outline" className="w-full border-purple-500 text-purple-600 hover:bg-purple-50">
                  {dict.common.readMore}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Health Tips Grid */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Essential Health Tips
            </h2>
            <p className="text-lg text-gray-600">Simple daily practices for a healthier lifestyle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTips.map((tip, index) => {
              const IconComponent = tip.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${tip.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{tip.description}</p>
                    <ul className="space-y-2">
                      {tip.tips.map((tipItem, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {tipItem}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Health Tips */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Seasonal Health Tips
            </h2>
            <p className="text-lg text-gray-600">Stay healthy throughout the year with season-specific advice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasonalTips.map((season, index) => {
              const IconComponent = season.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">{season.season} Health Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {season.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Personalized Health Advice?</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Our expert doctors are here to provide personalized health guidance tailored to your specific needs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href={`/${lang}/appointments`}>
              <Heart className="h-5 w-5 mr-2" />
              Book Consultation
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
