
export const CardConstant=[{
        id: '',
        laneId: '',
        ticketId:'',
        taskName:''
    }
]

export const CardDataGenerator=(data)=>
{
    const temp={
            id:data._id,
            laneId:data.landId,
            ticketId:data.ticketId,
            taskName:data.taskName
    }
    return temp
}


export const LandDataGenerator=(card)=>
{   
    card.map((data,index)=>{

        LaneConstant.lanes.map((lane,key)=>{

            if(lane.id===data.laneId){
                LaneConstant.lanes[key].cards.push(data);
            }
        })          
    })

}


export const LaneConstant={
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
        }
    ]
}

