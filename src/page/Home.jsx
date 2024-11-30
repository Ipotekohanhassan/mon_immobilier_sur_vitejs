import React from 'react';
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import UserRoleSelection from '../components/UserRoleSelection/UserRoleSelection'

const Home = () => {
    return (
        <div className='overflow-x-hidden'>
            <div className="bg-gradient-to-r from-orange-50 to-white md:bg-gradient-to-b min-h-screen">
                <Navbar />
                <Hero />
            </div>
            <UserRoleSelection />
        </div>
    );
};

export default Home;
