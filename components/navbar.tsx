'use client'
import React from 'react';
import Logout from './logout';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="bg-gray-00 bg-opacity-20 backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                
                <h1 className="pacifico-regular p-1 justify-center items-center  lg:block md:block sm:block">GMADP Donations</h1>
                
                <ul className="flex space-x-4 justify-center w-full lg:max-w-[35vw] justify-between">
                    <li className="text-white font-medium">
                        <button className="bg-blue-600 button border p-2 m-2 rounded-2xl hover:bg-gray-200 hover:text-black hidden sm:block">
                            <a href="/Donationsform"> Add Donations</a>
                            <div className="rectangle"></div>
                        </button>
                    </li>
                    <li className="text-white font-medium ">
                        <button className="button border p-2 m-2 rounded-2xl bg-blue-600 hover:bg-gray-200 hover:text-black hidden sm:block">
                            <a href="/Donationslist">View Donations</a>
                            <div className="rectangle"></div>
                        </button>
                    </li>
                    <li className="text-black font-medium">
                                <button className='bg-blue-600 text-white border rounded-2xl p-2 m-2 hover:bg-gray-200 hover:text-black hidden sm:block'>
                                    <a href="/Register">Add Users</a>
                                    </button>
                                </li>
                    <li className="text-white font-medium hidden sm:block m-1 ">
                        <Logout />
                    </li>

                    <li className="text-white font-medium relative sm:hidden">
                        <button className="button border p-2 m-2 rounded-2xl bg-blue-600 hover:bg-gray-200 hover:text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <ul className="absolute top-12 right-0 bg-gray-200 p-4 rounded-lg shadow-lg">
                                <li className="text-black font-medium">
                                    <button className='bg-blue-600 text-white border rounded-2xl p-2 hover:bg-gray-200 hover:text-black'>
                                    <a href="/Donationsform">Add Donations</a>
                                    </button>
                                </li>
                                <li className="text-black font-medium">
                                <button className='bg-blue-600 text-white border rounded-2xl p-2 hover:bg-gray-200 hover:text-black'>
                                    <a href="/Donationslist">View Donations</a>
                                    </button>
                                </li>
                                <li className="text-black font-medium">
                                <button className='bg-blue-600 text-white border rounded-2xl p-2 hover:bg-gray-200 hover:text-black'>
                                    <a href="/Register">Add users</a>
                                    </button>
                                </li>
                                <li className="text-black font-medium">
                                    <button className='text-white my-0'>
                                    <Logout />
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
                
                
            </div>
        </nav>
    );
};

export default Navbar;
