import React from 'react'

function RenderDynamicForm(props){

    return (
        <>
            <div className="row">
                {props.rows.map((data, index) => {
                    
                    return <div key={index} className={`${data.inputWidth} mt-2`} >
                        <label><b>{data.inputLabel} :</b></label>
                        
                        {data.inputType === 'text' &&
                            <input
                                type={data.inputType}
                                id={data.inputName}
                                name={data.inputName}
                                defaultValue={data.inputDefaultValue}
                                className="form-control form-control-sm"
                                onChange={props.dynamicChangeHandle}
                            />
                        }
                        {data.inputType === 'textarea' &&
                            <textarea
                                id={data.inputName}
                                name={data.inputName}
                                className="form-control form-control-sm"
                                onChange={props.dynamicChangeHandle}
                            >{data.inputDefaultValue}</textarea>
                        }
                        {data.inputType === 'date' &&
                            <input
                                type={data.inputType}
                                id={data.inputName}
                                name={data.inputName}
                                defaultValue={data.inputDefaultValue}
                                onChange={props.dynamicChangeHandle}
                                className="form-control form-control-sm"
                            />
                        }
                        {data.inputType === 'number' &&
                            <input
                                type="text"
                                id={data.inputName}
                                name={data.inputName}
                                defaultValue={data}
                                onChange={props.dynamicChangeHandle}
                                min={2}
                                max={10}
                                className="form-control form-control-sm"
                            />
                        }

                    </div>
                })
                }
            </div>
        
        </>
    )
}
export default RenderDynamicForm