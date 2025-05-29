'use client'
import React, { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const {theme, toggleTheme} = useTheme()
  const [ismobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!ismobileMenuOpen)
  }

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className='fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors'>
      <div className='container max-w-7xl mx-auto px-4'>
        {/* Desktop View */}
        <div className='flex items-center justify-between h-16'>
          {/* Desktop Menu */}
          <Link href='/' className='text-xl font-bold text-primary'>Devfolio&trade;</Link>
          <div className='hidden md:flex items-center space-x-8'>
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} className={`hover:text-primary transition-colors font-medium ${isActive ? 'text-primary' : ''}`}>{item.name}</Link>
              )
            })}
            <button onClick={toggleTheme} className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white hover:text-primary transition-colors cursor-pointer'>
              {theme === 'dark' ? (
                <SunIcon className='w-5 h-5'/>
              ) : (
                <MoonIcon className='w-5 h-5'/>
              )}
            </button>
          </div>
       

          {/* Mobile Menu */}
          <button className='md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer' onClick={toggleMobileMenu}>
            {ismobileMenuOpen ? (<XMarkIcon className='w-6 h-6'/>) : (<Bars3Icon className='w-6 h-6'/>)}
          </button>
        </div>

        {/* Mobile View */}
        {ismobileMenuOpen && (
          <div className='md:hidden'>
            <div className='py-4 space-y-4'>
              {menuItems.map((item, index) => (
                <div key={index} onClick={toggleMobileMenu}>
                  <Link href={item.href} className='block py-2 hover:text-primary transition-colors'>{item.name}</Link>
                </div>
              ))}
              <div className=''>
                <button onClick={toggleTheme} className='flex items-center py-2 hover:text-primary transition-colors cursor-pointer'>
                  {theme === 'dark' ? (
                    <><SunIcon className='w-5 h-5 mr-2'/>Light Mode</>
                  ) : (
                    <><MoonIcon className='w-5 h-5 mr-2'/>Dark Mode</>
                  )}
                </button>
              </div>
            </div> 
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar