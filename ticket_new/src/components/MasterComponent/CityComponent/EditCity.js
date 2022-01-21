import React, {useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {ButtonComponent,InputComponent} from '../../Utilities/Button/Button'
import { getDataUsingParam,putData } from "../../../services/MastersService/CityService";
import {CountryDropdown} from '../CountryComponent/CountryComponent'
import {StateDropdown} from '../StateComponent/StateComponent'
import *  as Validation from '../../Utilities/Validation';
import Alert from '../../NotificationComponent/Alert';

function EditCity({match}) {
    const history = useHistory();
    const [cityData, setCityData] = useState({id:null,city:null,state_id:null});
    const getData = (id) => {
        const tempData=[];
        getDataUsingParam(id).then(res =>{
            setCityData({
                city: res.data[0].city,
                state_id:res.data[0].state_id,
                country_id:res.data[0].country_id
            });
        });
    }

    const changeHandler =(e)=>{    
        const {name,value}=e.target;
        setCityData({
            ...cityData,
            [name]: value,
        });
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        putData(match.params.id,cityData).then(res=>{
            var returnValue={show:true,type:"danger",message:res.message};
            if(res.status==1){
                returnValue.type="success";
            }
            history.push({
                pathname: '/City',
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
                                    <h2 className="mb-0 fw-bold ">Edit City</h2>
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
                                        <CountryDropdown 
                                        id="country_id" 
                                        name="country_id" 
                                        defaultValue={cityData.country_id} 
                                        getChangeValue={changeHandler}/>
                                        </div>
                                    </div>   
                                
                                <div className="form-group row mt-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                            <b>State :</b>
                                        </label>
                                        <div className="col-sm-10">
                                    
                                        <StateDropdown 
                                            id="state_id"
                                            name="state_id"
                                            placeholder=""
                                            defaultValue={cityData.state_id}
                                            getChangeValue={changeHandler}
                                            />
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
                                            defaultValue={cityData.city}
                                            getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                            />

                                        </div>
                                    </div>

                                    <div className="mt-3" style={{'textAlign':'right'}}>
                                        {/* <button type="submit" className="btn btn-sm btn-primary">
                                            Add
                                        </button> */}
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Update" 
                                        />&nbsp;
                                        <ButtonComponent type="Link" url="/City" buttonColor="danger" textColor="white" text="Cancel"/>
                                        
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

export default EditCity 
