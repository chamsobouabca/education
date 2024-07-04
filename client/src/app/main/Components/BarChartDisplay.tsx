"use client"

import React from 'react'
import { BarChartDataProps, LineChartDataProps } from '@/app/types/types';
import { Legend, Bar , BarChart , ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { CustomTooltip } from './LineChartDisplay';


export default function BarChartDisplay({props} : BarChartDataProps ) {
  return (
    <div className='h-96 w-11/12 mx-auto bg-gray-950 p-4 rounded-md shadow-sm shadow-danger-500 '>
    <ResponsiveContainer >
      
      <BarChart height={200} width={200}  data={props}>
        <XAxis dataKey="level" />
        <YAxis />
        <Legend />
        <Tooltip content={<CustomTooltip />}/>
        <Bar dataKey={"failedStudents"} fill='#f31260' stroke=''/>
        <Bar dataKey={"successfulStudents"} fill='#006FEE' stroke=''/>
      </BarChart>
    </ResponsiveContainer>
  </div>  )
}
