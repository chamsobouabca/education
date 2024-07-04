import { AdminData, BarChartData, LineChartData, adminJsonObj } from '@/app/types/types'
import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { VscFileSubmodule } from "react-icons/vsc";
import DataCard from '../Components/DataCard';
import LineChartDisplay from '../Components/LineChartDisplay';
import BarChartDisplay from '../Components/BarChartDisplay';
import { getAllLevels, getStudentsCount, getTasksCount } from '@/app/api/ApiContext';

export default async function AdminDashboard() {

  const studentsNumber = await getAllLevels();
  console.log(studentsNumber);

  const data : adminJsonObj = {
    studentsNbr: 100,
    subjectsNbr:277,
    teachersNbr:212,
  };
  
  const adminData : AdminData [] = [
    {
      icon : FaChalkboardTeacher,
      title: "Total Teachers Number",
      value: data.teachersNbr,
    },
    {
      icon : VscFileSubmodule,
      title: "Total Subjects Number",
      value: data.subjectsNbr,
    },
    {
      icon : PiStudentFill,
      title: "Total Students Number",
      value: data.studentsNbr,
    },
  ];
  const date = new Date();

  const chartData : LineChartData[] = [
    {
      time : new Date().getMonth(),
      studentsNbr : 20,
      teachersNbr : 10,
    },
    {
      time : new Date( date.getDate() + 1 ).getMonth() + 1,
      studentsNbr : 12,
      teachersNbr : 15,
    },
    {
      time : new Date( date.getDate() ).getMonth() + 2,
      studentsNbr : 54,
      teachersNbr : 25,
    },
    {
      time : new Date( date.getDate() - 1 ).getMonth() + 8,
      studentsNbr : 22,
      teachersNbr : 6,
    },
    {
      time : new Date( date.getDate() - 2 ).getMonth() + 1,
      studentsNbr : 27,
      teachersNbr : 17,
    },
  ];

  const chartData2 : BarChartData[] = [
    {
      level : "1CP",
      failedStudents: 20,
      successfulStudents: 120,
    },
    {
      level : "2CP",
      failedStudents: 60,
      successfulStudents: 200,
    },
    {
      level : "1CS",
      failedStudents: 30,
      successfulStudents: 180,
    },
    {
      level : "2CS",
      failedStudents: 10,
      successfulStudents: 100,
    },
  ];

  return (
    <div className='text-black min-h-screen p-6 w-2/3 mx-auto'>
      <h1 className='text-4xl font-bold text-primary-500 text-center my-4 mb-8'>Admin Dashboared</h1>
      <section className='p-4 grid grid-cols-3 gap-4 items-center mb-12'>
        {
          adminData.map((data) => (
            <DataCard key={data.title} props={data}/>
          ))
        }

      </section>
      <section className='mb-8'>
        <LineChartDisplay props={chartData}/>
      </section>
      <section>
        <BarChartDisplay props={chartData2}/>
      </section>
    </div>
  )
}
