import React, {useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {ButtonComponent,InputComponent} from '../../Utilities/Button/Button'
import { getDataUsingParam,putData } from "../../../services/MastersService/DepartmentService";
import Alert from '../../NotificationComponent/Alert';
import *  as Validation from '../../Utilities/Validation';
function EditDepartment({match}) {
    const history = useHistory();

    const [departmentData, setDepartmentData] = useState({id:null,country:null});

    const getData = (id) => {
        getDataUsingParam(id).then(res =>{
            setDepartmentData({
                id:res.data[0].id,
                department: res.data[0].department,
            });
        });
    }

    const changeHandler =(e)=>{    
        const {name,value}=e.target;
        setDepartmentData({
            ...departmentData,
            [name]: value,
        });
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        putData(match.params.id,departmentData).then(res=>{
            var returnValue={show:true,type:"danger",message:res.message};
            if(res.status==1){
                returnValue.type="success";
            }
            history.push({
                pathname: '/Department',
                state: { showAlert : true, alertData:returnValue }
            });
        });       
    }

    useEffect(() => {
        getData(match.params.id);
    },[])
    
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
                                    <h2 className="mb-0 fw-bold ">Edit Department</h2>
                                </div>
                            </div>
                            {/*************** TABLE ***************/}
                            <div className='card mt-2'>
                                <div className='card-body'>

                                <form onSubmit={submitHandler}>
                                    
                                <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label">
                                            <b>Department :</b>
                                        </label>
                                        <div className="col-sm-10">
                                    
                                        <InputComponent 
                                            id="department"
                                            name="department"
                                            placeholder=""
                                            defaultValue={departmentData.department}
                                            getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3" style={{'textAlign':'right'}}>
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Update" 
                                        />&nbsp;
                                        <ButtonComponent type="Link" url="/Department" buttonColor="danger" textColor="white" text="Cancel"/>
                                    </div>
                                </form>

                                </div>
                            </div>

                        </div>
                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}

        </>
    )
}

export default EditDepartment
