import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonComponent, InputComponent, EmailInputComponent, PasswordComponent, TextareaComponent } from '../../Utilities/Button/Button'
import { postData } from '../../../services/MastersService/UserService';
import { RoleDropdown } from '../RoleComponent/RoleComponent'
import { DesignationDropdown } from '../DesignationComponent/DesignationComponent'
import { DepartmentDropdown } from '../DepartmentComponent/DepartmentComponent'
import { CountryDropdown } from '../CountryComponent/CountryComponent'
import { StateDropdown } from '../StateComponent/StateComponent'
import { CityDropdown } from '../CityComponent/CityComponent'
import * as Validation from '../../Utilities/Validation';
import { Astrick } from '../../Utilities/Style';
function CreateCity() {
    const history = useHistory();

    const [userData, setUserData] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        postData(userData).then(res => { 
            var returnValue = { show: true, type: "danger", message: res.message };
            if (res.status == 1) {
                returnValue.type = "success";
            }
            history.push({
                pathname: '/User',
                state: { showAlert: true, alertData: returnValue }
            });
        });
    }

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
                                    <h2 className="mb-0 fw-bold ">Add User</h2>
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
                                                <b>Full Name :<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-3">
                                                <InputComponent
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    required
                                                    getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                                />
                                            </div>
                                            <div className="col-sm-3">
                                                <InputComponent
                                                    id="middle_name"
                                                    name="middle_name"
                                                    placeholder="Middle Name"
                                                    required
                                                    getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    required
                                                    getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
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
                                                    required
                                                    getInputValue={e => { changeHandler(e); Validation.EmailOnly(e) } }
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
                                                    required
                                                    minLength="10"
                                                    maxLength="10"
                                                    getInputValue={e => { changeHandler(e); Validation.NumbersOnly(e) } }
                                                />
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{ 'textAlign': 'right' }} >
                                                <b>WhatsApp Number:</b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="whats_app_contact_no"
                                                    name="whats_app_contact_no"
                                                    placeholder="Whats App Contact Number"
                                                    minLength="10"
                                                    maxLength="10"
                                                    getInputValue={e => { changeHandler(e); Validation.NumbersOnly(e) } }
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Username:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent
                                                    id="user_name"
                                                    name="user_name"
                                                    placeholder="Username"
                                                    required
                                                    getInputValue={e => { changeHandler(e)} }
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
                                                    minLength="6"
                                                    required
                                                    getInputValue={e => { changeHandler(e)} }
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Select Role:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <RoleDropdown id="role_id" name="role_id" getChangeValue={e => { changeHandler(e)} } required/>
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{ 'textAlign': 'right' }}>
                                                <b>Select Designation:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <DesignationDropdown id="designation_id" name="designation_id" getChangeValue={e => { changeHandler(e)} } required="true"/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Select Department:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <DepartmentDropdown id="department_id" name="department_id" getChangeValue={e => { changeHandler(e)} } required/>
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
                                                <b>Address:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-10">
                                                <TextareaComponent id="address" name="address"
                                                getInputValue={e => { changeHandler(e)} }/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Pincode:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <InputComponent id="pincode" name="pincode"
                                                minLength="6" maxLength="6" required
                                                getInputValue={e => { changeHandler(e); Validation.NumbersOnly(e) } }/>
                                            </div>

                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{'textAlign':'right'}}>
                                                <b>Country:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <CountryDropdown id="country_id" name="country_id" getChangeValue={e => { changeHandler(e)} } required/>
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>State:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <StateDropdown id="state_id" name="state_id" 
                                                countryId={userData.country_id}
                                                getChangeValue={e => { changeHandler(e)} }
                                                required/>
                                            </div>


                                            <label htmlFor="" className="col-sm-2 col-form-label" style={{'textAlign':'right'}}>
                                                <b>City:<Astrick color='red'/></b>
                                            </label>
                                            <div className="col-sm-4">
                                                <CityDropdown id="city_id" name="city_id" getChangeValue={e => { changeHandler(e)} } required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3" style={{ 'textAlign': 'left' }}>
                                    <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Add"
                                    />
                                    &nbsp;
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

export default CreateCity 
