'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='p-5'>
      <h2 className='text-2xl font-bold text-primaryColor'>Something went wrong!</h2>
      <p className='text-sm text-slate-700 mt-1'>{error.message}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='mt-5 px-2 py-1 bg-primaryColor text-xs text-white rounded-full'
      >
        Try again
      </button>
    </div>
  )
}