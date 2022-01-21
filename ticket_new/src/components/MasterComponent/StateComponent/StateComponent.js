import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { getData,putDeleteData } from "../../../services/MastersService/StateService";
import TableNew from "../../Utilities/Table/TableNew";
import Alert from '../../NotificationComponent/Alert';

function StateComponent({location}) {
    const history = useHistory();
    const [showAlert, setShowAlert] = useState({show:false,type:null,message:null});

    const [data, setData] = useState(null);
    let counter=1;
    const columns = [
                        { name: 'Sr', selector: row => row.counter, sortable: true, },
                        { name: 'State', selector: row => row.state, sortable: true, },
                        { name: 'Action',
                            width:"10%",
                            button: true,
                            ignoreRowClick: true,
                            allowOverflow: true,
                            cell: row => 
                                <div className="d-flex justify-content-center">
                                    <Link to={`/State/Edit/`+row.id}
                                    className="btn btn-sm btn-primary" 
                                    >Edit</Link>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                    id={row.id} value={row.id} 
                                    onClick={handleMakeDefault} style={{'width':'60px'}}>Delete</button>

                                </div> 
                          }
                    ];
                    
    const get = () => {
        const tempData=[];
        getData().then(res =>{
            let counter=1;
            for (const key in res.data) {
                tempData.push({
                counter:counter++,
                  id: res.data[key].id,
                  state: res.data[key].state
                })
            }
            setData(tempData);
        });
    }
    const handleDelete=(e)=>{
        const id=e.target.id;
        alert(id);
    } 
    const handleMakeDefault=(e)=>{
        const id=e.target.id;
        e.preventDefault();
       
        const temp={is_default:1}
        putDeleteData(id,temp).then(res=>{
            if(res.status==1){
                history.push("/State");
                //get();
                //setShowAlert({show:true,type:"success",message:res.message});
            }//else{
            //     setShowAlert({show:true,type:"danger",message:res.message});
            // }
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
                                    <h2 className="mb-0 fw-bold ">State Master</h2>
                                    <Link to="State/Create/"  className="btn btn-dark btn-sm btn-set-task w-sm-100">
                                        <i className="icofont-plus-circle me-2 fs-6" />
                                        Add 
                                    </Link>           
                                </div>
                            </div>

                    
                            {/*************** TABLE ***************/}
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


function StateDropdown(props){
    const [data, setData] = useState(null);
    useEffect(() => {
        const tempData=[];
        getData().then(res =>{
            for (const key in res.data) {
                tempData.push({
                    id: res.data[key].id,
                    state: res.data[key].state
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
                    required={props.required ? true : false }
                    >

            <option value="">Select State</option>
                { data.map(function(item, i){
                    if(props.countryId && props.countryId==item.country_id){
                        return <option key={i} value={item.id} selected>{item.state}</option>
                    }else if(props.defaultValue && props.defaultValue==item.id){
                        return <option key={i} value={item.id} selected>{item.state}</option>
                    }else{
                        return <option key={i} value={item.id}>{item.state}</option>
                    }
                })
            }
            </select>
        }
        {!data && <p> Loading....</p>}
        </>
    )
}

export  {StateComponent,StateDropdown}
