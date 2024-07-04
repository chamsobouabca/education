import { TaskProps } from '@/app/types/types'
import React from 'react'

export default function TaskCard({props} : TaskProps) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const receiver = "sas"
  return (
    <div className={`bg-gray-950 h-56 p-4 rounded-sm shadow-sm ${randomNumber % 2 === 0 ? "shadow-secondary-500" : (randomNumber % 3 === 0 ? "shadow-primary-500" : "shadow-danger-500" )}`}>
        <h2 className='text-secondary-500 text-center font-semibold text-2xl'>{props.title}</h2>
        <p className='text-primary-500 text-center font-medium text-xl'>{receiver}</p>
        <p className='text-gray-200 opacity-90 font-normal text-medium h-full w-full overflow-hidden text-ellipsis'>
        {
            props.text
        }
        </p>
    </div>
  )
}
