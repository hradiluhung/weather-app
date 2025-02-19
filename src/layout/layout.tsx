import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="px-4 py-2 md:px-8 lg:px-32 pt-16">
        <div className="py-16">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
