import React, {useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {ButtonComponent,InputComponent} from '../../Utilities/Button/Button'
import { getDataUsingParam,putData } from "../../../services/MastersService/CountryService";
import *  as Validation from '../../Utilities/Validation';
import Alert from '../../NotificationComponent/Alert';

function EditCountry({match}) {
    const history = useHistory();
    const [countryData, setCountryData] = useState({id:null,country:null});

    const getData = (id) => {
        getDataUsingParam(id).then(res =>{
            setCountryData({
                country: res.data[0].country,
                id:res.data[0].id
            });
        });
    }

    const changeHandler =(e)=>{    
        const {name,value}=e.target;
        setCountryData({
            ...countryData,
            [name]: value,
        });
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(countryData);
        putData(match.params.id,countryData).then(res=>{
            var returnValue={show:true,type:"danger",message:res.message};
            if(res.status==1){
                returnValue.type="success";
            }
            history.push({
                pathname: '/Country',
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
                                    <h2 className="mb-0 fw-bold ">Edit Country</h2>
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
                                    
                                        <InputComponent 
                                            id="country"
                                            name="country"
                                            placeholder=""
                                            defaultValue={countryData.country}
                                            getInputValue={e => { changeHandler(e); Validation.CharactersOnly(e) } }
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3" style={{'textAlign':'right'}}>
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Update" 
                                        />&nbsp;
                                        <ButtonComponent type="Link" url="/Country" buttonColor="danger" textColor="white" text="Cancel"/>
                                        
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

export default EditCountry 
