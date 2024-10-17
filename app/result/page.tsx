import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const score = searchParams.score ? Number(searchParams.score) : 0
  const total = searchParams.total ? Number(searchParams.total) : 0

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-bold">Quiz Results</h1>
      <p className="text-2xl">Your score: {score} out of {total}</p>
      <Button asChild className="w-full">
        <Link href="/">Take Another Quiz</Link>
      </Button>
    </div>
  )
}