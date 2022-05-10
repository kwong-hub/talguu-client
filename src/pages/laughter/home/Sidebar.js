import React from 'react'

import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

export const Sidebar = ({
    sidebarOpen,
    toggleSidebar,
    sidebarItems,
    title,
    sidebarColor
}) => {


    return (
        <div className={`p-5 rounded-tr-2xl 
                                    border-2 h-72
                                    rounded-br-2xl relative flex 
                                    flex-col justify-center
                                    items-center bg-${sidebarColor} border-${sidebarColor}`}>

            <h1 className='text-white font-bold'>{title}</h1>
            {
                sidebarItems.map((item, index) => {
                    return (
                        <div key={item.id} className='flex flex-col justify-center items-center p-1'>
                            <span className='text-white'>{item.name}</span>
                        </div>
                    )
                })
            }

            <div className='absolute top-18 -right-2.5' onClick={toggleSidebar}>
                <MdOutlineKeyboardArrowLeft className='w-9 h-9 text-white' />
            </div>
        </div>
    )
}

export default Sidebar