import React, { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { postData } from "../../../services/MastersService/DynamicFormService";
import * as validation from '../../Utilities/Validation'
import DynamicComponent from './DynamicComponent/DynamicComponent';
import {masterURL} from '../../../settings/constants'
import {getData} from '../../../services/DynamicService/DynamicService'
import RenderDynamicForm from '../../TicketComponent/RenderDynamicForm';

function CreateDynamicForm() {

    const mainJson={ 
        inputWidth:null,     
        inputType:null, 
        inputName: null ,
        inputLabel:null,
        inputDefaultValue:null,
        inputAddOn:{
            inputRange:null,
            inputDataSource:null,    
            inputDataSourceData:null,
            inputDateRange:null,
        }
    };

    const [rows, setRows] = useState([mainJson]);

    const [formShow,setFormShow]=useState(false);
    
    const [index,setIndex]=useState({index:0});                                

    const handleChange = idx => e => {

        setIndex({index:idx})    
        const { name, value } = e.target;

        if(e.target.name==="inputWidth")
        {
            rows[idx].inputWidth=e.target.value;
        }
        else if(e.target.name==="inputName")
        {
            rows[idx].inputName=e.target.value;
        }
        else if(e.target.name==="inputType"){
            rows[idx].inputType=e.target.value;   
        }
        else if(e.target.name==="inputLabel"){
            rows[idx].inputLabel=e.target.value;   
        }
        else if(e.target.name==="inputDefaultValue"){
            rows[idx].inputDefaultValue=e.target.value;   
        }
        else if(e.target.name==="inputDataOption"){
            rows[idx].inputOption=e.target.value;   
        }
        else if(e.target.name=="inputRange"){
            rows[idx].inputAddOn.inputRange=e.target.value;   
        }
        else if(e.target.name=="inputDataSource"){  
            const test=e.target.value.split('|');
            const _URL=masterURL[test[0]];
            const _Value=test[1];
            const _Label=test[2];

            getData(_URL).then(res =>{
                let counter=1;
                const tempData=[];
                for (const key in res.data) {
                    const t=res.data[key];
                    tempData.push({  
                        value: t[_Value],
                        label: t[_Label]
                    })
                }
                rows[idx].inputAddOn.inputDataSourceData=tempData
            });
            rows[idx].inputAddOn.inputDataSource=e.target.value;   
        }

        // console.log(rows);
        // const rows = [...rows];
        // rows[idx] = {
        //     [name]: value
        // };
        // setRows({
        //     rows
        // });
    };
    
    // loadDynamicData = (_URL) =>{
        // getData(_URL).then(res =>{
        //     let counter=1;
        //     for (const key in res.data) {
        //         tempData.push({
        //           counter:counter++,  
        //           id: res.data[key].id,
        //           city: res.data[key].city
        //         })
        //     }
        //     setData(tempData);
        // });
    // }

    const handleAddRow = async () => {
        const item = {
            inputWidth:null,     
            inputType:null, 
            inputName: null ,
            inputLabel:null,
            inputDefaultValue:null,
            inputAddOn:{
                inputRange:null,
                inputDataSource:null,    
                inputDataSourceData:null,
                inputDateRange:null,
            }
        };
       await setRows([...rows, item]);
        // console.log("Before"+rows);
        // rows.push(item);
        // console.log("After"+rows);
    };


    const handleRemoveSpecificRow = (idx) => () => {
        if(idx > 0)
        {
            rows.splice(idx, 1);
            setRows(null);
            setRows(rows);   
        }
    }

    const handldeFormShow = () => {
        setFormShow(
            formShow==true ? false : true
        )
    }

    const handleSubmit = () => {
        // console.log(rows);
        const data={
             name:'ABC',
             data:JSON.stringify(rows)
        }
        // console.log(data);
        postData(data).then(res => {
            console.log(res);
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
                                    <h2 className="mb-0 fw-bold ">Dynamic Form</h2>
                                    {/* <Link to="Country/Create/" className="btn btn-dark btn-sm btn-set-task w-sm-100">
                                        <i className="icofont-plus-circle me-2 fs-6" />
                                        Add
                                    </Link> */}
                                </div>
                            </div>


                            {/*************** TABLE ***************/}
                            <div className='card mt-2'>
                                <div className='card-body'>

                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <label><b>Template Name :</b></label>
                                        </div>
                                        <div className='col-md-4'>
                                            <input type="text" className='form-control form-control-sm' 
                                            name='template_name' id='template_name'/>
                                        </div>
                                    </div>
                                    <div className='table-responsive'>
                                    <table
                                        className="table table-bordered mt-3 table-responsive"
                                        id="tab_logic"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="text-center"> # </th>
                                                <th className="text-center"> Width </th>
                                                <th className="text-center"> Type </th>
                                                <th className="text-center"> Name </th>
                                                <th className="text-center"> Label </th>
                                                <th className="text-center"> Def. Value </th>
                                                <th className="text-center"> Add-Ons</th>
                                                <th className="text-center"> Add-Ons</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((item, idx) => (
                                                
                                                <tr id={`addr_${idx}`} key={idx}>
                                                    <td>{idx+1}</td>
                                                    <td>
                                                        <select 
                                                            name="inputWidth"
                                                            defaultValue={item.inputWidth}
                                                            onChange={handleChange(idx)}
                                                            className="form-control form-control-sm"
                                                        >
                                                            <option>Select Width</option>
                                                            <option value="col-sm-2">Very Small</option>
                                                            <option value="col-sm-4">Small</option>
                                                            <option value="col-sm-6">Medium</option>
                                                            <option value="col-sm-8">Large</option>
                                                            <option value="col-sm-10">X-Large</option>
                                                            <option value="col-sm-12">XX-Large</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select 
                                                            name="inputType"
                                                            defaultValue={item.inputType}
                                                            onChange={handleChange(idx)}
                                                            className="form-control form-control-sm"
                                                        >
                                                            <option>Select Type</option>
                                                            <option value="text">TEXT</option>
                                                            <option value="textarea">TEXTAREA</option>
                                                            <option value="number">NUMBER</option>
                                                            <option value="date">DATE</option>
                                                            <option value="select">SELECT</option>
                                                            <option value="radio">RADIO</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="inputName"
                                                            defaultValue={item.inputName}
                                                            onChange={handleChange(idx)}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="inputLabel"
                                                            defaultValue={item.inputLabel}
                                                            onChange={handleChange(idx)}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="inputDefaultValue"
                                                            defaultValue={item.inputDefaultValue}
                                                            onChange={handleChange(idx)}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </td>

                                                    <td>
                                                       {rows &&  <DynamicComponent id={idx} data={rows[idx]} onGetChange={handleChange(idx)}/> }
                                                       {/* {rows[idx].inputType==="number" && JSON.stringify(rows[idx]) } */}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={handleRemoveSpecificRow(idx)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>              
                                    <button
                                        type="button"
                                        onClick={handleAddRow}
                                        className="btn btn-sm btn-primary pull-left"
                                    >
                                        Add Row
                                    </button>
                                   
                                   {!formShow &&  
                                        <button
                                            type="button"
                                            onClick={handldeFormShow}
                                            className="btn btn-sm btn-info pull-left"
                                        > 
                                            View Form
                                        </button>    
                                    }

                                    <button
                                        type="button"
                                        onClick={handldeFormShow}
                                        className="btn btn-sm btn-danger pull-left"
                                    >
                                        Hide Form
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="pull-right btn-lg btn btn-success"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </div>
                        </div>
                        {formShow && rows &&
                            <div>
                                {
                                    rows.map((data,index)=>{
                                      
                                        if(data.inputAddOn.inputRange)
                                        {
                                            var range=data.inputAddOn.inputRange.split("|")
                                        }else if(data.inputAddOn.inputDateRange){
                                            var range=data.inputAddOn.inputDateRange.split("|")
                                        }
                                    
                                        return <div key={index} className="row">

                                                <div className={`${data.inputWidth} mt-2`} >
                                                    <label><b>{data.inputLabel} :</b></label>
                                                
                                                    {data.inputType==='text'&& 
                                                        <input
                                                            type={data.inputType}
                                                            id={data.inputName ? data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                                                            name={data.inputName}
                                                            defaultValue={data.inputDefaultValue}       
                                                            className="form-control form-control-sm"
                                                        />
                                                    }
                                                    {data.inputType==='textarea' && 
                                                        <textarea
                                                            id={data.inputName ? data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                                                            name={data.inputName}
                                                            className="form-control form-control-sm"
                                                        >{data.inputDefaultValue}</textarea>
                                                    }
                                                    {data.inputType==='date' && 
                                                        <input
                                                            type={data.inputType}
                                                            id={data.inputName ? data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                                                            name={data.inputName}
                                                            defaultValue={data.inputDefaultValue}   
                                                            min={data.inputAddOn.inputDateRange ? range[0] : ''}
                                                            max={data.inputAddOn.inputDateRange ? range[1] : ''}    
                                                            className="form-control form-control-sm"
                                                        />
                                                    }

                                                    {data.inputType==='number' &&                                          
                                                        <input
                                                            type="number"
                                                            id={data.inputName ? data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                                                            name={data.inputName}
                                                            defaultValue={data.inputDefaultValue}       
                                                            min={data.inputAddOn.inputRange ? range[0] : ''}
                                                            max={data.inputAddOn.inputRange ? range[1] : ''}
                                                            className="form-control form-control-sm"
                                                        />
                                                    }

                                                     {data.inputType==='select' &&                                          
                                                        <select
                                                            id={data.inputName ? data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                                                            name={data.inputName}
                                                            className="form-control form-control-sm"
                                                        >
                                                        <option>Select {data.inputName}</option>    
                                                            {data.inputAddOn.inputDataSourceData &&  
                                                                data.inputAddOn.inputDataSourceData.map((option,index)=>{
                                                                    return <option value={option.value}>{option.label}</option>
                                                                })
                                                                
                                                             }
                                                        </select>
                                                    }
                                                </div>
                                            </div>
                                    })
                                }



                            </div>
                        }



                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}
        </>
    )
}


export default CreateDynamicForm
