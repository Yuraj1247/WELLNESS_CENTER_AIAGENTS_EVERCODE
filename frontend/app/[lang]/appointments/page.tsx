import { getDictionary } from "../dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Calendar, Users } from "lucide-react"
import Script from "next/script"

export default async function AppointmentsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <Script src="https://server.fillout.com/embed/v1/" />
      <main className="min-h-screen mobile-content bg-gradient-to-br from-purple-50 to-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {dict.appointment?.title || "Book Your Appointment"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {dict.appointment?.subtitle ||
                "Schedule your consultation with our expert doctors. Choose your preferred date, time, and specialist."}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {dict.appointment?.description ||
                "Booking an appointment is easy and convenient. Fill out the form below with your details and preferred appointment time. Our team will confirm your appointment within 24 hours."}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {dict.appointment?.benefits?.title || "Why Book Online?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">24/7 Booking</h3>
                  <p className="text-gray-600 text-sm">
                    {dict.appointment?.benefits?.convenience || "24/7 online booking convenience"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Instant Confirmation</h3>
                  <p className="text-gray-600 text-sm">
                    {dict.appointment?.benefits?.confirmation || "Instant appointment confirmation"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Smart Reminders</h3>
                  <p className="text-gray-600 text-sm">
                    {dict.appointment?.benefits?.reminders || "SMS and email reminders"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Easy Rescheduling</h3>
                  <p className="text-gray-600 text-sm">
                    {dict.appointment?.benefits?.rescheduling || "Easy rescheduling options"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Appointment Process */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {dict.appointment?.process?.title || "Appointment Process"}
              </h2>
              <p className="text-md text-gray-700">!! Book Your Appointment in just 3 steps !!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  step: "1",
                  title: "Select date and time",
                  icon: "📅",
                },
                 {
                  step: "2",
                  title: "Enter your details",
                  icon: "📝",
                },
                {
                  step: "3",
                  title: "Receive confirmation Email and Call",
                  icon: "✅",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Form */}
        <section className="py-4 bg-gradient-to-br from-purple-50 to-white">
          <div className="container px-4 mx-auto">
            <Card className="max-w-6xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Book Your Appointment
                </CardTitle>
                <p className="text-gray-600 mt-2">Fill out the form below to schedule your consultation</p>
              </CardHeader>
              <CardContent>
                {/* Fillout Form Embed */}
                <div
                  style={{ width: "100%", height: "600px" }}
                  data-fillout-id="4at4j4YpTqus"
                  data-fillout-embed-type="standard"
                  data-fillout-inherit-parameters
                  data-fillout-dynamic-resize
                  className="rounded-lg overflow-hidden shadow-inner"
                ></div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-red-50">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Need Immediate Medical Attention?</h2>
              <p className="text-gray-600 mb-6">
                For medical emergencies, don't wait for an appointment. Contact our emergency services immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  📞 Call Emergency: +91 98765 43210
                </a>
                <a
                  href="tel:108"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🚑 Call Ambulance: 108
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
