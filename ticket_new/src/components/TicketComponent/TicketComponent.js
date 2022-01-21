import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getData } from "../../services/TicketService/TicketService";
import TableNew from "../Utilities/Table/TableNew";
import Alert from '../NotificationComponent/Alert';
import {ButtonComponent} from '../Utilities/Button/Button'
function TicketComponent({location}) {
    
    const [showAlert, setShowAlert] = useState({show:false,type:null,message:null});

    const [data, setData] = useState(null);

    const columns = [
                        { name: 'Sr', selector: row => row.counter, sortable: true, },
                        { name: 'Ticket Id', cell: row => <span className='fw-bold text-secondary'>{row.ticket_id}</span>, sortable: true, },    
                        { name: 'Object Id', selector: row => row.object_id, sortable: true, },
                        { name: 'Ticket date', selector: row => row.ticket_date, sortable: true, },
                        { name: 'Priority', cell: row => 
                            <div>
                            {row.priority==="High" && <span class="badge bg-danger">{row.priority}</span> }
                            {row.priority==="Medium" && <span class="badge bg-warning">{row.priority}</span> }
                            {row.priority==="Low" && <span class="badge bg-info">{row.priority}</span> }
                            </div>
                            ,
                          sortable: true, },
                        { name: 'Type', cell: row => row.type, sortable: true, },
                        { name: 'Action',
                            width:"20%",
                            button: true,
                            ignoreRowClick: true,
                            allowOverflow: true,
                            cell: row => 
                                <div className="d-flex">
                                    <ButtonComponent type="Link" url={`/Ticket/Edit/`+row.id} buttonColor="primary" textColor="white" text="Edit" 
                                        icon={{type:"Edit",color:"white",size:"15px"}}/>
                                    {/* <Link to={`/Ticket/Edit/`+row.id}
                                    className="btn btn-sm btn-primary" 
                                    icon={{type:"Edit",color:"white"}}
                                    >Edit</Link> */}
                                     
                                     {/* <ButtonComponent type="Link" url={`/Ticket/Edit/`+row.id} buttonColor="primary" textColor="white" text="Edit" 
                                        icon={{type:"Edit",color:"white",size:"15px"}}/> */}
                                       <ButtonComponent type="Link" url={`/Ticket/Task/`+row.id} buttonColor="primary" textColor="white" text="Task" 
                                        icon={{type:"Edit",color:"white",size:"15px"}}/>

                                    <button type="button" className="btn btn-sm btn-danger" 
                                    id={`delete_`+row.id} value={row.id} 
                                    onClick={handleDelete} style={{'color':'white'}}
                                    icon={{type:"Delete",color:"white"}}
                                    >
                                    <i className='icofont-ui-delete text-white' style={{'marginRight':'25px'},{'fontSize':'15px'}}></i>        
                                    Delete</button>
                                        
                                </div> 
                          }
                    ];

  const handleDelete=(e)=>{
      const id=e.target.id;
      alert(id);
  } 
    const get = () => {
        const tempData=[];
        getData().then(res =>{
            var counter=1;
            for (const key in res.data) {
                tempData.push({
                  counter:counter++,
                  id: res.data[key].id,
                  object_id:res.data[key].object_id,
                  ticket_id: res.data[key].ticket_id,
                  ticket_date: new Date(res.data[key].ticket_date).toLocaleDateString(),
                  priority: res.data[key].priority,
                  type: res.data[key].type_id
                })
            }
            setData(tempData);
        });
    }
    useEffect(() => {
        get();
        if(location && location.state){
            setShowAlert(location.state.alertData);
        }
    }, [])

    return (
        <>
            <div className="body d-flex py-3">
                <div className="container-xxl">
                    <div className="row clearfix g-3">
                        <div className="col-xl-12 col-lg-12 col-md-12 flex-column">

                            {/*************** HEADING ***************/}
                            <div className="card">
                                <div className="card-header d-flex justify-content-between bg-transparent 
                                border-bottom-0">
                                    <h2 className="mb-0 fw-bold ">Ticket Master</h2>
                                    <Link to="Ticket/Create/"  className="btn btn-dark btn-sm btn-set-task w-sm-100">
                                        <i className="icofont-plus-circle me-2 fs-6" />
                                        Add 
                                    </Link>           
                                </div>
                            </div>

                            <div className='card mt-2'>
                                <div className='card-body'>
                                {showAlert.show && <Alert type={showAlert.type} message={showAlert.message}/>}    
                                    {data &&
                                        <TableNew
                                            columns={columns}
                                            data={data}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}
        </>
    )
}

export {TicketComponent}
