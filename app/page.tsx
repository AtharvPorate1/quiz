import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function StartPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Welcome to the Quiz!</h1>
      <form className="space-y-4">
        <Input type="text" placeholder="Enter your name" name="name" required />
        <Button asChild className="w-full">
          <Link href="/quiz">Start Quiz</Link>
        </Button>
      </form>
    </div>
  )
}