"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { SendIcon, PlusIcon, XIcon } from "lucide-react"
import { initContract, contract } from "../../../../../contract/contract"
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/hooks/use-toast";


interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}


export default function ContributePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""])
  const [files, setFiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contributionValue, setContributionValue] = useState<number | null>(null)
  const [isCalculateLoading, setIsCalculateLoading] = useState(false)
  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();
  let userInfo: DecodedToken | null = null;
  const { toast } = useToast(); 


  if (authState?.idToken) {
    userInfo = jwtDecode<DecodedToken>(authState.idToken);
  }


  const positionTitle =
    params.id === "1"
      ? "AI Product Manager"
      : params.id === "2"
        ? "Software Engineer"
        : params.id === "3"
          ? "Data Scientist"
          : params.id === "4"
            ? "Product Manager"
            : params.id === "5"
              ? "DevOps Engineer"
              : params.id === "6"
                ? "Mobile Developer"
                : params.id === "7"
                  ? "UX Researcher"
                  : "Selected Position"
  // const positionTitle =
  //   params.id === "1"
  //     ? "Software Engineer"
  //     : params.id === "2"
  //       ? "Data Scientist"
  //       : params.id === "3"
  //         ? "Product Manager"
  //         : params.id === "4"
  //           ? "DevOps Engineer"
  //           : params.id === "5"
  //             ? "Mobile Developer"
  //             : params.id === "6"
  //               ? "UX Researcher"
  //               : "Selected Position"
              

  // general questions for the position
  const questions = [
    "What are the essential technical skills required for this position?",
    "What are common challenges professionals face in this role?",
    "What projects or experiences would best prepare someone for this position?",
    "What tools and technologies are most important to learn?",
    "What advice would you give to someone starting in this field?",
  ]

  const AIQuestions = [
    "How do you determine the optimal pricing strategy for a new AI product in a market where competitors offer similar functionalities but at varying price points?",
    "Can you describe a specific instance where you used AutoML or low-code tools to validate a technical solution before committing to full development? What were the key insights gained?",
    'What metrics do you prioritize in your "Economic Model Dashboard" to ensure real-time monitoring of LTV and token costs aligns with commercial viability?',
    "How do you conduct competitive reverse engineering to identify gaps in competitors' API offerings, and what tools do you rely on for this analysis?",
    "In your experience, what are the most effective methods for validating customer demand before full product development (e.g., Figma prototypes, shadow tests)? How do you measure success in these experiments?",
  ]

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = async () => {
    if (currentQuestion < AIQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate contribution value based on answers
      try {
        setIsCalculateLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsCalculateLoading(false)
        calculateContributionValue()
      } catch (error) {
        setIsCalculateLoading(false)
        calculateContributionValue()
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAddFile = () => {
    setFiles([...files, `Sample-Resource-${files.length + 1}.pdf`])
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const calculateContributionValue = () => {
    // In a real app, this would call an AI service to evaluate the contribution
    const totalLength = answers.reduce((sum, answer) => sum + answer.length, 0)
    const baseValue = 50
    const lengthBonus = Math.floor(totalLength / 100) * 5
    const filesBonus = files.length * 10

    setContributionValue(20)
  }

  useEffect(() => {
    initContract();
  }, []);


  const updateAgentContributors = async (agentId: number, updatedContributors: any[]) => {
    try {
        const tx = await contract.updateAgentContributors(agentId, updatedContributors);
        await tx.wait();
        console.log("Agent contributors updated:", tx);
    } catch (error) {
        console.error("Error updating agent contributors:", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // const updatedContributors = [[userInfo?.eth_address, 2000]];
      // const tx = await contract.updateAgentContributors(1, updatedContributors);
      // await tx.wait();
      // console.log("Agent contributors updated:", tx);
      // toast({
      //   title: "Success",
      //   description: `Updated your contribution on chain. Tx Hash: ${tx.hash}`,
      // });
      router.push("/mentor/dashboard")
    } catch (error) {
      console.error("Error submitting contribution:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contribute to {positionTitle}</CardTitle>
          <CardDescription>Share your professional knowledge to help students prepare for this career</CardDescription>
        </CardHeader>
        <CardContent>
          {contributionValue === null ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Question {currentQuestion + 1} of {AIQuestions.length}
                </h3>
                <Badge variant="outline">
                  {currentQuestion + 1}/{AIQuestions.length}
                </Badge>
              </div>

              <div className="p-4 border rounded-md bg-gray-50">
                <p className="font-medium">{AIQuestions[currentQuestion]}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Your Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Type your answer here..."
                  className="min-h-[200px]"
                  value={answers[currentQuestion]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
              </div>

              {currentQuestion === AIQuestions.length - 1 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Supporting Materials (Optional)</Label>
                    <Button variant="outline" size="sm" onClick={handleAddFile}>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add File
                    </Button>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{file}</span>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  isLoading={isCalculateLoading}
                  disabled={!answers[currentQuestion].trim()}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {currentQuestion === AIQuestions.length - 1 ? "Calculate Value" : "Next"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 border rounded-md bg-teal-50 text-center">
                <h3 className="text-2xl font-bold text-teal-800 mb-2">Contribution</h3>
                {/* <p className="text-4xl font-bold text-teal-600 mb-4">{contributionValue} EDU</p> */}
                <p className="text-4xl font-bold text-teal-600 mb-4">{contributionValue}%</p>
                <p className="text-sm text-teal-700">
                  Your contribution has been assessed based on the quality and depth of your answers.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contribution Summary</h3>

                <div className="space-y-2">
                  <div className="flex justify-between p-2 border-b">
                    <span>Questions Answered</span>
                    <span className="font-medium">{AIQuestions.length}/5</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span>Supporting Materials</span>
                    <span className="font-medium">{files.length} files</span>
                  </div>
                  {/* <div className="flex justify-between p-2 border-b">
                    <span>Detail Level</span>
                    <span className="font-medium">
                      {answers.reduce((sum, answer) => sum + answer.length, 0) > 1000 ? "High" : "Medium"}
                    </span>
                  </div> */}
                  <div className="flex justify-between p-2">
                    <span className="font-medium">Total Value</span>
                    {/* <span className="font-bold text-teal-600">{contributionValue} EDU</span> */}
                    <span className="font-bold text-teal-600">{contributionValue}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {contributionValue !== null && (
          <CardFooter>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Contribution
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
