import { cn } from '@/lib/utils/cn'
import { LoaderIcon } from 'lucide-react'

interface SpinnerProps {
  size?: number
  color?: string
}

export const Spinner = ({ size = 16, color = 'white' }: SpinnerProps) => {
  return <LoaderIcon className={cn('animate-spin')} size={size} color={color} />
}
