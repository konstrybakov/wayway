import { Auth } from './auth'
import { Navigation } from './navigation'

export const Menu = () => {
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      <Navigation />
      <div className="ml-auto">
        <Auth />
      </div>
    </div>
  )
}
