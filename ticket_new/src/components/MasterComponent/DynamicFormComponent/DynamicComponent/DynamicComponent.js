import React from 'react'

function DynamicComponent(props) {
    // console.log(props);
   if(props)
   {
        if(props.data.inputAddOn.inputRange!==null)
        {
            var range=props.data.inputAddOn.inputRange.split("|")
        }else if(props.data.inputAddOn.inputDateRange){
            var range=props.data.inputAddOn.inputDateRange.split("|")
        }
    return (
        <>
        {props.data.inputType==="number" &&
            <span>
            <input
            type="text"
            placeholder='Eg. 0|100'
            className="form-control form-control-sm"
            onChange={props.onGetChange}
            id="inputRange"
            name="inputRange"
            min={props.data.inputAddOn.inputRange ? range[0] : ''}
            max={props.data.inputAddOn.inputRange ? range[1] : ''}
            />
            <small style={{'color':'red'}}><b>Min|Max(Range)</b></small>
            </span>   
        }   

        {props.data.inputType==="select" &&
            <span>
                <select class="form-control form-control-sm" 
                onChange={props.onGetChange}
                id="inputDataSource"
                name="inputDataSource"
                >
                    <option>Select Data Source</option>
                    <option value="user|id|name">User Master</option>
                    <option value="department|id|department">Department Master</option>
                    <option value="role|id|role">Role Master</option>
                </select>
                <small style={{'color':'red'}}><b>Select Data Source</b></small> 
            </span>
        }
        
        {props.data.inputType==="date" &&
            <span>
                <input
                    type="text"
                    onChange={props.onGetChange}
                    id="inputDateRange"
                    name="inputDateRange"
                    placeholder='Eg. 2022-01-01|2022-02-01'
                    className="form-control form-control-sm"
                    min={props.data.inputAddOn.inputDateRange ? range[0] : ''}
                    max={props.data.inputAddOn.inputDateRange ? range[1] : ''}
                />
                <small style={{'color':'red'}}><b>Min|Max (YYYY-MM-DD)</b></small>
            </span>   
        }        

        {/* {props.inputType==="radio" &&
            <span>
            <input
            type="text"
            // id={props.inputAddOn} name={props.inputAddOn}
            placeholder='Eg. 1:True|0:False'
            className="form-control form-control-sm"
            />
            <small style={{'color':'red'}}><b>Actual_value|Display Value</b></small>
            </span>   
        } */}
        </>
    )
   }else{
       return <></>
   }
}

export default DynamicComponent
