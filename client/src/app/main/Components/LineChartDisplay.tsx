"use client"

import {  LineChartDataProps } from '@/app/types/types';
import React from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'

export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-2 bg-gray-900 items-start p-2 rounded-md text-gray-500'>
        <p className='text-lg font-semibold text-center'>{label}</p>
        <p className='text-danger-500 text-medium font-medium'>Students Number : <span className='font-medium'>{payload[0].value}</span></p>
        <p className='text-primary-500 text-medium font-medium'>Teachers Number : <span className='font-medium'>{payload[1].value}</span></p>
      </div>
    )
  }
  return null;
}



export default function LineChartDisplay({props} : LineChartDataProps) {

  return (
    <div className='h-96 w-11/12 mx-auto bg-gray-950 p-4 rounded-md shadow-sm shadow-primary-500 '>
      <ResponsiveContainer >
        
        <LineChart height={200} width={200}  data={props}>
          <XAxis dataKey="time" />
          <YAxis />
          <Legend />
          <Tooltip content={<CustomTooltip />}/>
          <Line type="monotone" dataKey={"studentsNbr"} fill='#9353d3' stroke='#f31260'/>
          <Line type="monotone" dataKey={"teachersNbr"} fill='#9353d3' stroke='#006FEE'/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
