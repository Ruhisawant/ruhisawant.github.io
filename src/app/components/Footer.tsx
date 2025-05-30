import Link from 'next/link'
import { cn } from '@/src/utils/cn'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='relative w-full pt-20 pb-10'>
      <div className='absolute inset-0 -z-20 bg-white dark:bg-bg' />
      
      {/* Grid pattern */}
      <div
        className={cn(
          'absolute inset-0 -z-10',
          'top-1/10',
          '[background-size:70px_70px]',
          '[background-image:linear-gradient(to_right,rgba(228,228,231,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.35)_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,38,38,0.35)_1px,transparent_1px)]',
        )}
      />
      
      <div className='absolute inset-0 -z-9 top-1/10 bg-gradient-to-t from-transparent via-transparent to-white dark:to-bg' />
      
      <div className='absolute inset-0 -z-5 bg-gradient-to-t from-transparent via-white/50 to-white dark:via-bg/50 dark:to-bg [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
      
      {/* Content container */}
      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <div className='flex mt-16 md:flex-row flex-col justify-between items-center gap-6'>
          <p className='md:text-base text-sm md:font-normal font-light text-gray-600 dark:text-gray-400'>
            Copyright © 2025 Ruhi
          </p>
          
          <div className='flex items-center gap-3'>
            <div className='flex gap-3'>
              <div className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200'>
                <Link
                  href='https://github.com/ruhisawant'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                >
                  <FaGithub className='h-5 w-5' />
                </Link>
              </div>
              
              <div className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200'>
                <Link
                  href='https://linkedin.com/in/ruhisawant'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  <FaLinkedin className='h-5 w-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}