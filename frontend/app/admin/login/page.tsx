"use client"

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Mail, Shield, ArrowLeft, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminLogin() {
  const [step, setStep] = useState("credentials")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()

  const API_BASE_URL= "https://wellness-center-aiagents-evercode-1.onrender.com"

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, { email });
      alert(response.data.message)
      setOtpSent(true)
      setStep("otp")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:5000/api/admin/verify-otp", { otp })
      alert(response.data.message)
      // Save the token
      if(response.data.token) {
        localStorage.setItem("admin_token", response.data.token)
      }
      router.push("/admin/dashboard")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setLoading(true)
    setError("")
    try {
      // Resend OTP by calling the login API again
      const response = await axios.post("http://localhost:5000/api/admin/login", { email })
      alert("New OTP sent: " + response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Failed to resend OTP")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-purple-400 rounded-full opacity-10 animate-pulse delay-500"></div>

      {/* Back to Home Button */}
      <Link
        href="/en"
        className="absolute top-6 left-6 flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-6 shadow-2xl animate-pulse">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Doctor Admin Panel
          </h1>
          <p className="text-gray-600 text-lg">Wellness Center</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mt-4"></div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span>{step === "credentials" ? "Secure Login" : "Verify Identity"}</span>
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              {step === "credentials"
                ? "Enter your credentials to continue"
                : "Check your email for the verification code"}
            </p>
          </CardHeader>
          <CardContent className="p-8">
            {step === "credentials" ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <span>Doctor Email</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@wellnesscenter.com"
                      className="pl-4 pr-4 py-3 border-2 border-purple-200 focus:border-purple-500 rounded-lg transition-all duration-300 hover:border-purple-300"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50 animate-shake">
                    <AlertDescription className="text-red-600 flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>{error}</span>
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Send OTP</span>
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-600 text-lg">We've sent a 6-digit OTP to</p>
                  <p className="font-bold text-purple-600 text-xl">{email}</p>
                  <p className="text-sm text-gray-500 mt-2">Please check your email and enter the code below</p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="otp"
                    className="text-sm font-semibold text-gray-700 flex items-center justify-center space-x-2"
                  >
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>Verification Code</span>
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="text-center text-3xl font-mono tracking-[0.5em] py-4 border-2 border-purple-200 focus:border-purple-500 rounded-lg transition-all duration-300 hover:border-purple-300"
                    maxLength={6}
                    required
                  />
                  <div className="flex justify-center mt-2">
                    <div className="flex space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-1 rounded-full transition-all duration-300 ${
                            i < otp.length ? "bg-purple-500" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50 animate-shake">
                    <AlertDescription className="text-red-600 flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>{error}</span>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resendOtp}
                    disabled={loading}
                    className="flex-1 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 py-3 font-semibold rounded-lg transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Resend</span>
                      </div>
                    )}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verify</span>
                      </div>
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("credentials")}
                  className="w-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 py-3 rounded-lg transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


