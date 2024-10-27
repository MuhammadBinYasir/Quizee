import React from 'react'

const LoadBar = () => {
    return (
        <div className='w-full h-full flex items-center justify-center z-50'>
            <div className="w-10 h-10 rounded-full border-4 border-primaryColor border-l-transparent animate-spin"></div>
        </div>
    )
}

export default LoadBar