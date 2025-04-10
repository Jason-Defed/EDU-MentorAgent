"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PositionCard } from "@/components/position-card"
import { PositionDetail } from "@/components/position-detail"

// Mock data for positions
const dataPositions = [
  {
    id: "1",
    title: "AI Product Manager",
    country: "United States",
    salaryRange: "$90,000 - $120,000",
    matchPercentage: 95,
    difficulty: 4,
    description:
      "AI PMs bridge technology and business, transforming AI capabilities into market-ready products. They: Identify high-value AI use cases\n\n Validate solutions using low-code tools (AutoML/Dify)\n\n Design monetization strategies (API/SaaS/enterprise solutions)\n\n Drive cross-functional execution (engineering, data, GTM)",
    skills: ["Dify", "Zapier", "Hugging Face", "SQL", "Postman"],
    outlook:
      "📈 High Demand – 40%+ growth in AI PM roles (2024)\n\n💰 Premium Compensation – 30-50% salary premium vs traditional PM\n\n🚀 Career Paths:\n\nVertical: Senior AI PM → AI Product Lead → VP AI Products\n\nLateral: AI strategy consulting/VC\n\nThe most valuable AI PMs speak both Python and Profit & Loss.",
  },
  {
    id: "2",
    title: "Software Engineer",
    country: "United States",
    salaryRange: "$90,000 - $120,000",
    matchPercentage: 95,
    difficulty: 4,
    description:
      "Software engineers design, develop, and maintain software systems. They work with programming languages, frameworks, and tools to create applications that solve specific problems or provide services.",
    skills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
    outlook:
      "The demand for software engineers continues to grow across industries as digital transformation accelerates. Job security is high with numerous advancement opportunities.",
  },
  {
    id: "3",
    title: "Data Scientist",
    country: "United States",
    salaryRange: "$95,000 - $130,000",
    matchPercentage: 87,
    difficulty: 5,
    description:
      "Data scientists analyze and interpret complex data to help organizations make better decisions. They use statistical methods, machine learning, and data visualization techniques.",
    skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    outlook:
      "Data science roles are projected to grow significantly as companies increasingly rely on data-driven decision making. Specialized knowledge in specific domains can increase marketability.",
  },
  {
    id: "4",
    title: "UX/UI Designer",
    country: "Canada",
    salaryRange: "$75,000 - $100,000",
    matchPercentage: 82,
    difficulty: 3,
    description:
      "UX/UI designers create user-friendly interfaces for digital products. They conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs.",
    skills: ["Figma", "User Research", "Wireframing", "Visual Design", "Prototyping"],
    outlook:
      "As companies focus more on user experience, demand for UX/UI designers continues to grow. Remote work opportunities are abundant in this field.",
  },
  {
    id: "5",
    title: "Product Manager",
    country: "United Kingdom",
    salaryRange: "£60,000 - £85,000",
    matchPercentage: 78,
    difficulty: 4,
    description:
      "Product managers oversee the development and launch of products. They define product vision, gather requirements, and work with cross-functional teams to deliver successful products.",
    skills: ["Product Strategy", "Market Research", "Agile Methodologies", "Stakeholder Management", "Analytics"],
    outlook:
      "Product management roles are in high demand as companies seek to improve their product development processes. Experience in specific industries can be valuable.",
  },
  {
    id: "6",
    title: "Blockchain Developer",
    country: "Singapore",
    salaryRange: "S$90,000 - S$140,000",
    matchPercentage: 75,
    difficulty: 5,
    description:
      "Blockchain developers create and implement blockchain-based solutions. They work with distributed ledger technologies, smart contracts, and decentralized applications.",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "Cryptography", "JavaScript"],
    outlook:
      "While subject to market fluctuations, blockchain development skills remain valuable in fintech, supply chain, and other industries adopting blockchain technology.",
  },
]

export default function PositionMatchingPage() {
  const router = useRouter()
  const [positions, setPositions] = useState(dataPositions)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    country: "all",
    salary: [0, 150000],
    difficulty: "all",
  })

  // Simulate loading positions
  useEffect(() => {
    const timer = setTimeout(() => {
      setPositions(dataPositions)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSelectPosition = (id: string) => {
    setSelectedPosition(id)
  }

  const handleContinue = () => {
    if (selectedPosition) {
      router.push(`/payment?position=${selectedPosition}`)
    }
  }

  const selectedPositionData = positions.find((p) => p.id === selectedPosition)

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Position Matching</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-medium">Filters</h2>

              <div className="space-y-2">
                <Label htmlFor="country-filter">Country</Label>
                <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                  <SelectTrigger id="country-filter">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Slider
                  defaultValue={[0, 150000]}
                  max={150000}
                  step={10000}
                  onValueChange={(value) => setFilters({ ...filters, salary: value })}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>$150,000+</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty-filter">Difficulty</Label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) => setFilters({ ...filters, difficulty: value })}
                >
                  <SelectTrigger id="difficulty-filter">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="1-2">Easy (1-2)</SelectItem>
                    <SelectItem value="3-4">Medium (3-4)</SelectItem>
                    <SelectItem value="5">Hard (5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {selectedPositionData && (
            <Card>
              <CardContent className="p-4">
                <PositionDetail position={selectedPositionData} />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleContinue}>
                  Select This Position
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="match">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="match">Best Match</TabsTrigger>
              <TabsTrigger value="salary">Highest Salary</TabsTrigger>
            </TabsList>
            <TabsContent value="match" className="space-y-4">
              {positions
                .sort((a, b) => b.matchPercentage - a.matchPercentage)
                .map((position) => (
                  <PositionCard
                    key={position.id}
                    position={position}
                    isSelected={selectedPosition === position.id}
                    onSelect={() => handleSelectPosition(position.id)}
                  />
                ))}
            </TabsContent>
            <TabsContent value="salary" className="space-y-4">
              {positions
                .sort((a, b) => {
                  const aMax = Number.parseInt(a.salaryRange.split(" - ")[1].replace(/[^0-9]/g, ""))
                  const bMax = Number.parseInt(b.salaryRange.split(" - ")[1].replace(/[^0-9]/g, ""))
                  return bMax - aMax
                })
                .map((position) => (
                  <PositionCard
                    key={position.id}
                    position={position}
                    isSelected={selectedPosition === position.id}
                    onSelect={() => handleSelectPosition(position.id)}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
