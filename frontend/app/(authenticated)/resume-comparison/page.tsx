"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, XCircleIcon, HelpCircleIcon, BookOpenIcon, TestTubeIcon, RocketIcon } from "lucide-react"

// Mock data for skills
const currentSkills = [
  { name: "Dify", level: "Senior", status: "verified" },
  { name: "Zapier", level: "Senior", status: "verified" },
  { name: "Hugging Face", level: "Senior", status: "verified" },
  { name: "SQL", level: "Senior", status: "verified" },
  { name: "Postman", level: "Senior", status: "verified" },
]

const requiredSkills = [
  { name: "Low-code Tools", level: "Provide a demo link created using a low-code tool (like Hugging Face/Dify).", status: "gap" },
  { name: "AI Project", level: "Share a relevant AI project experience (competition/internship).", status: "gap" },
  { name: "Data Analysis", level: "Take the Mentor Agent's SQL skills test.", status: "missing" },
  { name: "Business Analysis", level: "Upload a commercialization analysis of a specific AI application (like HIX/c.ai).", status: "missing" },
  { name: "Prototype Design", level: "Submit the link to your product prototype design (such as Figma).", status: "match" },
  { name: "Learning and Information Management", level: "Complete Mentor Agent's latest industry news and encyclopedia test.", status: "match" },
]


export default function ResumeComparisonPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case "gap":
        return <HelpCircleIcon className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <XCircleIcon className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "match":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Match</Badge>
      case "gap":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Improvement Needed</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Resume Comparison & Enhancement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Current Skills</CardTitle>
              <CardDescription>Skills you currently have on your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-gray-500">{skill.level}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills for AI Product Manager</CardTitle>
              <CardDescription>Compare your current skills with what's required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(skill.status)}
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-gray-500">Required: {skill.level}</p>
                      </div>
                    </div>
                    {getStatusBadge(skill.status)}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Match</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                {/* <TabsTrigger value="confirm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Skill Confirmation</span>
                  <span className="sm:hidden">Confirm</span>
                </TabsTrigger> */}
                <TabsTrigger value="test">
                  <TestTubeIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Skill Testing</span>
                  <span className="sm:hidden">Test</span>
                </TabsTrigger>
                <TabsTrigger value="plan">
                  <RocketIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Development Plan</span>
                  <span className="sm:hidden">Plan</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="confirm" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Skill Confirmation</CardTitle>
                    <CardDescription>Claim skills you already have that aren't on your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Do you have experience with Node.js?</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Node.js is required for the AI Product Manager position at an Intermediate level.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline">Yes, I have this skill</Button>
                          <Button variant="outline">No, I need to learn</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Do you have experience with SQL?</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          SQL is required for the AI Product Manager position at a Beginner level.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline">Yes, I have this skill</Button>
                          <Button variant="outline">No, I need to learn</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="test" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Testing</CardTitle>
                    <CardDescription>Verify your skill levels through AI-driven assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">Data Analysis Assessment</h3>
                          <Badge>20 minutes</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          You need to complete the extraction and analysis of data from a simulated database within a specified timeframe. 
                        </p>
                        <Button>Start Assessment</Button>
                      </div>

                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">RInformation Management  Assessment</h3>
                          <Badge>25 minutes</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                        You  need to answer our questions about recent industry trends within the given time.
                        </p>
                        <Button>Start Assessment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plan" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Plan</CardTitle>
                    <CardDescription>Your personalized roadmap to acquire missing skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">1. Basic Technology Understanding</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Mainstream AI Principles** (NLP/CV/LLM basics) + Low-code tools (1 week)
                        </p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Intro:</p>
                                <p className="text-xs text-gray-500">
                                  Watch "Understand ChatGPT in 1 Hour" video.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Practice:</p>
                                <p className="text-xs text-gray-500">Deploy a text classification demo on Hugging Face Spaces.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">2. Portfolio Project</h3>
                        <p className="text-sm text-gray-500 mb-2">Complete a full AI project (2 weeks)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Topic Selection:</p>
                                <p className="text-xs text-gray-500">
                                  Find a simple dataset on Kaggle (e.g., movie review classification).
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Execution:</p>
                                <p className="text-xs text-gray-500">
                                  Use an AutoML tool (like Google Vertex AI) to train a model and generate a report.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">3. Data Analysis Skills</h3>
                        <p className="text-sm text-gray-500 mb-2">SQL + Basic Data Processing (1-2 weeks)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">SQL:</p>
                                <p className="text-xs text-gray-500">
                                  Practice using "SQLZoo" online exercises.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Python:</p>
                                <p className="text-xs text-gray-500">
                                  Complete the Kaggle micro-course on "Pandas for data processing."
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">4. Commercial Analysis</h3>
                        <p className="text-sm text-gray-500 mb-2">AI product business model analysis (3 days)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Case Study:</p>
                                <p className="text-xs text-gray-500">
                                  Analyze Hix and c.ai's pricing strategies and commercialization plans.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Output:</p>
                                <p className="text-xs text-gray-500">
                                  Create a 1-page PPT with a comparative analysis (using a business model canvas template).
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">5. Prototype Design Experience</h3>
                        <p className="text-sm text-gray-500 mb-2">Product prototype design + Prompt engineering (3 days)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Figma:</p>
                                <p className="text-xs text-gray-500">
                                  Start with "Figma: From Beginner to Expert" video.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Prompt:</p>
                                <p className="text-xs text-gray-500">
                                  Follow OpenAI's official prompt design guide (1 day) and write 10 examples yourself.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">6. Self-driven Learning</h3>
                        <p className="text-sm text-gray-500 mb-2">Establish learning habits (3 hours per week)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Subscribe:</p>
                                <p className="text-xs text-gray-500">
                                  To "The Batch" (AI weekly) and "GeekTime AI Column" (ongoing).
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Course:</p>
                                <p className="text-xs text-gray-500">
                                  Complete "AI For Everyone" on Coursera (Andrew Ng, 6 hours).
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Your Development Plan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
