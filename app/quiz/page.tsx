'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Failed to fetch questions:', error))
  }, [])

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      router.push(`/result?score=${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)}&total=${questions.length}`)
    }
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Question {currentQuestion + 1}</h1>
      <p className="text-lg">{questions[currentQuestion].question}</p>
      <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
        {questions[currentQuestion].options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleAnswer} disabled={!selectedAnswer} className="w-full">
        {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
      </Button>
    </div>
  )
}