import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background dark:bg-[#181C14]">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Plan Activities with Ease</h1>
      <p className="text-xl text-center mb-8 text-muted-foreground dark:text-[#697565]">
        Create and share manifests for group activities. Assign tasks, keep everyone informed, and make sure nothing gets forgotten!
      </p>
      <div className="space-x-4">
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}

