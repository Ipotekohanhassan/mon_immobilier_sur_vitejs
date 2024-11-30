import React from 'react';
import { AiOutlineSearch, AiOutlineBell, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center z-20">
            {/* Menu Button for Mobile */}
            <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
                onClick={toggleSidebar}
            >
                <AiOutlineMenu className="text-gray-700 text-2xl" />
            </button>

            {/* Title or Logo */}
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">MON IMMOBILIER<span className="text-orange-500"> SÛR</span></h1>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">

                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <AiOutlineBell className="text-gray-600 text-xl" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <AiOutlineUser className="text-gray-600 text-xl" />
                </button>
                
            </div>
        </header>
    );
};

export default Navbar;
