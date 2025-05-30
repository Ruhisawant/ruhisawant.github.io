import React from 'react'

const MagicButton = ({
    title, icon, position, handleClick, otherClasses
  } : {
    title: string
    icon: React.ReactNode
    position: string
    handleClick?: () => void
    otherClasses?: string
  }) => {
  return (
    <button className='group relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500/50' onClick={handleClick}>
      <span className='absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_25%,#ec4899_50%,#3b82f6_75%,#8b5cf6_100%)] ' />
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}>
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  )
}

export default MagicButton