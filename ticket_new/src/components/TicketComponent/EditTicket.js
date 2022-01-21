import React, {useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getDataUsingParam,putData } from "../../services/TicketService/TicketService";
import { getDataUsingParam as mongoGetDataUsingParam,putData as mongoPutData } from "../../services/TicketService/TicketMongoService";
import { getDataUsingParam as DynamicForm } from '../../services/MastersService/DynamicFormService';  //Dynamic Form

import { ButtonComponent, DateComponent, InputComponent, TextareaComponent,DropdownComponent } from '../Utilities/Button/Button'
import {UserDropdown} from '../MasterComponent/UserComponent/UserComponent'
import {StatusDropdown} from '../MasterComponent/StatusComponent/StatusComponent'
import {DepartmentDropdown} from '../MasterComponent/DepartmentComponent/DepartmentComponent'
import {getFormattedDate} from '../Utilities/Functions'
import { Astrick } from '../Utilities/Style';
import *  as Validation from '../Utilities/Validation';
import RenderDynamicForm from './RenderDynamicForm';

function EditTicket({match}) {
    const history = useHistory();
    const [ticketData, setTicketData] = useState({id:null,object_id:null,ticket_date:null,assign_to_user_id:null,type_id:null,priority:null,status_id:null,assign_to_department_id:null,
        description:null,expected_solve_date:null});
    const [dynamicTicketData, setDynamicTicketData]=useState(null);
    const [rows,setRows]=useState(null);


    const getData = (id) => {
        const tempData=[];

        getDataUsingParam(id).then(res =>{

            const objectId=res.data[0].object_id;
            setTicketData({
                id:res.data[0].id,
                object_id:res.data[0].object_id,
                ticket_id: res.data[0].ticket_id,
                ticket_date: getFormattedDate(res.data[0].ticket_date,'yyyy-mm-dd','-'),
                expected_solve_date:getFormattedDate(res.data[0].expected_solve_date,'yyyy-mm-dd','-'),
                assign_to_user_id:res.data[0].assign_to_user_id,
                assign_to_department_id:res.data[0].assign_to_department_id,
                type_id:res.data[0].type_id,
                priority:res.data[0].priority,
                status_id:res.data[0].status_id,
                description:res.data[0].description,
            });

            // DynamicForm(9).then(res =>{
            //    const dynamicData=JSON.parse(res.data[0].data)
            //     setRows(dynamicData)
            // });
            // if(rows){
            //     alert("Form set");
            // }
            // mongoGetDataUsingParam(objectId).then(res=>{
            //     if(res.data)
            //     {
            //         rows.forEach(index => {
            //             if(res.data[index['inputName']]){
            //                     index['inputDefaultValue']=res.data[index['inputName']];
            //             }
            //         });
            //         if(rows){
            //             alert("Form Value set");
            //         }
            //         setRows(rows);
            //     }
            // });

        });
    }

    const getDynamicValue = () =>{

        mongoGetDataUsingParam(ticketData.object_id).then(res=>{
            if(res.data)
            {
                rows.forEach(index => {
                    if(res.data[index['inputName']]){
                        index['inputDefaultValue']=res.data[index['inputName']];
                    }
                });
                setRows(rows);
            }
        });   
    }

    const getDynamicData = () =>{
       
        DynamicForm(9).then(res =>{
            const dynamicData=JSON.parse(res.data[0].data)
             setRows(dynamicData)
         });

    }

    const changeHandler =(e)=>{    
        const {name,value}=e.target;
        setTicketData({
            ...ticketData,
            [name]: value,
        });
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
      
        putData(match.params.id,ticketData).then(res=>{
            var returnValue={show:true,type:"danger",message:res.message};
            if(res.status==1){
               
                mongoPutData(ticketData.object_id,dynamicTicketData).then(resp=>{
                    if(resp.status==1){
                        returnValue.type="success";
                    }
                });       
            }
            history.push({
                pathname: '/Ticket',
                state: { showAlert : true, alertData:returnValue }
            });
        });       
    }

    const dynamicChangeHandle=(e)=>{
        const {name,value}=e.target;
        setDynamicTicketData((prev) => ({ ...prev, [name]: value }));
    }
    useEffect(() => {
        getData(match.params.id);
        getDynamicData();
        getDynamicValue();
        
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
                                    <h2 className="mb-0 fw-bold ">Edit Ticket</h2>
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
                                                defaultValue={ticketData.expected_solve_date}
                                                min={ticketData.expected_solve_date}
                                                />
                                            </div>
                                            
                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Assign to User :<Astrick color='red'/></b>
                                            </label>
                                                <UserDropdown id="assign_to_user_id" name="assign_to_user_id" 
                                                defaultValue={ticketData.assign_to_user_id}
                                                getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Assign to Department :<Astrick color='red'/></b>
                                            </label>
                                                <DepartmentDropdown id="assign_to_department_id" name="assign_to_department_id" 
                                                defaultValue={ticketData.assign_to_department_id}
                                                getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className="col-form-label">
                                                <b>Type :<Astrick color='red'/></b>
                                            </label>
                                               <select className="form-control form-control-sm" id="type_id" name="type_id" onChange={changeHandler}>
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
                                               <select className="form-control form-control-sm" id="priority" name="priority" onChange={changeHandler}>
                                                    <option>Select Priority</option>
                                                    <option value="Low">Low</option>
                                                    <option value="High">High</option>
                                                    <option value="Very High">Very High</option>
                                               </select>
                                            </div>


                                            <div className="col-sm-4 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Status :<Astrick color='red'/></b>
                                            </label>
                                                <StatusDropdown id="status_id" name="status_id" 
                                                defaultValue={ticketData.status_id}
                                                getChangeValue={changeHandler}/>
                                            </div>

                                            <div className="col-sm-12 mt-3">
                                            <label htmlFor="" className=" col-form-label">
                                                <b>Description :<Astrick color='red'/></b>
                                            </label>
                                                <TextareaComponent
                                                    id="description"
                                                    name="description"
                                                    onChange={changeHandler}
                                                    defaultValue={ticketData.description}
                                                />
                                            </div>
                                        </div>  


                         {/* n           {rows && <RenderDynamicForm rows={rows} dynamicChangeHandle={dynamicChangeHandle} />} */}
                         {rows && <div className="row">
                                            {rows.map((data, index) => {
                                                return  <RenderDynamicForm data={data} key={index} dynamicChangeHandle={dynamicChangeHandle} />
                                              })
                                            }
                                            </div>
                                        }
                                
                                    <div className="mt-3" style={{'textAlign':'right'}}>
                                
                                        <ButtonComponent type="Submit" buttonColor="primary" textColor="white" text="Update" 
                                        icon={{type:"Edit",color:"white"}}
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

export default EditTicket
