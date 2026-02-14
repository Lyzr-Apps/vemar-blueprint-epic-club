'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiHome, FiUsers, FiSend, FiBarChart2, FiMenu, FiX, FiDollarSign, FiShield, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi'
import { useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: FiHome,
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: FiUsers,
      description: 'Manage client requests',
    },
    {
      name: 'Submit Request',
      href: '/submit-request',
      icon: FiSend,
      description: 'Create new request',
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: FiBarChart2,
      description: 'View performance metrics',
    },
    {
      name: 'Deepfake Detection',
      href: '/deepfake-detection',
      icon: FiAlertTriangle,
      description: 'BFSI fraud prevention',
    },
    {
      name: 'Pricing',
      href: '/pricing',
      icon: FiDollarSign,
      description: 'View pricing plans',
    },
    {
      name: 'API Security',
      href: '/api-security',
      icon: FiShield,
      description: 'Manage API keys',
    },
    {
      name: 'Investor Pitch',
      href: '/investor-pitch',
      icon: FiTrendingUp,
      description: 'India market opportunity',
    },
  ]

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <Image
                  src="/vemar-logo.png"
                  alt="VEMAR AI Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VEMAR.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6 text-slate-400" />
            ) : (
              <FiMenu className="w-6 h-6 text-slate-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-slate-500">{item.description}</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
