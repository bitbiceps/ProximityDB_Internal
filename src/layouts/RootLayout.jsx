import React from 'react'
import Header from '../components/common/Header'

const RootLayout = ({children}) => {
  return (
    <>
    <Header/>
    <div className=' bg-blue-50 p-4'>
    {children}
    </div>
    </>
  )
}

export default RootLayout