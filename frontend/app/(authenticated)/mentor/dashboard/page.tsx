"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, BriefcaseIcon, CoinsIcon, UsersIcon } from "lucide-react"


// data for mentor dashboard
const contributedPositions = [
  {
    id: "1",
    title: "AI Product Manager",
    contributions: 1,
    earnings: 0.1,
    lastUpdated: "1 days ago",
  },
  {
    id: "2",
    title: "Software Engineer",
    contributions: 12,
    earnings: 450,
    lastUpdated: "2 days ago",
  },
  {
    id: "3",
    title: "Data Scientist",
    contributions: 8,
    earnings: 320,
    lastUpdated: "1 week ago",
  },
  {
    id: "4",
    title: "Product Manager",
    contributions: 5,
    earnings: 200,
    lastUpdated: "3 weeks ago",
  },
]

const opportunityPositions = [
  {
    id: "1",
    title: "AI Product Manager",
    demand: "High",
    estimatedEarnings: "80-120 EDU",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    demand: "High",
    estimatedEarnings: "80-120 EDU",
  },
  {
    id: "6",
    title: "Mobile Developer",
    demand: "Medium",
    estimatedEarnings: "60-100 EDU",
  },
  {
    id: "7",
    title: "UX Researcher",
    demand: "Medium",
    estimatedEarnings: "50-90 EDU",
  },
]

export default function MentorDashboardPage() {
  const [activeTab, setActiveTab] = useState("opportunities")

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
          <p className="text-gray-500">Manage your contributions and earnings</p>
        </div>
        <Link href="/mentor/create-position">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New Position
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-teal-100 p-3">
                <BriefcaseIcon className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Positions</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-teal-100 p-3">
                <CoinsIcon className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">970.1 EDU</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-teal-100 p-3">
                <UsersIcon className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Students Helped</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="positions">My Positions</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-6">
          {contributedPositions.map((position) => (
            <Card key={position.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{position.title}</h3>
                    <p className="text-sm text-gray-500">Last updated {position.lastUpdated}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{position.contributions} Contributions</Badge>
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                        {position.earnings} EDU Earned
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start md:self-center">
                    <Link href={`/mentor/contribute/${position.id}`}>
                      <Button className="bg-teal-600 hover:bg-teal-700">Contribute More</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          {opportunityPositions.map((position) => (
            <Card key={position.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{position.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">Demand: {position.demand}</Badge>
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                        Est. {position.estimatedEarnings}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start md:self-center">
                    <Link href={`/mentor/contribute/${position.id}`}>
                      <Button className="bg-teal-600 hover:bg-teal-700">Contribute</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
