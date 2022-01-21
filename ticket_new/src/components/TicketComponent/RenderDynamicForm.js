import React from 'react'

function RenderDynamicForm(props){

    if(props)
    { 
    
    if (props.data.inputAddOn.inputRange) {
        var range = props.data.inputAddOn.inputRange.split("|")
    } else if (props.data.inputAddOn.inputDateRange) {
        var range = props.data.inputAddOn.inputDateRange.split("|")
    }
    return (
        <>
            <div key={props.data.index} className={`${props.data.inputWidth} mt-2`} >
                <label><b>{props.data.inputLabel} :</b></label>

                {props.data.inputType === 'text' &&
                    <input
                        type={props.data.inputType}
                        id={props.data.inputName ? props.data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                        name={props.data.inputName}
                        defaultValue={props.data.inputDefaultValue}
                        className="form-control form-control-sm"
                        onChange={props.dynamicChangeHandle}
                    />
                }
                {props.data.inputType === 'textarea' &&
                    <textarea
                        id={props.data.inputName ? props.data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                        name={props.data.inputName}
                        className="form-control form-control-sm"
                        onChange={props.dynamicChangeHandle}
                    >{props.data.inputDefaultValue}</textarea>
                }
                {props.data.inputType === 'date' &&
                    <input
                        type={props.data.inputType}
                        id={props.data.inputName ? props.data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                        name={props.data.inputName}
                        defaultValue={props.data.inputDefaultValue}
                        onChange={props.dynamicChangeHandle}
                        min={props.data.inputAddOn.inputDateRange ? range[0] : ''}
                        max={props.data.inputAddOn.inputDateRange ? range[1] : ''}
                        className="form-control form-control-sm"
                    />
                }
                {props.data.inputType === 'number' &&
                    <input
                        type={props.data.inputType}
                        id={props.data.inputName ? props.data.inputName.replace(/ /g,"_").toLowerCase() : ''}
                        name={props.data.inputName}
                        defaultValue={props.data.inputDefaultValue}
                        onChange={props.dynamicChangeHandle}
                        min={props.data.inputAddOn.inputRange ? range[0] : ''}
                        max={props.data.inputAddOn.inputRange ? range[1] : ''}
                        className="form-control form-control-sm"
                    />
                }

                {props.data.inputType === 'select' &&
                    <select
                        id={props.data.inputName ? props.data.inputName.replace(/ /g, "_").toLowerCase() : ''}
                        name={props.data.inputName}
                        className="form-control form-control-sm"
                        onChange={props.dynamicChangeHandle}
                    >
                        <option>Select {props.data.inputName}</option>
                        {props.data.inputAddOn.inputDataSourceData &&
                            props.data.inputAddOn.inputDataSourceData.map((option, index) => {
                                if(props.data.inputDefaultValue==option.value)
                                {
                                    return <option value={option.value} selected>{option.label}</option>    
                                }else{
                                    return <option value={option.value}>{option.label}</option>
                                }

                            })

                        }
                    </select>
                }
            </div>
        </>
    )
}else{
    return <></>
}
}
export default RenderDynamicForm