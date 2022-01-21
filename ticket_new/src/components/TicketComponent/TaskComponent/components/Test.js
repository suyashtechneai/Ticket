import React from 'react'

function Test(props) {

    const handleTest=e=>{
        e.preventDefault();
        props.onHandleStart(props.cardId,e.target.name);
    }

    return (
        <>
          {props.show=="Start" &&
          <div className='d-flex justify-content-right'>
            <button type="button" className='btn btn-sm btn-success text-white mt-2 pt-0 pb-0 m-0' 
            name="Start"
            style={{height:'25px'}}
            onClick={handleTest}
             >
            Start
          </button>
          </div>
            }
             {props.show=="Stop" &&  
             <div className='d-flex justify-content-end'>
             <button type="button" className='btn btn-sm btn-danger text-white mt-2 pt-0 pb-0 m-0' 
             name="Stop"
            style={{height:'25px'}}
            onClick={handleTest}
             >
            Stop
          </button>
          </div>
            }
        </>
    )
}

export default Test
