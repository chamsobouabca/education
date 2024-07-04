import React from 'react'
import LoginForm from '../Components/LoginForm'
import Link from 'next/link'

export default function login() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center p-4 gap-4'>
      <h1 className='text-4xl font-bold text-center my-4'>Login</h1>
      <LoginForm />
      <p>you dont have an account ? <Link href="/register" className='text-primary-500'>register</Link></p>
    </div>
  )
}
