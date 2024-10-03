import { Auth } from './menu/auth'
import { Navigation } from './menu/navigation'

export const Menu = () => {
  return (
    <div className="flex items-center justify-between gap-6 p-6">
      <Navigation />

      <Auth />
    </div>
  )
}
