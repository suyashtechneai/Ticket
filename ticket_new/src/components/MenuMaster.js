import React from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MenuMaster = () => {
    return (
        <div id="mytask-layout" className="theme-indigo">
        <Sidebar />
        <div className="main px-lg-4 px-md-4">
            <Topbar />
                MenuMaster
            </div>
        </div>
    )
}

export default MenuMaster
