import React from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";

const MainComponent = () => {
    return (
        <div id="mytask-layout" className="theme-indigo">
        <Sidebar />
        <div className="main px-lg-4 px-md-4">
            <Topbar />
                <Dashboard/>
            </div>
        </div>   
    )
}

export default MainComponent
