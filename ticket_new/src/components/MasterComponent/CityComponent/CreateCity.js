import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonComponent, InputComponent } from '../../Utilities/Button/Button'
import { postData } from "../../../services/MastersService/CityService";
import { CountryDropdown } from '../CountryComponent/CountryComponent'
import { StateDropdown } from '../StateComponent/StateComponent'
import *  as Validation from '../../Utilities/Validation';
import Alert from '../../NotificationComponent/Alert';

function CreateCity() {
    const history = useHistory();

    const [cityData, setCityData] = useState();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setCityData({
            ...cityData,
            [name]: value,
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        postData(cityData).then(res => {
            var returnValue = { show: true, type: "danger", message: res.message };
            if (res.status == 1) {
                returnValue.type = "success";
            }
            history.push({
                pathname: '/City',
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
                                    <h2 className="mb-0 fw-bold ">Add City</h2>
                                </div>
                            </div>
                            {/*************** TABLE ***************/}
                            <div className='card mt-2'>
                                <div className='card-body'>

                                    <form onSubmit={submitHandler}>

                                        <div className="form-group row">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>Country :</b>
                                            </label>
                                            <div className="col-sm-10">
                                                <CountryDropdown id="country_id" name="country_id" getChangeValue={changeHandler} />
                                            </div>
                                        </div>


                                        <div className="form-group row mt-3">
                                            <label htmlFor="" className="col-sm-2 col-form-label">
                                                <b>State :</b>
                                            </label>
                                            <div className="col-sm-10">
                                                <StateDropdown id="state_id" name="state_id" getChangeValue={changeHandler} />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                <b>City :</b>
                                            </label>

                                            <div className="col-sm-10">

                                                <InputComponent
                                                    id="city"
                                                    name="city"
                                                    placeholder=""
                                                    getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                                />

                                            </div>
                                        </div>

                                        <div className="mt-3" style={{ 'textAlign': 'right' }}>
                                
                                            <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Add"/>&nbsp;
                                            <ButtonComponent type="Link" url="/City" buttonColor="danger" textColor="white" text="Cancel" />

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

export default CreateCity 
