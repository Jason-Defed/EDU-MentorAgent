"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookOpenIcon, UserIcon, ChevronDownIcon } from "lucide-react"

export function RoleSwitcher() {
  const router = useRouter()
  const [currentRole, setCurrentRole] = useState<"student" | "mentor" | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingRole, setPendingRole] = useState<"student" | "mentor" | null>(null)

  useEffect(() => {
    // Get the current role from localStorage
    const storedRole = localStorage.getItem("userRole") as "student" | "mentor" | null
    setCurrentRole(storedRole)
  }, [])

  const handleRoleSwitch = (role: "student" | "mentor") => {
    if (role === currentRole) return

    // In a real app, we would check if there's unsaved progress
    // For demo purposes, we'll just show the confirmation dialog
    setPendingRole(role)
    setShowConfirmDialog(true)
  }

  const confirmRoleSwitch = () => {
    if (!pendingRole) return

    // Save the new role
    localStorage.setItem("userRole", pendingRole)
    setCurrentRole(pendingRole)

    // Redirect to the appropriate starting page
    if (pendingRole === "student") {
      router.push("/onboarding/student")
    } else {
      router.push("/mentor/dashboard")
    }

    // Close the dialog
    setShowConfirmDialog(false)
  }

  if (!currentRole) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {currentRole === "student" ? (
              <>
                <BookOpenIcon className="h-4 w-4 text-teal-600" />
                <span>Student</span>
              </>
            ) : (
              <>
                <UserIcon className="h-4 w-4 text-teal-600" />
                <span>Mentor</span>
              </>
            )}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className={currentRole === "student" ? "bg-gray-100" : ""}
            onClick={() => handleRoleSwitch("student")}
          >
            <BookOpenIcon className="h-4 w-4 mr-2 text-teal-600" />
            <span>Switch to Student</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={currentRole === "mentor" ? "bg-gray-100" : ""}
            onClick={() => handleRoleSwitch("mentor")}
          >
            <UserIcon className="h-4 w-4 mr-2 text-teal-600" />
            <span>Switch to Mentor</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to switch to {pendingRole === "student" ? "Student" : "Mentor"} role? Any unsaved
              progress may be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={confirmRoleSwitch}>
              Switch Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
