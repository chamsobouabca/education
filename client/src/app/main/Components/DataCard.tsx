import { AdminDataProps } from '@/app/types/types'
import React from 'react'

export default function DataCard({props} : AdminDataProps) {


  return (
    <div className='data-card bg-gray-950 p-4 grid grid-rows-2 items-start shadow-md shadow-secondary-500 rounded-md h-32 text-white'>
      <section>
        <props.icon className='text-primary-500 size-8'/>
      </section>
      <section className='flex flex-row justify-between items-center'>
        <p className='font-semibold text-lg'>{props.title}</p>
        <p className='text-secondary-500 text-lg'>{props.value}</p>
      </section>
    </div>
  )
}
