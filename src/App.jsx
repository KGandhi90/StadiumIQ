import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FanLayout } from './FanLayout'
import { Home } from './pages/Home'
import { Navigate } from './pages/Navigate'
import { Chat } from './pages/Chat'
import { FanZone } from './pages/FanZone'
import { Dashboard } from './pages/Dashboard'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fan pages — shared layout with Navbar */}
        <Route element={<FanLayout />}>
          <Route index element={<Home />} />
          <Route path="navigate" element={<Navigate />} />
          <Route path="chat" element={<Chat />} />
          <Route path="fanzone" element={<FanZone />} />
        </Route>

        {/* Ops dashboard — standalone dark layout */}
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
