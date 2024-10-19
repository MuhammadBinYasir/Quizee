import Link from 'next/link'
import React from 'react'
import { FaQuestion } from 'react-icons/fa'

const Logo = ({ href }: {
    href: string;
}) => {
    return (
        <Link href={href} className="text-lg font-bold text-sky-800 flex items-center gap-2">
            <div className="w-8 h-8 text-base flex items-center justify-center bg-sky-800 rounded-full text-white">
                <FaQuestion />
            </div>
            Quizee
        </Link>
    )
}

export default Logo