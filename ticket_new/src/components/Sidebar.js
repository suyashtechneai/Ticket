import React, { useState,useEffect } from 'react'
import { NavLink, Link,useHistory } from 'react-router-dom';

const Sidebar = (props) => {

    const [state, setState] = useState(null);
    const [search, setSearch] = useState(null);
    const [data, setData] = useState(null);
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
    // const search = (name) => {
    //     setState(name.key);
    //     //alert(name.key);
    //     console.log(name.key);
    //     //const id = name.key;

    //     var headers = new Headers();
    //       headers.append("Content-Type", "application/json");
    //       fetch("http://localhost:5000/searchmodule/"+name.key, {
    //           method: "GET",

    //           headers: headers            
    //       })
    //       .then((response)=>response.json())
    //       .then((result) => {
    //           console.log("result", result);
    //           this.setState({
    //               records: result, 
    //           })
    //           this.setSearch({
    //             searchresult: true,
    //           })
              
              
    //       })
    //     // .then(data => {
    //     //     records: result, 
    //     // })
    //       .catch((error) => console.log("error", error));     
    // }
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

              <li className="collapsed">
                  <a className="m-link collapsed" data-bs-toggle="collapse" data-bs-target="#project-Components" href="#" aria-expanded="false">
                      <i className="icofont-briefcase"></i><span>Projects</span> <span className="arrow icofont-dotted-down ms-auto text-end fs-5"></span></a>
                  
                  <ul className="sub-menu collapse" id="project-Components">
                      <li><a className="ms-link" href="projects.html"><span>Projects</span></a></li>
                      <li><a className="ms-link" href="task.html"><span>Tasks</span></a></li>
                      <li><a className="ms-link" href="timesheet.html"><span>Timesheet</span></a></li>
                      <li><a className="ms-link" href="team-leader.html"><span>Leaders</span></a></li>
                  </ul>
              </li>

              <li className="collapsed">
                <a
                  className="m-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#mast-Components"
                  href="#"
                  aria-expanded="false"
                >
                  <i className="icofont-ticket" /> <span>Masters</span>
                  <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                </a>
                <ul className="sub-menu collapse" id="mast-Components">
                  <li>
                    {!search && data && data.map((index,key)=>{
                            return <Link key={key} to={index.url} className="ms-link">
                            <span>{index.module_name}</span>
                          </Link>
                        })
                    }
                
                    {search && data && data.map((index,key)=>{
                        let temp1=index.module_name.toUpperCase();
                        let temp2=search.toUpperCase();

                         if(temp1.includes(temp2)){
                            return  <Link key={key} to="/${index.link}" className="ms-link">
                            <span>{index.module_name}</span>
                            </Link> 
                            }
                        })
                    }
                  </li>
                </ul>
            </li>



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
