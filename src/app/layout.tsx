import Footer from './components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext'
import { FloatingNavbar } from './components/ui/FloatingNavbar'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Ruhi\'s Portfolio',
  description: 'Welcome to my portfolio! Explore my projects, skills, and connect with.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-white transition-colors dark:bg-bg dark:text-white ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <Link href='/' className='fixed top-4 left-4 z-50'>
            <Image
              src='/logo.png'
              alt='Ruhi&apos;s Logo'
              width={70}
              height={70}
              className='hover:scale-110 transition-transform duration-300'
            />
          </Link>
          
          <FloatingNavbar navItems={[
            {name: 'Home', link: '/', icon: <FaHome />},
            {name: 'About', link: '/about', icon: <FaUser />},
            {name: 'Projects', link: '/projects', icon: <FaProjectDiagram />},
            {name: 'Contact', link: '/contact', icon: <FaEnvelope />}
          ]}/>
          <main className='min-h-screen pt-24'>
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
