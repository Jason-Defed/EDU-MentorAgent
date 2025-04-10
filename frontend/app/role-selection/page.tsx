"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, UserIcon } from "lucide-react"

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"student" | "mentor" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRoleSelect = (role: "student" | "mentor") => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    if (!selectedRole) return

    setIsSubmitting(true)

    try {
      // In a real app, we would save the role selection to the user's profile
      // For now, we'll just store it in localStorage
      localStorage.setItem("userRole", selectedRole)

      // Redirect to the appropriate starting page based on role
      if (selectedRole === "student") {
        router.push("/onboarding/student")
      } else {
        router.push("/mentor/dashboard")
      }
    } catch (error) {
      console.error("Error saving role selection:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12 mx-auto">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Role</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "student" ? "border-teal-600 ring-1 ring-teal-600" : "hover:border-gray-300"
            }`}
            onClick={() => handleRoleSelect("student")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto rounded-full bg-teal-100 p-4 mb-4">
                <BookOpenIcon className="h-10 w-10 text-teal-600" />
              </div>
              <CardTitle>I am a Student</CardTitle>
              <CardDescription>
                Get personalized career guidance, skill assessments, and development plans
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Discover matching career positions</li>
                <li>• Compare your skills with job requirements</li>
                <li>• Get personalized learning paths</li>
                <li>• Access industry insights from professionals</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant={selectedRole === "student" ? "default" : "outline"}
                className={selectedRole === "student" ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                Continue as Student
              </Button>
            </CardFooter>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "mentor" ? "border-teal-600 ring-1 ring-teal-600" : "hover:border-gray-300"
            }`}
            onClick={() => handleRoleSelect("mentor")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto rounded-full bg-teal-100 p-4 mb-4">
                <UserIcon className="h-10 w-10 text-teal-600" />
              </div>
              <CardTitle>I am a Mentor</CardTitle>
              <CardDescription>
                Share your professional knowledge and earn rewards for your contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Create and contribute to position profiles</li>
                <li>• Share your industry expertise</li>
                <li>• Help students with career guidance</li>
                <li>• Earn EDU tokens for valuable contributions</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant={selectedRole === "mentor" ? "default" : "outline"}
                className={selectedRole === "mentor" ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                Continue as Mentor
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            className="w-full max-w-md bg-teal-600 hover:bg-teal-700"
            onClick={handleContinue}
            disabled={isSubmitting || !selectedRole}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Continue as ${selectedRole === "student" ? "Student" : selectedRole === "mentor" ? "Mentor" : "Selected Role"}`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
