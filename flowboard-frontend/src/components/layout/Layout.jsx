import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  return (
    <div className="flex h-screen bg-page overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-60 h-full fixed left-0 top-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-60 z-50 lg:hidden"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <Navbar onMenuClick={() => setIsMobileOpen(true)} />
        
        <main className="flex-1 overflow-y-auto mt-16 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
