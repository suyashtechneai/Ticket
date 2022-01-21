import React, { useEffect, useState } from 'react'
import Board from 'react-trello'
import AddCardLink from './components/AddCardLink';
import Card from './components/Card';
import NewCardFormMy from './components/NewCardFormMy'
import { Button, Modal, Form, Row, Col, Select } from 'react-bootstrap';
import TaskModal from './TaskModal';

import {getDataUsingParam,postData as addTask,putData} from '../../../services/TicketService/TicketTaskCard'

function TaskComponent(props) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [modalData, setModalData] = useState({cardId:null,metaData:null,laneId:null});
    const style = {
        backgroundColor: 'white',
        // boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
        color: '#484C7F',
        width: 340
    };

    const cardStyle1 = { 
        marginTop:'10px',
        // height:'100px',
        backgroundColor: '#484C7F',
        color:'#fff' ,
        textWeight:'bold',
        fontSize:'14px'
        }; 
    const cardStyle2 = { 
            marginTop:'10px',
            // height:'100px',
            backgroundColor: '#484C8F',
            color:'#fff' ,
            textWeight:'bold',
            fontSize:'14px'
            };    
    const cardStyle3 = { 
        marginTop:'10px',
        // height:'100px',
        backgroundColor: '#484C8F',
        color:'#fff' ,
        textWeight:'bold',
        fontSize:'14px'
        };    
        
    const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'TO DO',
            // label: '2/2',
            style: style, 
            cardStyle:cardStyle1,
            cards: []
          },
          {
            id: 'lane2',
            title: 'WIP',
            // label: '0/0',
            style: style, 
            cardStyle:cardStyle2,
            cards: []
          },
          {
            id: 'lane3',
            title: 'Completed',
            // label: '0/0',
            style: style, 
            cardStyle:cardStyle3,
            cards: []
          }
        ]
      }
      const [mainData,setMainData]=useState(null);
      const components={
        AddCardLink: AddCardLink,
        Card: Card,
        NewCardForm:NewCardFormMy
      }
      const url=window.location.href.split('Task/');

      const handleAddCard =(card, laneId) =>{
            var temp=card;
            var cardIndex=0;

            mainData.lanes.map((data,index)=>{
                if(data.id===laneId){
                    cardIndex=data.cards.length;
                }
            })
            temp={...temp,'laneId':laneId ,ticketId:url[1],'index':cardIndex}
            //  console.log(temp);
            addTask(temp).then(res => {
            
            })
                mainData.lanes.forEach((laneData,index)=>
                {
                    if(laneId==laneData.id)
                    {
                        laneData.cards.push(temp);
                    }
                })
            setMainData(mainData);
            console.log(mainData)
      }

      const handleCardClick = (cardId, metaData, laneId) => {
        setModalData([{cardId:cardId,metaData:metaData,laneId:laneId}])  
        // console.log("Modal",modalData);
        setShowTaskModal(true);
        }
        const handleClose = () =>{ 
            setShowTaskModal(false) 
        }
        const handleShow = () =>{
            setShowTaskModal(true); 
        }
        const setEventBus = (handle) => {
            // eventBus = handle
            // console.log(handle);
        }
        const cardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) =>{
            // console.log(fromLaneId, toLaneId, cardId, index);
            var update={laneId:toLaneId,index:index}
            // putData(cardId,update).then(res=>{
            //     console.log(res);
            // })
        }
        const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
            console.log(cardId, sourceLaneId, targetLaneId, position, cardDetails);
            
            var update={laneId:targetLaneId,index:position}

                // const data=mainData;
                mainData.lanes.forEach((cardData,index)=>
                {
                    // console.log(cardData.id);
                    if(cardData.id===targetLaneId)
                    {
                        var arr=cardData.cards
                        // Position where from the element is  going to move here 'python' is moved 
                         var x = cardDetails.index; 
                         // Position at which element is to be moved
                         var pos = position; 
                         // Store the moved element in a temp 
                         // variable
                         var temp = cardData.cards[x]; 
                         // shift elements forward 
                         var i;
                         for (i = x; i >= pos; i--){
                                arr[i] = arr[i - 1]; 
                                    
                         }  
                         // Insert moved element at position  
                         arr[position] = temp; 
                         for (i=0 ; i<arr.length;i++){
                             arr[i].index=i
                         }

                        // var temp=[];
                        // cardData.cards.forEach((card,index)=>{
                        //     if(card.id==cardId){

                        //     }
                        //     // console.log(card,cardId);
                        // })
                        
                        // for (var i = cardData.cards.length-1 ; i >= 0 ; i--) {
                        //        // console.log(i,cardData.cards[i]);
                        //         // cardData.cards.push(cardData.cards[i])
                        //         temp.push(cardData.cards[])
                        // } 

                        // setMainData((prevState)=>{
                        //     mainData.
                        // })
                    }
                    
                })   
            // putData(cardId,update).then(res=>{
            //     // console.log(res);

            // })
        }

        const dataChange = (newData) =>{
          
        }

        //   eventBus.publish({type: 'ADD_CARD', laneId: 'COMPLETED', card: {id: "M1", title: "Buy Milk", label: "15 mins", description: "Also set reminder"}})



        useEffect(()=>{
            getDataUsingParam(url[1]).then(res =>{
                // console.log(res);
                // console.log("BEFORE",res.data);
                res.data.sort((a, b) => (a.index > b.index) ? 1 : -1)
                // console.log("After",res.data);

                res.data.forEach((cardData,index)=>{
                    data.lanes.forEach((laneData,index)=>
                    {
                        if(cardData.laneId==laneData.id)
                        {
                            laneData.cards.push(cardData);
                        }
                    })   
                })
                setMainData(data);
            })
        },[]);

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

                            {showTaskModal && <TaskModal 
                                show={showTaskModal} 
                                handleClose={handleClose} 
                                modalData={modalData}
                            /> }


                        {mainData &&
                            <Board data={mainData}
                                style={{
                                    backgroundColor: 'white'
                                }}
                                editable
                                components={components} 
                                onCardAdd={handleAddCard}
                                onCardClick={handleCardClick}
                                eventBusHandle={setEventBus}
                                // handleDragEnd={handleDragEnd}
                                onCardMoveAcrossLanes={cardMoveAcrossLanes}
                                onDataChange={dataChange}
                                handleDragEnd={handleDragEnd}
                            />
                            
                            }

                        </div>
                    </div> {/*ROW*/}
                </div>{/*CONTAINER*/}
            </div>{/*BODY*/}
        </>
    )
}

export default TaskComponent
