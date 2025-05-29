'use client'

import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaGraduationCap } from 'react-icons/fa'
import { fadeInUp, fadeInDown, fadeIn, staggerContainer, cardHover } from '@/src/utils/animations'

export default function About() {
  return (
    <div className='container max-w-7xl mx-auto py-12'>
      <motion.h1 
        className='text-4xl font-bold mb-8 text-center'
        {...fadeInDown}
      >
        About Me
      </motion.h1>
      
      {/* Bio Section */}
      <motion.section 
        className='mb-16'
        {...fadeInUp}
      >
        <p className='text-lg text-secondary max-w-3xl mx-auto text-center'>
          I&apos;m a passionate Full Stack Developer with expertise in building modern web applications.
          With a strong foundation in both frontend and backend technologies, I create seamless
          user experiences and robust server-side solutions.
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className='mb-16'
        {...fadeIn}
        transition={{ delay: 0.2 }}
      >
        <motion.h2 
          className='section-title'
          {...fadeInUp}
        >
          Skills
        </motion.h2>
        <motion.div 
          className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          <motion.div 
            className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'
            variants={fadeInUp}
            {...cardHover}
          >
            <FaCode className='h-8 w-8 text-primary mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Frontend</h3>
            <ul className='text-secondary space-y-2'>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'
            variants={fadeInUp}
            {...cardHover}
          >
            <FaLaptopCode className='h-8 w-8 text-primary mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Backend</h3>
            <ul className='text-secondary space-y-2'>
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'
            variants={fadeInUp}
            {...cardHover}
          >
            <FaGraduationCap className='h-8 w-8 text-primary mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Tools & Others</h3>
            <ul className='text-secondary space-y-2'>
              <li>Git / GitHub</li>
              <li>Docker</li>
              <li>AWS</li>
              <li>CI/CD</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}