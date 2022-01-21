import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

export function ButtonComponent(props) {

    const getIcon = (type,color,size) => {
        const fontSize = size ? size : 15;
        switch (type) {
            case "Add":        
                return <i className={`icofont-plus-circle text-${color ? color : 'white'}`} style={{'marginRight':'25px'},{'fontSize':fontSize}}></i>
                break;
            case "Edit":        
                return <i className={`icofont-edit text-${color ? color : 'white'}`} style={{'marginRight':'25px'},{'fontSize':fontSize}}></i>
                break;
            case "Cancel":        
                return <i className={`icofont-arrow-left text-${color ? color : 'white'}`} style={{'marginRight':'25px'},{'fontSize':fontSize}}></i>
                break;    
            case "Delete":        
                return <i className={`icofont-ui-delete text-${color ? color : 'white'}`} style={{'marginRight':'25px'},{'fontSize':fontSize}}></i>
                break;        
            default:
                break;
        }
    }

    return (
        <>  
        { props.type==="Link" && 
            <Link to={props.url} className={`btn btn-sm btn-${props.buttonColor} text-${props.textColor}`}>
                {props.icon && getIcon(props.icon.type,props.icon.color,props.icon.size)} 
                {props.text}
            </Link>
        }
        
        { props.type==="Submit" && 
           <button to={props.url} className={`btn btn-sm btn-${props.buttonColor} text-${props.textColor}`}>
                 {props.icon && getIcon(props.icon.type,props.icon.color,props.icon.size)}    
                {props.text}
            </button>
        }
 
        { props.type==="Button" && 
           <button type="button" className={`btn btn-sm btn-${props.buttonColor} text-${props.textColor}`} 
           style={{'width':'100px'}}
           onClick={props.getClick()}
           >
                {props.icon && getIcon(props.icon.type,props.icon.color,props.icon.size)} 
                {props.text}
            </button>
        }    

        </>
    )
}

export function InputComponent(props) {
    return (
        <>  
            <input 
            type="text" 
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            minLength={props.minLength}
            maxLength={props.maxLength}
            onChange={props.getInputValue}
            required={props.required ? true : false }
            
            />
        </>
    )
}

export function EmailInputComponent(props) {
    return (
        <>  
            <input 
            type="email" 
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            minLength={props.minLength}
            maxLength={props.maxLength}
            onChange={props.getInputValue}
            required={props.required ? true : false }
            
            />
        </>
    )
}

export function PasswordComponent(props) {
    return (
        <>  
            <input 
            type="password" 
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            value={props.defaultValue}
            onChange={props.getInputValue}
            required={props.required ? true : false }
            />
        </>
    )
}

export function DateComponent(props) {
    return (
        <>  
            <input 
            type="date" 
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            defaultValue={props.defaultValue}
            readOnly={props.readOnly}
            onChange={props.getInputValue}
            min={props.min}
            max={props.max}
            required={props.required ? true : false }
            />
        </>
    )
}

export function TextareaComponent(props) {
    return (
        <>  
            <textarea 
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            onChange={props.getInputValue}
            rows="5"
            required={props.required ? true : false }
            >{props.defaultValue}</textarea>
        </>
    )
}

export function DropdownComponent(props) {
    return (
        <>  
      
            <select  
            className="form-control form-control-sm" 
            id={props.id} 
            name={props.name}
            onChange={props.getInputValue}
            >
            <option> Select {props.name} </option>    
            {props.data.map((value,index)=>{
                return <option key={index} value={value.value}>{value.label}</option>
                })
            }    
                </select>
        </>
    )
}