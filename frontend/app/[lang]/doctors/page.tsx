import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Award, GraduationCap, MapPin, Clock } from "lucide-react"

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const doctors = [
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      experience: "15 years",
      education: "MBBS, MD Cardiology, DM Interventional Cardiology",
      rating: 4.9,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Mon-Fri: 9AM-5PM",
      location: "Cardiology Department, 2nd Floor",
      consultationFee: "₹800",
      specializations: ["Heart Surgery", "Angioplasty", "Pacemaker Implantation"],
      achievements: ["Best Cardiologist Award 2023", "500+ Successful Surgeries"],
    },
    {
      name: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      experience: "12 years",
      education: "MBBS, MD Pediatrics, Fellowship in Neonatology",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Mon-Sat: 10AM-6PM",
      location: "Pediatrics Department, 1st Floor",
      consultationFee: "₹600",
      specializations: ["Newborn Care", "Child Development", "Vaccination"],
      achievements: ["Excellence in Pediatric Care", "Child-Friendly Doctor Award"],
    },
    {
      name: "Dr. Anita Patel",
      specialty: "Gynecologist",
      experience: "18 years",
      education: "MBBS, MS Gynecology, Fellowship in Reproductive Medicine",
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Hindi", "Tamil"],
      availability: "Tue-Sat: 11AM-7PM",
      location: "Women's Health Center, 3rd Floor",
      consultationFee: "₹700",
      specializations: ["High-Risk Pregnancy", "Infertility Treatment", "Minimally Invasive Surgery"],
      achievements: ["Women's Health Excellence Award", "1000+ Successful Deliveries"],
    },
    {
      name: "Dr. Suresh Reddy",
      specialty: "Orthopedic Surgeon",
      experience: "20 years",
      education: "MBBS, MS Orthopedics, Fellowship in Joint Replacement",
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Telugu", "Kannada"],
      availability: "Mon-Fri: 8AM-4PM",
      location: "Orthopedics Department, 2nd Floor",
      consultationFee: "₹900",
      specializations: ["Joint Replacement", "Sports Medicine", "Spine Surgery"],
      achievements: ["Best Orthopedic Surgeon 2022", "Advanced Arthroscopy Expert"],
    },
    {
      name: "Dr. Meera Joshi",
      specialty: "Dermatologist",
      experience: "10 years",
      education: "MBBS, MD Dermatology, Fellowship in Cosmetic Dermatology",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Wed-Sun: 12PM-8PM",
      location: "Dermatology Clinic, Ground Floor",
      consultationFee: "₹650",
      specializations: ["Skin Cancer Treatment", "Cosmetic Procedures", "Hair Transplant"],
      achievements: ["Dermatology Excellence Award", "Advanced Laser Treatment Certified"],
    },
    {
      name: "Dr. Vikram Singh",
      specialty: "General Medicine",
      experience: "25 years",
      education: "MBBS, MD Internal Medicine, Fellowship in Critical Care",
      rating: 4.9,
      reviews: 287,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Mon-Sat: 7AM-3PM",
      location: "General Medicine Department, 1st Floor",
      consultationFee: "₹500",
      specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
      achievements: ["Lifetime Achievement Award", "Senior Consultant Recognition"],
    },
  ]

  const departments = [
    { name: "Cardiology", doctors: 4, icon: "❤️" },
    { name: "Pediatrics", doctors: 3, icon: "👶" },
    { name: "Orthopedics", doctors: 5, icon: "🦴" },
    { name: "Gynecology", doctors: 3, icon: "👩‍⚕️" },
    { name: "Dermatology", doctors: 2, icon: "✨" },
    { name: "General Medicine", doctors: 6, icon: "🩺" },
  ]

  return (
    <main className="min-h-screen mobile-content">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {dict.nav.doctors}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Meet our team of experienced and dedicated healthcare professionals committed to providing you with the best
            medical care.
          </p>

          {/* Department Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-lg border border-purple-100">
                <div className="text-2xl mb-2">{dept.icon}</div>
                <div className="text-sm font-semibold text-gray-800">{dept.name}</div>
                <div className="text-xs text-gray-600">{dept.doctors} Doctors</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      {doctor.specialty}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-800">{doctor.rating}</span>
                          <span className="text-gray-600 text-sm">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="text-purple-600 font-bold">{doctor.consultationFee}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{doctor.education}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Experience */}
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600 text-sm">{doctor.experience} experience</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600 text-sm">{doctor.location}</span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600 text-sm">{doctor.availability}</span>
                  </div>

                  {/* Specializations */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specializations.slice(0, 2).map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {doctor.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{doctor.specializations.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Achievements:</p>
                    <ul className="space-y-1">
                      {doctor.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-50 text-sm"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Doctors */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Why Choose Our Doctors
            </h2>
            <p className="text-lg text-gray-600">Excellence in medical care with a personal touch</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Highly Qualified</h3>
              <p className="text-gray-600 text-sm">
                Board-certified specialists with advanced training from premier institutions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Experienced</h3>
              <p className="text-gray-600 text-sm">
                Years of clinical experience with thousands of successful treatments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Patient-Focused</h3>
              <p className="text-gray-600 text-sm">
                Compassionate care tailored to individual patient needs and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Available</h3>
              <p className="text-gray-600 text-sm">
                Flexible scheduling and emergency consultations when you need them most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Meet Our Doctors?</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Book your consultation today and experience world-class healthcare with our expert medical team.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href={`/${lang}/appointments`}>
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment Now
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
