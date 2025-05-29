
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  LogOut,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  Heart,
  TrendingUp,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  User,
  Activity,
  Menu,
  X,
} from "lucide-react"

interface Patient {
  id: string
  guardianName: string
  patientName: string
  patientAge: number
  phoneNumber: string
  emailAddress: string
  address: string
  formSubmittedDateTime: string
  appointmentDateTime: string
  submissionId: string
  checkupStatus: boolean
  vapiCallRecording?: string
}

export default function AdminDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    lifetimeTotal: 0, // Total patients across all dates
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Fetch data from SheetDB
    fetchData()
  }, [router])

  // Fetch data from SheetDB
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://sheetdb.io/api/v1/glv7avllo8qsj", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log("SheetDB Response:", data)

      // Map SheetDB data to Patient interface
      const mappedPatients: Patient[] = data.map((row: any, index: number) => {
        const appointmentDateTimeRaw = row["Appointment Date & Time"]
        let appointmentDateTime: string
        try {
          appointmentDateTime = new Date(appointmentDateTimeRaw).toISOString()
        } catch {
          console.warn(`Invalid date format for Appointment Date & Time: ${appointmentDateTimeRaw}`)
          appointmentDateTime = new Date().toISOString()
        }

        return {
          id: index.toString(),
          guardianName: row["Guardian Name"] || "Unknown Guardian",
          patientName: row["Patient Name"] || "Unknown Patient",
          patientAge: parseInt(row["Patient Age"]) || 0,
          phoneNumber: row["Phone number"] || "N/A",
          emailAddress: row["Email"] || "N/A",
          address: row["Address"] || "N/A",
          formSubmittedDateTime: row["Submission Time"] || new Date().toISOString(),
          vapiCallRecording: undefined,
          appointmentDateTime,
          submissionId: row["Submission ID"] || `WK${index + 1}`,
          checkupStatus: row["Checkup Status"]?.toLowerCase() === "true" || false,
        }
      })

      setPatients(mappedPatients)
      localStorage.setItem("admin_patients", JSON.stringify(mappedPatients))
    } catch (error) {
      console.error("Error fetching data from SheetDB:", error)
      alert("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filter patients based on date and search
  useEffect(() => {
    let filtered = patients.filter((patient) => {
      const appointmentDate = new Date(patient.appointmentDateTime).toISOString().split("T")[0]
      return appointmentDate === selectedDate
    })

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phoneNumber.includes(searchTerm) ||
          patient.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredPatients(filtered)

    // Update stats
    setStats({
      total: filtered.length,
      completed: filtered.filter((p) => p.checkupStatus).length,
      pending: filtered.filter((p) => !p.checkupStatus).length,
      lifetimeTotal: patients.length, // Total patients across all dates
    })
  }, [patients, selectedDate, searchTerm])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_patients")
    router.push("/admin/login")
    setIsMenuOpen(false)
  }

  const toggleCheckupStatus = (patientId: string) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === patientId) {
        const updatedPatient = { ...patient, checkupStatus: !patient.checkupStatus }

        // confirm checkup alert
        if (updatedPatient.checkupStatus) {
          checkstatus(updatedPatient)
        }

        return updatedPatient
      }
      return patient
    })

    setPatients(updatedPatients)
    localStorage.setItem("admin_patients", JSON.stringify(updatedPatients))

    // Update SheetDB
    updateSheetDB(updatedPatients)
  }

  const updateSheetDB = async (updatedPatients: Patient[]) => {
    try {
      const data = updatedPatients.map((patient) => ({
        "Submission ID": patient.submissionId,
        "Submission Time": patient.formSubmittedDateTime,
        "Guardian Name": patient.guardianName,
        "Email": patient.emailAddress,
        "Phone number": patient.phoneNumber,
        "Patient Name": patient.patientName,
        "Patient Age": patient.patientAge,
        "Address": patient.address,
        "Appointment Date & Time": patient.appointmentDateTime,
        "Checkup Status": patient.checkupStatus.toString(),
      }))

      await fetch("https://sheetdb.io/api/v1/glv7avllo8qsj", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Error updating SheetDB:", error)
    }
  }

  const checkstatus = (patient: Patient) => {
    alert(`Checkup Status Updated✅ `)
  }

  const formatDateTime = (dateTime: string) => {
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) {
        return "Invalid Date"
      }
      return date.toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Invalid Date"
    }
  }

  const refreshData = () => {
    fetchData()
    setIsMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <header className="bg-white shadow-lg border-b-2 border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Doctor Dashboard
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <span>Wellness Center Admin Panel</span>
                  <div className="w-2 hidden sm:block h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm hidden sm:block font-medium">Online</span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {/* Desktop Buttons */}
              <div className="hidden sm:flex items-center space-x-3">
                <Button onClick={refreshData} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
                <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              {/* Mobile Hamburger Menu */}
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-purple-600 hover:bg-purple-50"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="sm:hidden mt-4 bg-white border-t-2 border-purple-100 shadow-lg rounded-lg p-4">
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={refreshData}
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 justify-start"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Calendar className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.lifetimeTotal}</div>
              <div className="text-blue-100 text-sm font-medium">Lifetime Patients</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.completed}</div>
              <div className="text-green-100 text-sm font-medium">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <XCircle className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.pending}</div>
              <div className="text-orange-100 text-sm font-medium">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.total}</div>
              <div className="text-purple-100 text-sm font-medium">Total Patients</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-xl bg-white mb-8 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by patient name, guardian, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 border-2 border-purple-200 focus:border-purple-500 rounded-lg text-lg"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-500 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                expandedCard === patient.id ? "ring-4 ring-purple-500 ring-opacity-50" : ""
              } ${
                patient.checkupStatus
                  ? "bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500"
                  : "bg-gradient-to-br from-white to-purple-50 border-l-4 border-l-orange-500"
              }`}
              onClick={() => setExpandedCard(expandedCard === patient.id ? null : patient.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 mb-1">{patient.patientName}</CardTitle>
                     <p className="text-sm text-gray-600">Patient Age: {patient.patientAge} years</p>
                      <p className="text-sm text-gray-600">Guardian Name : {patient.guardianName}</p>   
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge
                      variant={patient.checkupStatus ? "default" : "secondary"}
                      className={`${
                        patient.checkupStatus ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                      } text-white font-semibold px-3 py-1`}
                    >
                      {patient.checkupStatus ? "✓ Completed" : "⏳ Pending"}
                    </Badge>
                   
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                   <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Submission ID: {patient.submissionId}
                    </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">
                      {patient.appointmentDateTime ? formatDateTime(patient.appointmentDateTime) : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span>{patient.phoneNumber || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span>{patient.emailAddress || "N/A"}</span>
                  </div>
                </div>
                {expandedCard === patient.id && (
                  <div className="mt-6 pt-4 border-t-2 border-purple-100 space-y-4 animate-slideDown">
                    <div className="flex items-start space-x-3 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                      <MapPin className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{patient.address || "N/A"}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-gray-400">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Form Submitted:</p>
                      <p className="text-sm text-gray-700">
                        {patient.formSubmittedDateTime ? formatDateTime(patient.formSubmittedDateTime) : "N/A"}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between  bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
                      <div>
                        <p className="text-sm font-bold text-gray-800">Checkup Status</p>
                        <p className="text-xs text-gray-600">
                          {patient.checkupStatus
                            ? "✅ Checkup completed successfully"
                            : "⏳ Mark as completed when done"}
                        </p>
                      </div>
                      <Switch
                        checked={patient.checkupStatus}
                        onCheckedChange={() => toggleCheckupStatus(patient.id)}
                        className="data-[state=checked]:bg-green-500 scale-125"
                      />
                    </div>
                  </div>
                )}
                <div className="flex space-x-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:${patient.phoneNumber}`)
                    }}
                    disabled={!patient.phoneNumber || patient.phoneNumber === "N/A"}
                  >
                    <Phone className="h-3 w-3 mr-2" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`mailto:${patient.emailAddress}`)
                    }}
                    disabled={!patient.emailAddress || patient.emailAddress === "N/A"}
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-16 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Appointments Found</h3>
              <p className="text-gray-600 text-lg mb-6">
                No appointments found for {new Date(selectedDate).toLocaleDateString()}. Try selecting a different date
                or check your search terms.
              </p>
              <Button
                onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Today's Appointments
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
