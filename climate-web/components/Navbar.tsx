// components/Navbar.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      router.pathname === path
        ? 'bg-white text-blue-600 font-semibold'
        : 'hover:bg-blue-500 hover:text-white'
    }`

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">
          🌍 Climat Canada
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={linkClass('/')}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/statistiques" className={linkClass('/statistiques')}>
              📊 Statistiques climatiques
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
