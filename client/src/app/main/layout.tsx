import React from 'react'
import Header from './Components/Header'

export default function layout({children} : {children : React.ReactNode}) {
  return (
    <>
        <Header />
        {children}
    </>
  )
}
