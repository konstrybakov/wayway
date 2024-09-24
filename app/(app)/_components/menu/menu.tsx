import { Auth } from './auth/auth'
import { Navigation } from './navigation'

export const Menu = () => {
  return (
    <div className="flex items-center justify-between gap-6 p-6">
      <Navigation />

      <Auth />
    </div>
  )
}
