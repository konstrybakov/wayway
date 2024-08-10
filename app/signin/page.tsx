import { Button } from '@/components/ui/button'
import { ChromeIcon, Github } from 'lucide-react'

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-background">
      <div className="max-w-md w-full grid grid-cols-2 gap-6 p-6 rounded-lg shadow-lg bg-card items-center">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to WayWay
          </h1>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <ChromeIcon className="w-5 h-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
