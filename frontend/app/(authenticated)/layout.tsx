import type React from "react"
import { Header } from "@/components/header"
import { RoleGuard } from "@/components/role-guard"

interface Props {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: Props) {
  return (
    <RoleGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </RoleGuard>
  )
}
