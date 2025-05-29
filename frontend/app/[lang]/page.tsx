import { getDictionary } from "./dictionaries"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      <Hero dict={dict} />
      <Services dict={dict} />
      <About dict={dict} />
      <Testimonials dict={dict} />
      <Contact dict={dict} />
    </main>
  )
}
