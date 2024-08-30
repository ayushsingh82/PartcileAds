import React from 'react'
import { useState } from 'react'
import Post from './Post'

function Advertise() {
 const [selectedOption, setSelectedOption]=useState("post")

  return (
    <div>
     
    <div className='flex flex-col items-center bg-white pb-[50px]'>
  

    <div className='flex gap-x-12 mt-[60px]'>
      <div className="flex items-center ps-4 border border-transparent rounded  bg-purple-400 ">
        <input
          id="bordered-radio-1"
          type="radio"
          value="live"
          name="bordered-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={selectedOption === 'live'}
          onChange={() => setSelectedOption('live')}
        />
        <label
          htmlFor="bordered-radio-1"
          className="w-full py-4 ms-2 text-lg font-medium text-black font-bold"
        >
          Live ADS
        </label>
      </div>
      <div className="flex items-center ps-4 border border-transparent rounded  bg-purple-400 ">
        <input
          id="bordered-radio-2"
          type="radio"
          value="post"
          name="bordered-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={selectedOption === 'post'}
          onChange={() => setSelectedOption('post')}
        />
        <label
          htmlFor="bordered-radio-2"
          className="w-full py-4 ms-2 text-lg font-medium text-black font-bold"
        >
          Post ADS
        </label>
      </div>
    </div>

    <div className='mt-[40px]'>
    { selectedOption==="post"? <Post/>: "Hi" }
    </div>

  </div>
    </div>
  )
}

export default Advertise
