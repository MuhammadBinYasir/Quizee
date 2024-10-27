import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center absolute top-0 left-0 z-50'>
        <div className="w-10 h-10 rounded-full border-4 border-primaryColor border-l-transparent animate-spin"></div>
    </div>
  )
}

export default Loading