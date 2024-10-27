import { TopQuiz } from '@/lib/action/quiz.action';
import React from 'react'
import QuizCard from '../quiz/Card';

const TopQuizzes = async () => {
    
//   const fetchPromise = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Data fetched successfully!"); // Resolve the promise after 5 seconds
//     }, 5000); // Simulate a 5-second fetch
//   });
//   console.log(fetchPromise);
    const quizzes = await TopQuiz();
    if (!quizzes) return;
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8'>
            {quizzes.map((item: any, index: any) => (
                <QuizCard
                    key={index}
                    title={item.title}
                    desc={item.desc}
                    category={item.category}
                    visibility={item.visibility}
                    ratio={item.takens}
                    attempt={item.takens.length}
                    total={item.total}
                    type={`/${item.userId.username}/${item._id}`}
                    id={item._id}
                />
            ))}
        </div>
    )
}

export default TopQuizzes