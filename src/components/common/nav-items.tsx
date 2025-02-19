import { HomeIcon, SearchIcon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router'

const items: NavItem[] = [
  {
    name: 'Home',
    url: '/',
    Icon: HomeIcon,
  },
  {
    name: 'Search Location',
    url: '/search',
    Icon: SearchIcon,
  },
]

export default function NavItems() {
  const { pathname } = useLocation()

  return (
    <div className="flex items-center gap-8 text-sm">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.url}
          className={`hover:text-blue-500 hover:font-semibold transition-all flex items-center gap-1 ${
            pathname === item.url ? 'text-blue-500 font-semibold' : 'text-foreground'
          }`}
        >
          {item.url === '/search' && <item.Icon className="size-5" />}
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}
