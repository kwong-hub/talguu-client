import React from 'react'
import { Link } from 'react-router-dom'

import svgNot from '../assets/images/not_found.svg'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 mx-auto text-xl text-gray-700">
      <img className="w-2/3 m-4" src={svgNot} alt="" />
      <h1> 404 Error.</h1>
      <p> We can&apos;t find the page you&apos;re looking for.</p>
      <Link
        as={Link}
        to="/"
        className="rounded-full text-white text-lg bg-blue-500 py-3 px-6 m-4 flex justify-center items-center"
        variant="three">
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
