import React,{useState} from 'react'
import { Button, Modal, Form, Row, Col, Select } from 'react-bootstrap';

function TaskModal(props) {

    const [form,setForm]=useState({cardId:props.cardId,metaData:props.metaData,laneId:props.laneId,task_name:null,task_category:null,start_date:null,end_date:null,priority:null,description:null});

    const submitHandler = (e) => {
        e.preventDefault();
        console.log()
    }
    
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        console.log(form);
    }

    return (
        <>
        <Modal  size="md" show={props.show} onHide={props.handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
            {/* <Modal.Title>Task</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{padding:'10px'}}>
                    {props.modalData[0].cardId}
            <Form>
    
            <div className="mb-3">
                <label  className="form-label">Task</label>
                <input type="text" className="form-select" id="task_name" name="task_name" onChange={changeHandler}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Task Category</label>
                <select className="form-select" id="task_category" id="task_category" onChange={changeHandler}>
                <option>UI/UX Design</option>
                <option value={1}>Website Design</option>
                <option value={2}>App Development</option>
                <option value={3}>Quality Assurance</option>
                <option value={4}>Development</option>
                <option value={5}>Backend Development</option>
                <option value={6}>Software Testing</option>
                <option value={7}>Website Design</option>
                <option value={8}>Marketing</option>
                <option value={9}>SEO</option>
                <option value={10}>Other</option>
                </select>
            </div>

            {/* <div className="mb-3">
                <label htmlFor="formFileMultipleone" className="form-label">Task Images &amp; Document</label>
                <input className="form-control" type="file" id="formFileMultipleone" multiple />
            </div> */}

            <div className="deadline-form mb-3">
                
                <div className="row">
                    <div className="col">
                    <label htmlFor="datepickerded" className="form-label">Task Start Date</label>
                    <input type="date" className="form-control" id="start_date" name="start_date" onChange={changeHandler}/>
                    </div>
                    <div className="col">
                    <label htmlFor="datepickerdedone" className="form-label">Task End Date</label>
                    <input type="date" className="form-control" id="end_date" name="end_date" onChange={changeHandler}/>
                    </div>
                </div>
                
            </div>
    

            <div className="row g-3 mb-3">
                <div className="col-sm">
                <label className="form-label">Task Priority</label>
                <select className="form-select" id="priority" name="priority" onChange={changeHandler}>
                    <option>Highest</option>
                    <option value={1}>Medium</option>
                    <option value={2}>Low</option>
                    <option value={3}>Lowest</option>
                </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description (optional)</label>
                <textarea className="form-control" id="description" name="description" rows={3}  defaultValue={""} onChange={changeHandler}/>
            </div>

    
            </Form>




        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="success text-white" onClick={props.handleClose}>
                Done
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default TaskModal
