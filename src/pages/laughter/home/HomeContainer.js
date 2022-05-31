
import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { useHistory } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Navbar } from './Navbar'

export const HomeContainer = ({
    statusData,
    title,
    sidebarItems,
    sidebarColor,
    borderColor,
    updateDataStatus
}) => {


    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [arrowIcon, setArrowIcon] = useState(true)
    const history = useHistory()
    const [statusCalled, setStatusCalled] = useState(false)


     useEffect(() => {
        setStatusCalled(updateDataStatus)
    }, [updateDataStatus])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
        if (sidebarOpen) {
            setArrowIcon(true)
        } else {
            setArrowIcon(false)
        }
    }

    const gotoDetail = () => {
        history.push("/login")
    }


    return (
        <div className={`p-2 relative ml-1 mr-1
                     overflow-hidden home_container_style`}>

            {/* <div className='absolute w-full top-1 px-2 z-10'>
                <Navbar />
            </div> */}

            <div className='absolute left-0 top-0 w-full h-full'>
                <div className='relative flex justify-center h-full' onClick={gotoDetail}>
                    <img
                        onClick={gotoDetail}
                        className='block w-full h-full'
                        src='https://savageuniversal.com/wp-content/uploads/2014/08/young-woman-laughing.jpg'
                        alt='' />
                </div>

            </div>


            <div className='relative mt-2 flex flex-col justify-center items-end h-full'>
                {/* loop will come here */}
                {
                    statusData.map((data, index) => {
                        return (
                            <div className='p-2 flex justify-center items-center' key={index}>
                                <span>{data.icon}</span>
                                <p className='pl-2 text-white'>{data.value}</p>
                            </div>
                        )
                    })
                }

            </div>

            {
                sidebarOpen ? (
                    <div className='absolute top-16 left-0 w-48'>
                        <Sidebar
                            sidebarOpen={sidebarOpen}
                            toggleSidebar={toggleSidebar}
                            sidebarItems={sidebarItems}
                            title={title}
                            sidebarColor="purple-700"
                        />
                    </div>
                ) : (

                    <div className={`absolute h-72 top-16 -left-5 w-9 px-2 rounded-tr-3xl rounded-br-3xl bg-${sidebarColor}`}>
                        <button className="text-white cursor-pointer text-xl
                                leading-none border h-full border-solid border-transparent 
                                bg-transparent block outline-none focus:outline-none"
                            type="button"
                            onClick={toggleSidebar}
                        >
                            {
                                arrowIcon && (
                                    <span>
                                        <MdOutlineKeyboardArrowRight className='w-9 h-9 text-white' />
                                    </span>
                                )
                            }
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default HomeContainer