"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export default function CreatePositionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    description: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    difficulty: "",
    skills: [] as string[],
  })
  const [currentSkill, setCurrentSkill] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill.trim()],
      })
      setCurrentSkill("")
    }
  }

  const handleSkillRemove = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/mentor/dashboard")
    } catch (error) {
      console.error("Error creating position:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.industry.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.salaryMin.trim() !== "" &&
      formData.salaryMax.trim() !== "" &&
      formData.difficulty.trim() !== "" &&
      formData.skills.length > 0
    )
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Position</CardTitle>
          <CardDescription>Define a new career position to help students with their career planning</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Position Title</Label>
              <Input
                id="title"
                placeholder="e.g., Software Engineer, Data Scientist"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
                required
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Position Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the responsibilities, day-to-day tasks, and career path"
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                  required
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  required
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Entry Level</SelectItem>
                    <SelectItem value="2">2 - Junior</SelectItem>
                    <SelectItem value="3">3 - Mid-Level</SelectItem>
                    <SelectItem value="4">4 - Senior</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary</Label>
                <Input
                  id="salaryMin"
                  placeholder="e.g., 50000"
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary</Label>
                <Input
                  id="salaryMax"
                  placeholder="e.g., 80000"
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder="Add a required skill"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSkillAdd()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleSkillAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
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
                Creating...
              </>
            ) : (
              "Create Position"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
