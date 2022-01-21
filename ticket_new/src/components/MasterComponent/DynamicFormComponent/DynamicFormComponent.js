import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getData,putData } from "../../../services/MastersService/DynamicFormService";
import TableNew from "../../Utilities/Table/TableNew";
import Alert from '../../NotificationComponent/Alert';

function DynamicFormComponent({location}) {
    
    const [showAlert, setShowAlert] = useState({show:false,type:null,message:null});

    const [data, setData] = useState(null);

    const columns = [
                        { name: 'Sr', selector: row => row.counter, sortable: true, width:"10%",},
                        { name: 'Form Name', selector: row => row.name, sortable: true, width:"30%",},
                        { name: 'Is Default', cell: row => 
                            <div>
                                {row.is_default===0 && <span class="badge bg-danger">NO</span> }
                                {row.is_default===1 && <span class="badge bg-success">YES</span> }
                            </div>,
                         sortable: true, width:"20%",},
                        
                         { name: 'Make Default', cell: row => 
                            <div>
                                {row.is_default===0 &&  <button type="button" 
                                    className="btn btn-sm btn-success" 
                                    id={row.id} value={row.id} 
                                    onClick={handleMakeDefault}>Make Default</button> }
                            </div>,
                         sortable: true, width:"20%",},

                        { name: 'Action',
                            width:"10%",
                            button: true,
                            ignoreRowClick: true,
                            allowOverflow: true,
                            cell: row => 
                                <div className="d-flex" style={{'textAlign':'right'}}>
                                    <Link to={`/Ticket/Edit/`+row.id}
                                    className="btn btn-sm btn-primary"
                                    style={{'width':'50px','textAlign':'center'}} 
                                    >Edit</Link>

                                    <button type="button" className="btn btn-sm btn-danger" 
                                    id={`delete_`+row.id} value={row.id} 
                                    onClick={handleDelete} style={{'width':'70px','textAlign':'center'}}>Delete</button>
                          

                                </div> 
                          }
                    ];

  const handleDelete=(e)=>{
      const id=e.target.id;
      alert(id);
  }

  const handleMakeDefault=(e)=>{
    const id=e.target.id;
    e.preventDefault();
    
    const temp={is_default:1}
    putData(id,temp).then(res=>{
        if(res.status==1){
            get();
            setShowAlert({show:true,type:"success",message:res.message});
        }else{
            setShowAlert({show:true,type:"danger",message:res.message});
        }
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
                  name: res.data[key].name,
                  is_default: res.data[key].is_default,
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
                                    <h2 className="mb-0 fw-bold ">Dynamic Form</h2>
                                    <Link to="Dynamic/Create/"  className="btn btn-dark btn-sm btn-set-task w-sm-100">
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

export default DynamicFormComponent
