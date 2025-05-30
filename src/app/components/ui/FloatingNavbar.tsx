'use client'
import React, { JSX, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/utils/cn'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'

export const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const currentScrollY = current * (document.documentElement.scrollHeight - window.innerHeight)

      if (currentScrollY < 50) {
        setVisible(true)
      } else {
        if (currentScrollY < lastScrollY) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }

      setLastScrollY(currentScrollY)
    }
  })

  const isActive = (link: string) => {
    if (link === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(link)
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className={cn(
          'flex max-w-fit fixed top-6 right-6 border border-transparent rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-md z-[5000] px-3 py-2 items-center justify-center space-x-6 border-white/[0.2] bg-[var(--color-bg)]/80 backdrop-blur-sm',
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const active = isActive(navItem.link)
          return (
            <a
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                'relative items-center flex space-x-2 transition-all duration-300 hover:scale-105 group px-3 py-2 rounded-full',
                active
                  ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'text-[var(--color-light)] hover:text-[var(--color-primary)] hover:bg-[var(--color-dark)]/50'
              )}
            >
              <span
                className={cn(
                  'transition-all duration-300',
                  active ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'
                )}
              >
                {navItem.icon}
              </span>
              <span
                className={cn(
                  'text-base font-medium transition-all duration-300',
                  'hidden sm:block',
                  active && 'font-semibold'
                )}
              >
                {navItem.name}
              </span>
              {active && (
                <motion.div
                  className='absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5'
                  layoutId='activeTab'
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6
                  }}
                />
              )}
            </a>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}