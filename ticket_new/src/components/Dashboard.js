import React from 'react'
import Header from './LayoutComponent/Header'
import Sidebar from './LayoutComponent/Sidebar'
import CityComponent, {CityMaster} from './MasterComponent/CityComponent/CityComponent'

const Dashboard = () => {
    return (
        <>
            <div id="mytask-layout" className="theme-indigo"> 
                {/************ SIDEBAR *************/}
                    <Sidebar />
                {/************ SIDEBAR *************/}

                <div className="main px-lg-4 px-md-4">
                {/************ HEADER *************/}
                    <Header />
                {/************ HEADER *************/}

                    {/************ MAIN BODY *************/}
                   
                    {/************ MAIN BODY *************/}
                    {/* <CityComponent /> */}
                </div>
            </div>
        </>
    )
}

export default Dashboard
