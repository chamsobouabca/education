import { Level } from '@/app/types/types'
import React from 'react'
import LevelCard from '../Components/LevelCard';
import AddLevel from '../Components/AddLevel';

export default function ManageLevels() {

    const levels : Level[] = [
        {
            name : "1CP",
            modules : ["algo" , "sfsd" , "ang" , "fr"],
        },
        {
            name : "2CP",
            modules : ["algo2" , "Vsfsd" , "anglais4" , "fr2"],
        },
        {
            name : "1CS",
            modules : ["Algebre" , "Analyse" , "OOE" , "OOP"],
        },
        {
            name : "2CS",
            modules : ["crypto" , "Ai" , "Cyber" , "Cloud"],
        },
    ];
  return (
    <div className='p-4'>
        <h1 className='text-4xl font-bold text-primary-500 text-center my-4 mb-8'>Levels Management Page</h1>
        <AddLevel />
        <div className='grid grid-cols-4 gap-4'>
            {
                levels.map((level) => (
                    <LevelCard key={level.name} props={level} />
                ))
            }
        </div>
       
    </div>
  )
}
