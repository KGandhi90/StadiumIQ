import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home      from './pages/Home';
import Navigate  from './pages/Navigate';
import Chat      from './pages/Chat';
import Dashboard from './pages/Dashboard';
import FanZone   from './pages/FanZone';

// Dashboard has its own layout — no shared Navbar
function FanLayout({ children }) {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Fan-facing pages — shared Navbar */}
          <Route path="/" element={
            <FanLayout><Home /></FanLayout>
          } />
          <Route path="/navigate" element={
            <FanLayout><Navigate /></FanLayout>
          } />
          <Route path="/chat" element={
            <FanLayout><Chat /></FanLayout>
          } />
          <Route path="/fanzone" element={
            <FanLayout><FanZone /></FanLayout>
          } />

          {/* Ops Dashboard — own dark layout, no Navbar */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
