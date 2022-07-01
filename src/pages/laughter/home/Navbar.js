import React, { useState } from 'react'

import { HiOutlineMenu } from 'react-icons/hi'

import { Hamburger } from './Hamburger'

import talguuLogo from '../../../assets/images/talguu_logo.png'

export const Navbar = () => {


    const [navbarOpen, setNavbarOpen] = useState(false);


    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen)
        console.log("navbarOpen: ", navbarOpen)
    }


    return (
        <div className='flex w-full h-full justify-between z-10 '>
            <div className='flex items-start -ml-2 w-2/3'>
                <img src={talguuLogo} className="w-20 h-7" alt="logo" />
            </div>

            <div className='flex w-1/3 flex-col items-end relative'>
                <div className='absolute right-0 bottom-0 flex flex-col items-end'>
                    <button className="text-white cursor-pointer text-xl 
                        leading-none -px-3 border border-solid border-transparent 
                        rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={toggleNavbar}
                    >
                        <span><HiOutlineMenu className='text-white w-6 h-6' /> </span>
                    </button>
                    {
                        navbarOpen ? <Hamburger /> : null
                    }
                </div>
            </div>
        </div>
    )
}
export default Navbar