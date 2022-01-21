import React, { useEffect, useState,useRef } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { getData,putDeleteData } from "../../../services/MastersService/UserService";
import TableNew from "../../Utilities/Table/TableNew";
import Alert from '../../NotificationComponent/Alert';
function UserComponent({location}) {
    const history = useHistory();
    const [showAlert, setShowAlert] = useState({show:false,type:null,message:null});

    const [data, setData] = useState(null);

    // const searchRef=React.searchRef();

    const columns = [
                        { name: 'Sr', selector: row => row.counter, sortable: true, },
                        { name: 'Name', selector: row => row.name, sortable: true, },
                        { name: 'Action',
                            width:"10%",
                            button: true,
                            ignoreRowClick: true,
                            allowOverflow: true,
                            cell: row => 
                                <div className="d-flex justify-content-center">
                                    <Link to={`/User/Edit/`+row.id}
                                    className="btn btn-sm btn-primary" 
                                    style={{'width':'50px'}}
                                    >Edit</Link>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                    id={row.id} value={row.id} 
                                    onClick={handleMakeDefault} style={{'width':'70px'}}>Delete</button>
                                </div> 
                          }
                    ];

    const handleDelete=(e)=>{
        const id=e.target.id;
    } 
    const handleMakeDefault=(e)=>{
        const id=e.target.id;
        e.preventDefault();
       
        const temp={is_default:1}
        putDeleteData(id,temp).then(res=>{
            if(res.status==1){
                history.push("/User");
                // get();
                // setShowAlert({show:true,type:"success",message:res.message});
            }//else{
            //     setShowAlert({show:true,type:"danger",message:res.message});
            // }
        });
    }
    const get = () => {
        const tempData=[];
        getData().then(res =>{
            let counter=1;
            for (const key in res.data) {
                tempData.push({  
                  counter:counter++,
                  id: res.data[key].id,
                  name: res.data[key].first_name+" "+res.data[key].middle_name+" "+res.data[key].last_name
                })
            }
            setData(tempData);
        });
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        // console.log(list);
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
                                    <h2 className="mb-0 fw-bold ">User Master</h2>
                                    <Link to="User/Create/"  className="btn btn-dark btn-sm btn-set-task w-sm-100">
                                        <i className="icofont-plus-circle me-2 fs-6" />
                                        Add 
                                    </Link>           
                                </div>
                            </div>
                            
                            {/*************** TABLE ***************/}
                            <div className='card mt-2'>
                                <div className='card-body'>

                            <form onSubmit={handleSearch}>
                                <div className="form-group row">
                                    <div className='col-md-4'>
                                         <input type="text" className='form-control form-control-sm' id="search" name="search"/>
                                    </div>
                                    <div className='col-md-2'>
                                        <button className='btn btn-sm btn-warning' type="submit">Search</button>
                                    </div>
                                </div>
                            </form>    


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

function UserDropdown(props){
    const [data, setData] = useState(null);
    useEffect(() => {
        const tempData=[];
        getData().then(res =>{
            for (const key in res.data) {
                tempData.push({  
                  id: res.data[key].id,
                  name: res.data[key].first_name+" "+res.data[key].middle_name+" "+res.data[key].last_name
                })
            }
            setData(tempData);
        });
    }, [])

    return (
        <>
        { data && 
            <select className="form-control form-control-sm" 
                    id={props.id} 
                    name={props.name} 
                    onChange={props.getChangeValue}
                    >
                <option value="">Select User</option>
                {data.map(function(item, i){
                    if(props.defaultValue && props.defaultValue==item.id){
                        return <option key={i} value={item.id} selected>{item.name}</option>
                    }else{
                        return <option key={i} value={item.id}>{item.name}</option>
                    }
                    
                })
            }
            </select>
        }
        {!data && <p> Loading....</p>}
        </>
    )
}
export {UserComponent,UserDropdown}
