"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function StudentOnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    country: "",
    school: "",
    major: "",
    grade: "",
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
      router.push("/position-matching")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Student Information</CardTitle>
          <CardDescription className="text-center">
            Tell us about yourself to get personalized career recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
                required
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
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
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                placeholder="Enter your school name"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                placeholder="Enter your major"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) => setFormData({ ...formData, grade: value })}
                required
              >
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select your grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">Freshman</SelectItem>
                  <SelectItem value="sophomore">Sophomore</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Interests (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder="Add a skill or interest"
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
                  Add
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
            disabled={isSubmitting || !formData.country || !formData.school || !formData.major || !formData.grade}
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
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
