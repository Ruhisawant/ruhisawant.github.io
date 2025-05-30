'use client'
import Link from 'next/link'
import MagicButton from './ui/MagicButton'
import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'
import { Spotlight } from './ui/Spotlight'
import { FaLocationArrow } from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '@/src/utils/animations'

export default function Hero() {
  return (
    <section className='relative py-28 min-h-screen'>
      {/* Background grid */}
      <div className='absolute inset-0 -z-20 bg-white dark:bg-bg' />
      
      <div
        className={cn(
          'absolute inset-0 -z-10',
          '[background-size:70px_70px]',
          '[background-image:linear-gradient(to_right,rgba(228,228,231,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.35)_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,38,38,0.35)_1px,transparent_1px)]',
        )}
      />
      
      <div className='absolute inset-0 -z-5 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-bg' />

      {/* Spotlight Component */}
      <Spotlight 
        gradientFirst='radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(270, 100%, 96%, 0.10) 0%, hsla(240, 100%, 88%, 0.06) 30%, hsla(220, 100%, 80%, 0.03) 60%, transparent 100%)'
        gradientSecond='radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 95%, 0.08) 0%, hsla(240, 100%, 85%, 0.05) 50%, hsla(220, 100%, 75%, 0.02) 80%, transparent 100%)'
        gradientThird='radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, 0.05) 0%, hsla(270, 100%, 90%, 0.03) 40%, transparent 100%)'
        duration={7}
        xOffset={100}
      />

      {/* Main Content */}
      <motion.div className='container max-w-4xl mx-auto px-6 relative z-10' variants={staggerContainer} initial='initial' animate='animate'>
        <div className='text-center space-y-8'>
          {/* Main Heading */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold leading-tight'>
              <span className='block text-white mb-2'>Hi, I'm</span>
              <span className='block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse'>
                Ruhi Sawant
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className='text-xl md:text-2xl lg:text-3xl text-slate-300 mx-auto leading-relaxed text-slate-400 font-semibold'>
            <span>Full Stack • UI/UX Enthusiast • App Developer</span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className='flex flex-col sm:flex-row justify-center items-center gap-6 pt-8'>
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Link href='/projects'>
                <MagicButton
                  title='View My Work'
                  icon={<FaLocationArrow className='text-sm' />}
                  position='right'
                  otherClasses='hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300'
                />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Link href='/contact'>
                <button className='group relative px-8 py-3 overflow-hidden rounded-xl bg-bg border border-slate-600 hover:border-slate-500 transition-all duration-300'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <span className='relative text-white font-medium group-hover:text-blue-100 transition-colors duration-300'>
                    Get In Touch
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.4 }} className='absolute top-140 left-1/2 transform -translate-x-1/2'>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className='w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center'>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className='w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2'/>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}