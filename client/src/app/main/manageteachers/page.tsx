import React from 'react'
import TeachersDataGrid from '../Components/TeachersDataGrid'
import { Teacher } from '@/app/types/types';
import { getAllLevels } from '@/app/api/ApiContext';

export default async function ManageTeachers() {

    const teachers: Teacher[] = [
        {id:"sawlaksw" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"sawlaawsawaksw" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"sawlaawsawsqsaksw" , fullName: "Je", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"sawlaawsawsqssqaksw" , fullName: "oh oe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"sawlaawsawsqsssasaqaksw" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"sawlaawqaksw" , fullName: "Jowsa", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"saqaksw" , fullName: "John Dozazazae", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"qaksw" , fullName: "John azaxsDoe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"aksw" , fullName: "John Dowwcxce", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akw" , fullName: "John Dobvbvbe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasa" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazaz" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùq" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqsqs" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqsqspopo" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqso" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqlllso" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqll,,qslso" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        {id:"akwasazazazùsùqll,,qsytqytslso" , fullName: "John Doe", email: "john@example.com", subject: "Math", level: "High School", state: "active" },
        
    ];

    const levels = await getAllLevels();
    console.log(levels);

  return (
    <div className='p-4'>
        <h1 className='text-4xl font-bold text-primary-500 text-center my-4 mb-8'>Teachers Management Page</h1>
        <section className='w-2/3 mx-auto p-2'>
            <TeachersDataGrid props={teachers}/>
        </section>
    </div>
  )
}
