"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, Phone, Globe, Heart, Calendar, Stethoscope, Users, TestTube, Building, Shield } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
]

interface NavbarProps {
  dict: any
  lang: string
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleLanguageChange = (newLang: string) => {
    const currentPath = pathname.split("/").slice(2).join("/")
    window.location.href = `/${newLang}/${currentPath}`
  }

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home, icon: Heart },
    { href: `/${lang}/about`, label: dict.nav.about, icon: Users },
    { href: `/${lang}/services`, label: dict.nav.services, icon: Stethoscope },
    { href: `/${lang}/doctors`, label: dict.nav.doctors, icon: Users },
    { href: `/${lang}/facilities`, label: dict.nav.facilities, icon: Building },
    { href: `/${lang}/medical-tests`, label: dict.nav.medicalTests, icon: TestTube },
    { href: `/${lang}/health-tips`, label: dict.nav.healthTips, icon: Heart },
    { href: `/${lang}/contact`, label: dict.nav.contact, icon: Phone },
  ]

  const mobileNavItems = [
    { href: `/${lang}`, label: dict.nav.home, icon: Heart },
    { href: `/${lang}/services`, label: dict.nav.services, icon: Stethoscope },
    { href: `/${lang}/doctors`, label: dict.nav.doctors, icon: Users },
    { href: `/${lang}/appointments`, label: dict.nav.appointments, icon: Calendar },
    { href: `/${lang}/contact`, label: dict.nav.contact, icon: Phone },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Wellness Center
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-purple-600 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px] border-purple-200 focus:border-purple-500">
                <Globe className="h-4 w-4 mr-2 text-purple-600" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button asChild variant="ghost" className="text-gray-600 hover:text-purple-600 hover:bg-purple-50">
              <Link href="/admin/login">
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/${lang}/appointments`}>
                <Calendar className="h-4 w-4 mr-2" />
                {dict.nav.appointments}
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Navbar */}
      <nav className="lg:hidden sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Wellness
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[60px] h-8 border-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-purple-50">
                  <Menu className="h-6 w-6 text-purple-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gradient-to-br from-white to-purple-50">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-3 shadow-lg">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      Wellness Center
                    </h2>
                  </div>

                  {navItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}

                  <Link
                    href="/admin/login"
                    className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin Login</span>
                  </Link>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 mt-6 shadow-lg"
                  >
                    <Link href={`/${lang}/appointments`} onClick={() => setIsOpen(false)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      {dict.nav.appointments}
                    </Link>
                  </Button>

                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <Button asChild variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                      <Link href={`tel:+919876543210`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {dict.nav.emergency}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-purple-200 shadow-2xl mobile-nav">
        <div className="grid grid-cols-5 h-16">
          {mobileNavItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-all duration-300 ${
                  isActive ? "text-purple-600 bg-purple-50" : "text-gray-600 hover:text-purple-600 hover:bg-purple-25"
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <span className="truncate text-[10px]">{item.label}</span>
                {isActive && <div className="w-4 h-0.5 bg-purple-600 rounded-full"></div>}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
