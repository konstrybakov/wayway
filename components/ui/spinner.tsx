import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'

type SpinnerProps = {
  size?: number
  color?: string
}

export const Spinner = ({ size = 16, color = 'white' }: SpinnerProps) => {
  return <LoaderIcon className={cn('animate-spin')} size={size} color={color} />
}
