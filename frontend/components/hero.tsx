import { Button } from "@/components/ui/button"
import { Phone, Calendar, MapPin, Star, Users, Award } from "lucide-react"

interface HeroProps {
  dict: any
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-15 animate-pulse delay-700"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-200 rounded-full opacity-10 animate-pulse delay-300"></div>

      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span>
                {dict.hero?.stats?.patients || "50,000+"} {dict.hero?.stats?.patientsLabel || "Happy Patients"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-green-500" />
              <span>NABH Accredited</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
            {dict.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {dict.hero.subtitle}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">
                {dict.hero?.stats?.patients || "50,000+"}
              </div>
              <div className="text-sm text-gray-600">{dict.hero?.stats?.patientsLabel || "Happy Patients"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{dict.hero?.stats?.doctors || "25+"}</div>
              <div className="text-sm text-gray-600">{dict.hero?.stats?.doctorsLabel || "Expert Doctors"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{dict.hero?.stats?.years || "20+"}</div>
              <div className="text-sm text-gray-600">{dict.hero?.stats?.yearsLabel || "Years Experience"}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Open Since 1980
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <MapPin className="h-5 w-5 mr-2" />
             Mumbai Maharshtra
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              Multi-Language Support
            </Button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full animate-pulse">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-medium">24/7 Emergency</p>
                <p className="text-lg font-bold text-red-600">{dict.hero.emergency.split(": ")[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image/Illustration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl opacity-10">
        <div className="w-full h-64 bg-gradient-to-t from-purple-200 to-transparent rounded-t-full"></div>
      </div>
    </section>
  )
}
