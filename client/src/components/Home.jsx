import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    <div className=" mx-auto rounded-md  h-[30rem] overflow-hidden w-screen">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          <TypewriterEffectSmoothDemo />
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center"></p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="border-2 border-purple-500 text-white px-[10px] py-[10px] font-medium text-xl bg-gradient-to-r from-purple-900 via-black to-black rounded-lg">
            <a href="/landing">Create Ad Campaign</a>
          </button>
          <button className="px-4 py-2  font-medium border-2 rounded-lg py-[10px] bg-black text-white">
            {" "}
            <a href="https://abhays-organization-1.gitbook.io/adbase-dev-docs/">
              Dev Docs
            </a>
          </button>
        </div>
      </Vortex>
    </div>
  );
}

const TypewriterEffectSmoothDemo = () => {
  const words = [
    {
      text: "Run",
    },
    {
      text: "campaigns",
    },
    {
      text: "with",
    },
    {
      text: "Merlin-Ads.",
      className: "text-purple-500 dark:text-purple-500",
    },
    {
      text: "powered by",
    },
    {
      text: "PWR & Particle-Network",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
    </div>
  );
};

function Home() {
  return (
    <div className="flex flex-col items-center bg-black scroller h-screen">
      <div className="mt-[80px] flex flex-col gap-y-[80px] text-white mb-[30px]">
        <VortexDemo />
      </div>
    </div>
  );
}

export default Home;

// <div className='flex flex-col md:flex-row justify-between mx-auto md:gap-x-12 gap-y-12'>
// <div>
//     <motion.h1 className='text-center font-medium text-3xl text-purple-500'
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 2 }}>
//         Earn from Viewer Engagement
//     </motion.h1>
//     <motion.p className='mt-[20px] text-lg'
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 4 }}>
//         Generate revenue when viewers interact with your ads. Our system rewards you
//         <br /> for each visit and click, turning viewer engagement into tangible
//         <br /> earnings for your campaigns.
//     </motion.p>
// </div>
// <motion.div className='h-[400px]'
//     initial={{ x: 100, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 3 }}>
//     <img className='h-[400px] w-[400px]' src='https://i.pinimg.com/originals/12/66/07/126607145b0a3adf66144b7bd6b39635.jpg' alt='image' />
// </motion.div>
// </div>

// <div className='flex justify-between items-center w-full px-6 py-4 bg-black'>
// <div className='text-4xl flex-1 text-center'>
//     <TypewriterEffectSmoothDemo />
// </div>
// <button className='border-2 border-purple-500 text-white px-[10px] py-[10px] font-medium text-xl bg-gradient-to-r from-purple-900 via-black to-black rounded-lg'>
//     Join the community
// </button>
// </div>
// <h3 className='mt-[20px] text-white text-xl text-center'>
// Create and manage ad campaigns effortlessly. Our user-friendly platform allows you
// <br /> to design, launch, and monitor your ads seamlessly, ensuring maximum reach and
// <br /> engagement with minimal hassle.
// </h3>
