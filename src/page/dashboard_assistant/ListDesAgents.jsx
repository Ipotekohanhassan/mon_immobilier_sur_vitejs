import React, { useState } from "react";
import Sidebar from '../../components/Assistant/Sidebar';
import { FaBars } from "react-icons/fa";
import AgentList from "../../components/Assistant/AgentList";

const ListDesAgents = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div
                className="flex-1 p-6 md:ml-50 transition-all duration-300 overflow-y-auto"
                style={{ height: "100vh" }}
            >
                {/* Toggle Sidebar Button */}
                <button
                    onClick={toggleSidebar}
                    className="mb-6 md:hidden bg-primary text-white p-2 rounded-lg shadow-md"
                >
                    <FaBars />
                </button>

                
                {/* Key Statistics Section */}
                <AgentList />


            </div>
        </div>
    );
};

export default ListDesAgents;
