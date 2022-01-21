import React, { useEffect, useState } from 'react'
import Board from 'react-trello'
import Card from './Card';
import { postData } from '../../../services/TicketService/TicketTaskService';
import { getData } from '../../../services/TicketService/TicketTaskCard';

import { Button, Modal, Form, Row, Col, Select } from 'react-bootstrap';
import TaskModal from './TaskModal';
import AddCard from '../AddCard';
import { CardConstant,LaneConstant,CardDataGenerator,LandDataGenerator } from '../TaskConstans';

function TaskComponent(props) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [modalData, setModalData] = useState({cardId:null,metaData:null,laneId:null});
    const style = {
        backgroundColor: 'red',
        boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
        color: '#fff',
        width: 280
    };

    const data = LaneConstant

    const [mainData,setMainData]=useState({
        lanes: [
            {
                    id: 'toDoLane',
                    label: '90',
                    labelStyle: {
                        color: '#009688',
                        fontWeight: 'bold'
                    },
                    style: {
                        backgroundColor: 'white',
                        padding: 20
                    },
                    title: 'TO DO',
                    titleStyle: {
                        fontSize: 20,
                        marginBottom: 15
                    },
                    cards:[]
            },
            {
                id: 'teLane',
                label: '80',
                labelStyle: {
                    color: '#009688',
                    fontWeight: 'bold'
                },
                style: {
                    backgroundColor: 'white',
                    padding: 20
                },
                title: 'TO DO',
                titleStyle: {
                    fontSize: 20,
                    marginBottom: 15
                },
                cards:[]
            }
        ]
    });

    const handleClose = () =>{ 
            setShowTaskModal(false) 
    }
    const handleShow = () =>{
         setShowTaskModal(true); 
    }
    const handleCardClick = (cardId, metaData, laneId) => {
        setModalData([{cardId:cardId,metaData:metaData,laneId:laneId}])  
        console.log("Modal",modalData);
        setShowTaskModal(true);
    }

    // const components = {
    //     Card: Card,
    //     // AddCardLink: AddCard,
    // }

    const handleDataChange = (newData)=>{
        // postData(newData).then(res => {
        //         console.log(res);
        // });
    }
    const handleCard =() => {
        alert("Called")
    }
    useEffect(() => {
        var tempp=mainData;
        var test=[];
        getData().then(res=>{
            res.data.forEach((e,i)=>{
                const temp={
                        id:e._id,
                        laneId:e.laneId,
                        ticketId:e.ticketId,
                        taskName:e.taskName
                }
                test.push(temp);
           })

            test.map((data,index)=>{
                tempp.lanes.map((lane,key)=>{
                    if(lane.id===data.laneId){
                        tempp.lanes[key].cards.push(data)
                    }
                })          
            })
            setMainData(tempp);
        })
        console.log(mainData);
    },[mainData])

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
                                    <h2 className="mb-0 fw-bold ">My Task </h2>
                                </div>
                            </div>

                            {/* <Button variant="primary" onClick={handleShow}>
                                Launch demo modal
                            </Button> */}

                            {showTaskModal && <TaskModal 
                                show={showTaskModal} 
                                handleClose={handleClose} 
                                modalData={modalData}
                            /> }

                            <Board data={mainData}
                                style={{
                                    backgroundColor: 'white'
                                }}
                                editable
                                // components={components}
                                onCardClick={handleCardClick}
                                onDataChange={handleDataChange}
                                onCardAdd={handleCard}
                                // openModal={openModal}
                            />
                        </div>
                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}
        </>
    )
}

export default TaskComponent
