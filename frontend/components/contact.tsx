import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface ContactProps {
  dict: any
}

export default function Contact({ dict }: ContactProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {dict.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{dict.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-sm">{dict.contact.address}</p>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">{dict.contact.phone}</p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">{dict.contact.email}</p>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
                  <p className="text-gray-600 text-sm">{dict.contact.hours}</p>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-purple-600 font-medium">Interactive Map</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Replaced Contact Form with Fillout Embed */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <div style="width:100%;height:500px;" data-fillout-id="odUctmh74Wus" data-fillout-embed-type="standard" data-fillout-inherit-parameters data-fillout-dynamic-resize></div>
                    <script src="https://server.fillout.com/embed/v1/"></script>
                  `,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
