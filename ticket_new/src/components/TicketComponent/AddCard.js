import React,{useEffect, useState} from 'react'
import {FloatingLabel,Form} from 'react-bootstrap'
import {postData} from '../../services/TicketService/TicketTaskCard'
import {CardConstant} from './TaskConstans'

function AddCard({onAdd,laneId}) {

    const url=window.location.href.split('Task/');

    const [newTask,setNewTask]=useState({
        ticketId:url[1],
        laneId:laneId,
        taskName:''
        });

    const updateField = (e) => {
        const {name,value}=e.target;
        setNewTask((prevState)=>{
            return {...prevState,[name]:value}
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        postData(newTask).then(res => {
            
        })
    }   
    return (
        <>
        <div className="card bg-primary p-0">
            <div className='card-body p-2'>
                <div className="card-header text-white">
                    Add Task
                </div>
                
                {/* <form onSubmit={submitHandler}> */}

                <div className='form-group'>
                    <input type="text" className='form-control form-control-sm' placeholder='Enter Task Name'
                    name="taskName"
                    onChange={updateField}/>
                </div>

                {/* <div className='form-group mt-2'>
                <input type="date" className='form-control form-control-sm' placeholder='Enter Task Name'
                name="end_date"
                onChange={updateField}
                />
                </div> */}

                <button type="button" className='btn btn-sm btn-success text-white mt-2' onClick={onAdd}>Add</button>
                {/* </form> */}
            </div>
        </div>
        </>
    )
}

export default AddCard
    