import React from 'react'
import { Frown } from 'lucide-react';

const QuizError = ({ error }: { error: string; }) => {
    return (
        <div className="min-h-28 flex items-center justify-center gap-5">
            <Frown className='text-lg text-slate-900'/>
            <p className="text-slate-900 text-sm">{error}</p>
        </div>
    )
}

export default QuizError