import { Button } from '@/components/ui/button'
import { LanguagesIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type SearchFormSubmitButtonProps = {
  disabled: boolean
}

export const SearchFormSubmitButton = ({
  disabled,
}: SearchFormSubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      className="flex gap-2"
      loading={pending}
      disabled={disabled || pending}
    >
      <LanguagesIcon size={16} />
      <span>Translate</span>
    </Button>
  )
}
