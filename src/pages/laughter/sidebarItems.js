import { FaEye, FaThumbsUp } from "react-icons/fa"
import { IoIosShareAlt } from "react-icons/io"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"

export const sidebarItems = [
    {
        id: 1,
        name: 'Sitcom'
    },
    {
        id: 2,
        name: 'Love'
    },
    {
        id: 3,
        name: 'Miss You'
    },
    {
        id: 4,
        name: 'Care'
    },
    {
        id: 5,
        name: 'Life'
    }
]

export const statusData = [
    {
        id: 1,
        value: '1.1 M',
        icon: <FaEye className='w-3 h-3 text-white' />
    },
    {
        id: 2,
        value: '2.5 M',
        icon: <FaThumbsUp className='w-3 h-3 text-white' />
    },
    {
        id: 3,
        value: '8500',
        icon: <IoChatbubbleEllipsesSharp className='w-3 h-3 text-white' />
    },
    {
        id: 4,
        value: '12.5 K',
        icon: <IoIosShareAlt className='w-3 h-3 text-white' />
    }
]

