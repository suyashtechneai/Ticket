import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom';

import './Sidebar.css'

function Sidebar() {

   const [search, setSearch] = useState(null);
   const [data, setData] = useState(null);

   const location = useLocation();

   const { pathname } = location;

   const splitLocation = pathname.split("/");

   const mastermodules=['User','Country','State','City','Designation','Departmemt','Role','Status','Dynamic'];
   
   const ticketModules=['Ticket'];

    function getData ()  {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:5000/searchmodule/", {
            method: "GET",
            headers: headers            
        })
        .then((response)=>response.json())
        .then((result) => {
            setData(result);
        })
        .catch((error) => console.log("error", error));    
    }
   
    function searchingValue(e){
        setSearch(e.target.value);
    }
    useEffect(() => {
        getData();
    },[])

    return (
        <>
        <div className="sidebar px-4 py-4 py-md-5 me-0">
          <div className="d-flex flex-column h-100">
            <a href="index.html" className="mb-0 brand-icon">
              <span className="logo-icon">
                <svg
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-clipboard-check"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                  />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
              </span>
              <span className="logo-text">My-Task</span>
            </a>
            <div className="order-0 mt-3 mcol-sm-12 col-12 mb-3 mb-md-0 ">
              <div className="input-group flex-nowrap input-group-lg">
                <button
                  type="button"
                  className="input-group-text"
                  id="addon-wrapping"
                  style={{fontSize: '90%'}}
                >
                  <i className="fa fa-search"></i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="search"
                  aria-describedby="addon-wrapping"
                  name="search"
                  style={{fontSize: '90%'}}
                  onChange={searchingValue}
                />
                <button
                  type="button"
                  className="input-group-text add-member-top"
                  id="addon-wrappingone"
                  data-bs-toggle="modal"
                  data-bs-target="#addUser"
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
            <ul className="menu-list flex-grow-1 mt-1">
              
              <li className="collapsed">
                <Link to="/" className="m-link">
                  <i className="icofont-home fs-5" /> <span>Dashboard</span>
                </Link>
              </li>

              {/************ MASTER *************/}
              <li className="collapsed">
                <a
                  href="#"
                  className="m-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#Master-Components"
                  aria-expanded={`${splitLocation[1]==='User' ? 'true' :'false'} `}
                >
                  <i className="icofont-ticket" /> <span>Masters</span>
                  <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                </a>
                <ul className={`sub-menu collapse ${mastermodules.includes(splitLocation[1]) ? 'show' :''} `} id="Master-Components">
                  <li>
                    {/* {!search && data && data.map((index,key)=>{
                    return <Link key={key} to={index.url} className="ms-link">
                            <span>{index.module_name}</span>
                          </Link>
                        })
                    }
                    {search && data && data.map((index,key)=>{
                        let _module_name=index.module_name.toUpperCase();
                        let _search_string=search.toUpperCase();

                         if(_module_name.includes(_search_string)){
                            return  <Link key={key} to="/${index.link}" className="ms-link">
                                 <span>{index.module_name}</span>
                              </Link> 
                            }
                        })
                    } */}
                  <Link to="/User" className={`ms-link ${splitLocation[1]==='User' ? 'myactive' :''} `}>
                        <span>User Master</span>
                    </Link>  

                    <Link to="/Country" className={`ms-link ${splitLocation[1]==='Country' ? 'myactive' :''} `}>
                        <span>Country Master</span>
                    </Link>
                    <Link to="/State" className={`ms-link ${splitLocation[1]==='State' ? 'myactive' :''} `}>
                        <span>State Master</span>
                    </Link>
                    <Link to="/City" className={`ms-link ${splitLocation[1]==='City' ? 'myactive' :''} `}>
                        <span>City Master</span>
                    </Link>

                    <Link to="/Designation" className={`ms-link ${splitLocation[1]==='Designation' ? 'myactive' :''} `}>
                        <span>Designation Master</span>
                    </Link>

                    <Link to="/Department" className={`ms-link ${splitLocation[1]==='Department' ? 'myactive' :''} `}>
                        <span>Department Master</span>
                    </Link>

                    <Link to="/Role" className={`ms-link ${splitLocation[1]==='Role' ? 'myactive' :''} `}>
                        <span>Role Master</span>
                    </Link>

                    <Link to="/Status" className={`ms-link ${splitLocation[1]==='State' ? 'myactive' :''} `}>
                        <span>Status Master</span>
                    </Link>  

                    <Link to="/Dynamic" className={`ms-link ${splitLocation[1]==='Dynamic' ? 'myactive' :''} `}>
                        <span>Dynamic Form</span>
                    </Link>  
                  
                  </li>

                </ul>
            </li>
            {/************ MASTER ENDS*************/}        
            
            {/************ TICKET *************/}
            <li className="collapsed">
                <a
                  href="#"
                  className="m-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#Ticket-Components"
                  aria-expanded="false"
                >
                  <i className="icofont-ticket" /> <span>Ticket Management</span>
                  <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                </a>
                <ul className="sub-menu collapse" id="Ticket-Components">
                  <li>
                    <Link to="/Ticket" className="ms-link">
                        <span>Your Tickets</span>
                    </Link>
                    <Link to="/Ticket/Create" className="ms-link">
                        <span>Create Ticket</span>
                    </Link>
                  </li>

                </ul>
            </li>
            {/************ MASTER ENDS*************/}        
            </ul>

            <ul className="list-unstyled mb-0">
              <li className="d-flex align-items-center justify-content-center">
                <div className="form-check form-switch theme-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="theme-switch"
                  />
                  <label className="form-check-label" htmlFor="theme-switch">
                    Enable Dark Mode!
                  </label>
                </div>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-link sidebar-mini-btn text-light"
            >
              <span className="ms-2">
                <i className="icofont-bubble-right"></i>
              </span>
            </button>
          </div>
        </div>
      </>
    );   
     
}

export default Sidebar
