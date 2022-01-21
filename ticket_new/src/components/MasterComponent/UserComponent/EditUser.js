import React, {useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {ButtonComponent,InputComponent,EmailInputComponent,TextareaComponent} from '../../Utilities/Button/Button'
import { getDataUsingParam,putData } from "../../../services/MastersService/UserService";
import Alert from '../../NotificationComponent/Alert';
import { RoleDropdown } from '../RoleComponent/RoleComponent'
import { DesignationDropdown } from '../DesignationComponent/DesignationComponent'
import { DepartmentDropdown } from '../DepartmentComponent/DepartmentComponent'
import { CountryDropdown } from '../CountryComponent/CountryComponent'
import { StateDropdown } from '../StateComponent/StateComponent'
import { CityDropdown } from '../CityComponent/CityComponent'
import { Astrick } from '../../Utilities/Style';

function EditCity({match}) {
    const history = useHistory();
    const [userData, setUserData] = useState({first_name:null,middle_name:null,last_name:null,email_id:null,contact_no:null,whats_app_contact_no:null,user_name:null,password:null,role_id:null,designation_id:null,department_id:null,address:null,pincode:null,country_id:null,state_id:null,city_id:null});

    const getData = (id) => {
        const tempData=[];
        getDataUsingParam(id).then(res =>{
            setUserData({
                first_name:res.data[0].first_name,middle_name:res.data[0].middle_name,last_name:res.data[0].last_name,
                email_id:res.data[0].email_id,contact_no:res.data[0].contact_no,whats_app_contact_no:res.data[0].whats_app_contact_no,user_name:res.data[0].user_name,password:res.data[0].password,
                role_id:res.data[0].role_id,designation_id:res.data[0].designation_id,department_id:res.data[0].department_id,address:res.data[0].address,pincode:res.data[0].pincode,country_id:res.data[0].country_id,
                state_id:res.data[0].state_id,city_id:res.data[0].city_id
            }); 
        });
    }

    const changeHandler =(e)=>{    
        const {name,value}=e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        putData(match.params.id,userData).then(res=>{
            var returnValue={show:true,type:"danger",message:res.message};
            if(res.status==1){
                returnValue.type="success";
            }
            history.push({
                pathname: '/User',
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
                                    <h2 className="mb-0 fw-bold ">Edit User</h2>
                                </div>
                            </div>
                                <form onSubmit={submitHandler}>
                                   {/* ********* MAIN DATA ********* */}
                                <div className='card mt-2'>
                                    <div className='card-header bg-primary text-white p-2'>
                                        <h5>User Details</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className="form-group row">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Name :<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-3">
                                                <InputComponent
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    defaultValue={userData.first_name}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                            <div className="col-sm-3">
                                                <InputComponent
                                                    id="middle_name"
                                                    name="middle_name"
                                                    placeholder="Middle Name"
                                                    defaultValue={userData.middle_name}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    defaultValue={userData.last_name}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Email Address:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <EmailInputComponent
                                                    id="email_id"
                                                    name="email_id"
                                                    placeholder="Email Address"
                                                    defaultValue={userData.email_id}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Contact Number:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="contact_no"
                                                    name="contact_no"
                                                    placeholder="Contact Number"
                                                    defaultValue={userData.contact_no}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{ 'textAlign': 'right' }} >
                                                <b>Whats App Number:</b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="whats_app_contact_no"
                                                    name="whats_app_contact_no"
                                                    placeholder="Whats App Contact Number"
                                                    defaultValue={userData.whats_app_contact_no}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Username :<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="user_name"
                                                    name="user_name"
                                                    placeholder="Username"
                                                    defaultValue={userData.user_name}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{ 'textAlign': 'right' }}>
                                                <b>Password :<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    defaultValue={userData.password}
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Select Role:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <RoleDropdown id="role_id" name="role_id" 
                                                defaultValue={userData.role_id}
                                                getChangeValue={changeHandler}/>
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{ 'textAlign': 'right' }}>
                                                <b>Select Designation:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <DesignationDropdown id="designation_id" name="designation_id" 
                                                defaultValue={userData.designation_id}
                                                getChangeValue={changeHandler}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Select Department:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <DepartmentDropdown id="department_id" name="department_id" 
                                                defaultValue={userData.department_id}
                                                getChangeValue={changeHandler}/>
                                            </div>
                                        </div>

                                    </div>
                                </div> 
                            {/* ********* ADDRESS ********* */}
                                <div className='card mt-2'>
                                    <div className='card-header bg-primary text-white p-2'>
                                        <h5>Address Details</h5>
                                    </div>
                                    <div className='card-body'>
                                        
                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Address:<Astrick color='red'/> </b>
                                            </label>
                                            <div className="col-sm-10">
                                                <TextareaComponent id="address" name="address" 
                                                defaultValue={userData.address}
                                                getInputValue={changeHandler}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Pincode:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent id="pincode" name="pincode" defaultValue={userData.pincode}
                                                getInputValue={changeHandler}/>
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{'textAlign':'right'}}>
                                                <b>Country:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <CountryDropdown id="country_id" name="country_id" 
                                                defaultValue={userData.city_id}
                                                getChangeValue={changeHandler}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>State:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <StateDropdown id="state_id" name="state_id" 
                                                countryId={userData.country_id}
                                                defaultValue={userData.state_id}
                                                getChangeValue={changeHandler}/>
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{'textAlign':'right'}}>
                                                <b>City:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <CityDropdown id="city_id" name="city_id" 
                                                defaultValue={userData.city_id}
                                                getChangeValue={changeHandler}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                    <div className="mt-3" style={{'textAlign':'right'}}>
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Update" 
                                        />&nbsp;
                                        <ButtonComponent type="Link" url="/User" buttonColor="danger" textColor="white" text="Cancel"/>
                                        
                                    </div>
                                </form>

                        </div>
                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}

        </>
    )
}

export default EditCity 
