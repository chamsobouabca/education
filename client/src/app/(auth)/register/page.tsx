import React from 'react'
import Link from 'next/link'
import RegisterForm from '../Components/RegisterForm'

export default function Register() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center p-4 gap-4'>
      <h1 className='text-4xl font-bold text-center my-4 text-primary-500'>Register</h1>
      <RegisterForm />
      <p>Dont have an account? <Link href="/login" className='text-primary-500'>Login</Link></p>
    </div>
  )
}