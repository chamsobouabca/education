import React from 'react'
import SendTask from '../Components/SendTask'
import { Task } from '@/app/types/types'
import TaskCard from '../Components/TaskCard';

export default function Tasks() {

  const tasks : Task[] = [
    {
      senderId: "sjasw",
      receiverId: "swaksjwkajsw",
      text: "swamawsllllllllllllllllllllllllllllllllllkawskajwwwwwwwwwwwwwwww",
      title: "yeah",
    },
    {
      senderId: "sjasw",
      receiverId: "swaksjwkajsw",
      text: "swamawsllllllllllllllllllllllllllllllllllkawskajwwwwwwwwwwwwwwww",
      title: "yeah",
    },
    {
      senderId: "sjasw",
      receiverId: "swaksjwkajsw",
      text: "swamawsllllllllllllllllllllllllllllllllllkawskajwwwwwwwwwwwwwwww",
      title: "yeah",
    },
  ];
  return (
    <div className='p-4'>
        <h1 className='text-4xl font-bold text-primary-500 text-center my-4 mb-8'>Tasks</h1>
        <div>
          <h2 className='text-2xl font-semibold text-secondary-500 text-start my-4'>Tasks Sent</h2>
          <section className='grid grid-cols-4 gap-4'>
            {
              tasks.map((task) => <TaskCard props={task}/>)
            }
          </section>
          <h2 className='text-2xl font-semibold text-secondary-500 text-start my-4'>Send a Task</h2>
          <section className='w-10/12 mx-auto'>
            <SendTask />
          </section>
        </div>
    </div>
  )
}