"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface RoleGuardProps {
  children: React.ReactNode
}

export function RoleGuard({ children }: RoleGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has selected a role
    const userRole = localStorage.getItem("userRole")

    // If no role is selected and we're not on the role selection page,
    // redirect to role selection
    if (!userRole && pathname !== "/role-selection" && pathname !== "/connect-wallet" && pathname !== "/") {
      router.push("/role-selection")
      return
    }

    // If we have a role, check if the user is on the correct path
    if (userRole) {
      const isStudentPath =
        pathname.startsWith("/onboarding/student") ||
        pathname.startsWith("/position-matching") ||
        pathname.startsWith("/payment") ||
        pathname.startsWith("/resume-comparison")

      const isMentorPath = pathname.startsWith("/mentor")

      // If student is on mentor path, redirect to student path
      if (userRole === "student" && isMentorPath) {
        router.push("/onboarding/student")
        return
      }

      // If mentor is on student path, redirect to mentor path
      if (userRole === "mentor" && isStudentPath) {
        router.push("/mentor/dashboard")
        return
      }
    }

    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
