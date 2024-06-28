import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
     <nav className='bg-black text-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
            <span>
                <Link href= "/">Rubick</Link>
                <Link href="/">Home</Link>
                <Link href="/Markups">Markups</Link>
                <Link href="/createMarkup">Add Markups</Link>
            </span>
        
     </div>
 
     </nav>
     
   

  )
}

export default Navbar