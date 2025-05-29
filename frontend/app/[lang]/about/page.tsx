import { getDictionary } from "../dictionaries"
import About from "@/components/about"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen mobile-content">
      <About dict={dict} />

      {/* Additional About Content */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, high-quality healthcare services that improve the health and well-being of our
                  community through compassionate care, advanced medical technology, and continuous innovation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading healthcare provider in the region, recognized for excellence in patient care,
                  medical innovation, and community health improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
