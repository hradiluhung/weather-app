import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-10" />
        <p className="font-bold text-blue-500 text-xl">Weather App</p>
      </div>
    </Link>
  )
}
