"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Position {
  id: string
  title: string
  country: string
  salaryRange: string
  matchPercentage: number
  difficulty: number
}

interface PositionCardProps {
  position: Position
  isSelected: boolean
  onSelect: () => void
}

export function PositionCard({ position, isSelected, onSelect }: PositionCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${isSelected ? "border-teal-600 ring-1 ring-teal-600" : "hover:border-gray-300"}`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{position.title}</h3>
              <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">{position.matchPercentage}% Match</Badge>
            </div>
            <p className="text-sm text-gray-500">{position.country}</p>
            <p className="text-sm font-medium">{position.salaryRange}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={i < position.difficulty ? "text-yellow-400" : "text-gray-300"}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">Difficulty</span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 ${isSelected ? "text-teal-600" : "text-gray-300"}`}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
