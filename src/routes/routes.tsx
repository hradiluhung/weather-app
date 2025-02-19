import Layout from '@/layout/layout'
import HomePage from '@/pages/(home)/page'
import NotFoundPage from '@/pages/not-found/page'
import ProfilePage from '@/pages/profile/page'
import SearchPage from '@/pages/search/page'
import { Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <div className="bg-gradient-to-bl from-blue-500/20 to-white min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}
