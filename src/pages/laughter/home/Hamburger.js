import React from 'react'
import { FaFacebook, FaInstagram, FaRetweet } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const Hamburger = () => {


    const hamburgerItems = [
        {
            id: 1,
            name: 'Face book',
            link: '/test-player',
            icon: <FaFacebook className='w-4 h-4 text-black' />
        },

        {
            id: 2,
            name: 'Tweeter',
            link: 'https://www.tweeter.com',
            icon: <FaRetweet className='w-4 h-4 text-black' />
        },

        {
            id: 3,
            name: 'Instagram',
            link: 'https://www.instagram.com',
            icon: <FaInstagram className='w-4 h-4 text-black' />
        },
    ]

    return (
        <div className='px-2 bg-white absolute w-40 top-7 right-0 shadow-3xl 
                justify-center items-center z-10 menu_class'>
            {
                hamburgerItems.map((hamburger, index) => {
                    return (
                        <NavLink
                            to={`${hamburger.link}`}
                            key={hamburger.id}
                            className='flex items-center py-1 justify-start'
                        >
                            {hamburger.icon}
                            <p className='text-sm text-black pl-3'>{hamburger.name}</p>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
export default Hamburger