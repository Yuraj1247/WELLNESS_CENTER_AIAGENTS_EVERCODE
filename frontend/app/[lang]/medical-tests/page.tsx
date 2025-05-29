import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TestTube, Heart, Eye, Microscope, Zap, Camera } from "lucide-react"

export default async function MedicalTestsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const testCategories = [
    {
      title: dict.medicalTests.categories.laboratory,
      icon: TestTube,
      color: "from-blue-500 to-blue-600",
      tests: [
        { name: "Complete Blood Count (CBC)", price: "₹500", time: "2 hours" },
        { name: "Lipid Profile", price: "₹800", time: "12 hours fasting" },
        { name: "Liver Function Test", price: "₹600", time: "4 hours" },
        { name: "Kidney Function Test", price: "₹700", time: "4 hours" },
        { name: "Thyroid Profile", price: "₹900", time: "6 hours" },
        { name: "Diabetes Panel", price: "₹650", time: "8 hours fasting" },
      ],
    },
    {
      title: dict.medicalTests.categories.imaging,
      icon: Camera,
      color: "from-green-500 to-green-600",
      tests: [
        { name: "X-Ray", price: "₹300", time: "30 minutes" },
        { name: "Ultrasound", price: "₹1,200", time: "45 minutes" },
        { name: "CT Scan", price: "₹3,500", time: "1 hour" },
        { name: "MRI Scan", price: "₹8,000", time: "1.5 hours" },
        { name: "Mammography", price: "₹2,000", time: "30 minutes" },
        { name: "Bone Density Scan", price: "₹1,800", time: "45 minutes" },
      ],
    },
    {
      title: dict.medicalTests.categories.cardiac,
      icon: Heart,
      color: "from-red-500 to-red-600",
      tests: [
        { name: "ECG", price: "₹200", time: "15 minutes" },
        { name: "Echocardiogram", price: "₹2,500", time: "45 minutes" },
        { name: "Stress Test", price: "₹3,000", time: "2 hours" },
        { name: "Holter Monitor", price: "₹4,000", time: "24 hours" },
        { name: "Cardiac Catheterization", price: "₹15,000", time: "3 hours" },
        { name: "Coronary Angiography", price: "₹12,000", time: "2 hours" },
      ],
    },
    {
      title: dict.medicalTests.categories.specialized,
      icon: Microscope,
      color: "from-purple-500 to-purple-600",
      tests: [
        { name: "Biopsy", price: "₹5,000", time: "1 week" },
        { name: "Endoscopy", price: "₹4,500", time: "2 hours" },
        { name: "Colonoscopy", price: "₹6,000", time: "3 hours" },
        { name: "Pulmonary Function Test", price: "₹1,500", time: "1 hour" },
        { name: "Allergy Testing", price: "₹3,500", time: "2 hours" },
        { name: "Genetic Testing", price: "₹8,500", time: "2 weeks" },
      ],
    },
  ]

  const healthPackages = [
    {
      name: "Basic Health Checkup",
      price: "₹2,999",
      originalPrice: "₹4,500",
      tests: ["CBC", "Lipid Profile", "Blood Sugar", "Urine Analysis", "ECG"],
      popular: false,
    },
    {
      name: "Comprehensive Health Package",
      price: "₹5,999",
      originalPrice: "₹8,500",
      tests: ["All Basic Tests", "Liver Function", "Kidney Function", "Thyroid", "Chest X-Ray", "Ultrasound"],
      popular: true,
    },
    {
      name: "Executive Health Package",
      price: "₹12,999",
      originalPrice: "₹18,000",
      tests: ["All Comprehensive Tests", "CT Scan", "Echo", "Stress Test", "Cancer Markers", "Vitamin Profile"],
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen mobile-content">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {dict.medicalTests.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{dict.medicalTests.subtitle}</p>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="text-center pb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.tests.map((test, testIndex) => (
                        <div
                          key={testIndex}
                          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{test.name}</h4>
                            <p className="text-sm text-gray-600">Result time: {test.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600 text-lg">{test.price}</p>
                            <Button
                              size="sm"
                              className="mt-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                            >
                              Book Now
                            </Button>
                          </div>
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

      {/* Health Packages */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Health Packages
            </h2>
            <p className="text-lg text-gray-600">Comprehensive health checkup packages at discounted prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  pkg.popular ? "ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-white" : "bg-white"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {pkg.popular && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white mb-4 mx-auto">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-purple-600">{pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">
                    Save{" "}
                    {Math.round(
                      (1 -
                        Number.parseInt(pkg.price.replace("₹", "").replace(",", "")) /
                          Number.parseInt(pkg.originalPrice.replace("₹", "").replace(",", ""))) *
                        100,
                    )}
                    %
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.tests.map((test, testIndex) => (
                      <li key={testIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        {test}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                        : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                    } shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Book Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Why Choose Our Diagnostic Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Fast Results</h3>
              <p className="text-gray-600 text-sm">Quick turnaround time for all test results</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Accurate Reports</h3>
              <p className="text-gray-600 text-sm">Precise and reliable diagnostic reports</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Advanced Equipment</h3>
              <p className="text-gray-600 text-sm">State-of-the-art diagnostic technology</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600 text-sm">Experienced technicians and pathologists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Book Your Medical Tests Today</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Early detection saves lives. Schedule your health checkup and stay ahead of potential health issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={`/${lang}/appointments`}>
                <TestTube className="h-5 w-5 mr-2" />
                Book Tests Online
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <a href="tel:+919876543210">📞 Call for Home Collection</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
