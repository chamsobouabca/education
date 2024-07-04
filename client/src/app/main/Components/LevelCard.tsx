import { Level } from '@/app/types/types'
import { Button } from '@nextui-org/react';
import React from 'react'
import LevelCardActions from './LevelCardActions';


export default function LevelCard({props} : {props : Level}) {
  
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return (
    <div className={`bg-gray-950 rounded-md p-4 shadow-sm ${randomNumber % 2 === 0 ? "shadow-secondary-500" : (randomNumber % 3 === 0 ? "shadow-primary-500" : "shadow-danger-500" )}`}>
      <h2 className='text-secondary-500 text-center font-semibold text-2xl'>{props.name}</h2>
      <section className='flex flex-col gap-3 mb-6'>
        {
          props.modules.map((module) => (
            <p key={module} className='text-gray-300 font-medium text-lg'>{module}</p>
          ))
        }
      </section>
      <LevelCardActions />
    </div>
  )
}
