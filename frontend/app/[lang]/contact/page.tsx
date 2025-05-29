import { getDictionary } from "../dictionaries"
import Contact from "@/components/contact"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen mobile-content">
      <Contact dict={dict} />
    </main>
  )
}
