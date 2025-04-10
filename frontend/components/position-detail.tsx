import { Badge } from "@/components/ui/badge"

interface Position {
  id: string
  title: string
  country: string
  salaryRange: string
  matchPercentage: number
  difficulty: number
  description: string
  skills: string[]
  outlook: string
}

interface PositionDetailProps {
  position: Position
}

export function PositionDetail({ position }: PositionDetailProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold">{position.title}</h3>
        <p className="text-sm text-gray-500">
          {position.country} • {position.salaryRange}
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm text-gray-700">{position.description}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {position.skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-1">Industry Outlook</h4>
        <p className="text-sm text-gray-700">{position.outlook}</p>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Match Quality</span>
          <span className="text-sm font-medium text-teal-600">{position.matchPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${position.matchPercentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}
