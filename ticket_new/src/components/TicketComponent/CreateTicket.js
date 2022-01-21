import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonComponent, DateComponent, InputComponent, TextareaComponent,DropdownComponent } from '../Utilities/Button/Button'

import { postData,putData} from "../../services/TicketService/TicketService"; 
import { postData as mongoDB} from "../../services/TicketService/TicketMongoService";  //MONGo
import { getDataUsingParam } from '../../services/MastersService/DynamicFormService';  //Dynamic Form

import {getCurrentDate} from "../Utilities/Functions"
import {UserDropdown} from '../MasterComponent/UserComponent/UserComponent'
import {StatusDropdown} from '../MasterComponent/StatusComponent/StatusComponent'
import {DepartmentDropdown} from '../MasterComponent/DepartmentComponent/DepartmentComponent'

import *  as Validation from '../Utilities/Validation';
import { Astrick } from '../Utilities/Style';
import RenderDynamicForm from './RenderDynamicForm';


function CreateTicket(){

    const history = useHistory();
    const currentDate=getCurrentDate();
    const [ticketData, setTicketData] = useState({  ticket_date:currentDate,
                                                    assign_to_user_id:null,
                                                    type_id:null,
                                                    priority:null,
                                                    status_id:null,
                                                    assign_to_department_id:null,
                                                    description:null,
                                                    expected_solve_date:null});

    const [dynamicTicketData, setDynamicTicketData]=useState(null);

    const priority=["Low","Medium","High"];

    const changeHandler = (e) => {
        const { name, value } = e.target;
        // alert(e.target.value);
        setTicketData({
            ...ticketData,
            [name]: value,
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        postData(ticketData).then(res => {
            var returnValue = { show: true, type: "danger", message: res.message };
            const lastInsertedId=res.data["insertId"];
            if (res.status == 1) {
            
                setDynamicTicketData({ ...dynamicTicketData, 'ticket_id': lastInsertedId });

                 mongoDB(dynamicTicketData).then(resp => {
                    
                    const temp={object_id:resp.data[0]._id}

                    putData(lastInsertedId,temp).then(response=>{    
                        if(response.status==1){
                            returnValue.type="success";
                        }
                    });       
                });
            }
            // history.push({
            //     pathname: '/Ticket',
            //     state: { showAlert: true, alertData: returnValue }
            // });
        });
    }

    const [rows,setRows]=useState(null);

    const getData=()=>{
        getDataUsingParam(9).then(res =>{
            const data=JSON.parse(res.data[0].data)      
            setRows(data)
        });
    }   

    const dynamicChangeHandle=(e)=>{
        const {name,value}=e.target;
        setDynamicTicketData((prev) => ({ ...prev, [name]: value }));
    }
    useEffect(() => {
        getData();    
        
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
                                    <h2 className="mb-0 fw-bold ">Add Ticket</h2>
                                </div>
                            </div>
                            {/*************** TABLE ***************/}
                            <div className='card mt-2'>
                                <div className='card-body'>

                                    <form onSubmit={submitHandler}>

                                        <div className="form-group row ">
                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Ticket Date :<Astrick color='red'/></b>
                                            </label>
                                                <DateComponent id="ticket_date" name="ticket_date" 
                                                defaultValue={ticketData.ticket_date} 
                                                readOnly={true} />
                                            </div>

                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Expected Solve Date :<Astrick color='red'/></b>
                                            </label>
                                                <DateComponent id="expected_solve_date" name="expected_solve_date" 
                                                defaultValue={ticketData.ticket_date}
                                                min={ticketData.ticket_date}
                                                />
                                            </div>
                                            
                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Assign to User :<Astrick color='red'/></b>
                                            </label>
                                                <UserDropdown id="assign_to_user_id" name="assign_to_user_id" required='true' getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Assign to Department :<Astrick color='red'/></b>
                                            </label>
                                                <DepartmentDropdown id="assign_to_department_id" name="assign_to_department_id" required getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-4 mt-3">
                                                <label htmlFor="" className="col-form-label">
                                                    <b>Ticket Type :<Astrick color='red'/></b>
                                                </label>
                                               <select className="form-control form-control-sm" id="type_id" name="type_id" required onChange={changeHandler}>
                                                    <option>Select Type</option>
                                                    <option value="New">New</option>
                                                    <option value="Change">Change</option>
                                                    <option value="Bug">Bug</option>
                                                    <option value="Error">Error</option>
                                               </select>
                                            </div>
                                        
                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Priority :<Astrick color='red'/></b>
                                            </label>
                                               <select className="form-control form-control-sm" id="priority" name="priority" required onChange={changeHandler}>
                                                    <option>Select Priority</option>
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="High">High</option>
                                               </select>
                                            </div>


                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Status :<Astrick color='red'/></b>
                                            </label>
                                                <StatusDropdown id="status_id" name="status_id" required getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-12 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Description :<Astrick color='red'/></b>
                                            </label>
                                                <TextareaComponent
                                                    id="description"
                                                    name="description"
                                                    required
                                                    getInputValue={changeHandler}
                                                />
                                            </div>
                                        </div>


                                        {rows && <div className="row">
                                            {rows.map((data, index) => {
                                                return  <RenderDynamicForm data={data} key={index} dynamicChangeHandle={dynamicChangeHandle} />
                                              })
                                            }
                                            </div>
                                        }

                                        <div className="mt-3">
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Create" 
                                        icon={{type:"Add",color:"white"}}
                                        />
                                        <ButtonComponent type="Link" url="/Ticket" buttonColor="danger" textColor="white" text="Cancel" 
                                        icon={{type:"Cancel",color:"white",size:"20px"}}/>

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

export default CreateTicket 
