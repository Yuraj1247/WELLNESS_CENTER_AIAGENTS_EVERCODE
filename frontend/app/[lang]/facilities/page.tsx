import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Bed, Car, Wifi, Coffee, Shield, Clock, Users } from "lucide-react"

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const facilities = [
    {
      title: "Intensive Care Unit (ICU)",
      description: "State-of-the-art ICU with 24/7 monitoring and life support systems",
      icon: Bed,
      features: ["24/7 Monitoring", "Advanced Life Support", "Ventilator Support", "Cardiac Monitoring"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "20 Beds",
    },
    {
      title: "Modern Operation Theaters",
      description: "Fully equipped operation theaters with latest surgical equipment",
      icon: Building,
      features: ["Laminar Air Flow", "Advanced Anesthesia", "Surgical Robots", "HD Imaging"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "8 Theaters",
    },
    {
      title: "Emergency Department",
      description: "24/7 emergency services with trauma care and ambulance facility",
      icon: Car,
      features: ["24/7 Emergency Care", "Trauma Center", "Ambulance Service", "Emergency Surgery"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "24/7 Service",
    },
    {
      title: "Diagnostic Center",
      description: "Complete diagnostic services with advanced imaging and laboratory",
      icon: Shield,
      features: ["MRI & CT Scan", "Digital X-Ray", "Ultrasound", "Laboratory Services"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "Full Service",
    },
    {
      title: "Pharmacy",
      description: "In-house pharmacy with all essential medicines and medical supplies",
      icon: Coffee,
      features: ["24/7 Pharmacy", "Medicine Delivery", "Insurance Claims", "Generic Medicines"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "24/7 Open",
    },
    {
      title: "Patient Amenities",
      description: "Comfortable facilities for patients and their families",
      icon: Wifi,
      features: ["Free WiFi", "Cafeteria", "Parking", "Waiting Lounges"],
      image: "/placeholder.svg?height=300&width=400",
      capacity: "All Floors",
    },
  ]

  const hospitalStats = [
    { number: "200+", label: "Hospital Beds", icon: Bed },
    { number: "8", label: "Operation Theaters", icon: Building },
    { number: "24/7", label: "Emergency Service", icon: Clock },
    { number: "500+", label: "Staff Members", icon: Users },
  ]

  const certifications = [
    { name: "NABH Accredited", description: "National Accreditation Board for Hospitals" },
    { name: "ISO 9001:2015", description: "Quality Management System Certified" },
    { name: "NABL Certified Lab", description: "National Accreditation Board for Testing" },
    { name: "Green Building", description: "Environmentally Sustainable Infrastructure" },
  ]

  return (
    <main className="min-h-screen mobile-content">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
           {dict?.facilities?.title || 'Facilities'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{dict.facilities.subtitle}</p>
        </div>
      </section>

      {/* Hospital Stats */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {hospitalStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 text-center hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Our World-Class Facilities
            </h2>
            <p className="text-lg text-gray-600">Advanced medical infrastructure designed for optimal patient care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        {facility.capacity}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-800">{facility.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{facility.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                      {facility.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Certifications & Accreditations
            </h2>
            <p className="text-lg text-gray-600">Recognized for excellence in healthcare standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 text-center hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Our Facilities</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities or schedule a visit to see them in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              🎥 Virtual Tour
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              📍 Schedule Visit
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
