import React from 'react';
import Image from 'next/image'; 
export default function Navbar(){
  return (
    <nav className="fixed top-0 left-0 w-full z-10">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl ">
        {/* import svg file */}
        <Image src="/logo.svg" alt="Logo" width={30} height={30} className='ml-6'/>
          <ul className="flex space-x-6 p-1 items-center">
            <li>
              <a className="text-white hover:text-gray-300 transition" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300 transition" href="#">
                About
              </a>
              
            </li>
            <li>
              <a className="text-white hover:text-gray-300 transition" href="#">
                Projects
              </a>
              
            </li>
            <li className='bg-white rounded-md px-6 py-3 flex items-center'>
              <a className="text-black hover:text-gray-300 transition" href="#">
                Contact
                {/* link external icon */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

