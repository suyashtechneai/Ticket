import React,{useEffect,useState} from 'react'

function Alert(props) {
    
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
          setShow(false)
        }, 3000)
        return () => {
          clearTimeout(timeId)
        }
      }, []);

      if (!show) {
        return null;
      } 
    return (
        <>
            <div className={`alert alert-${props.type}`} role="alert">
                 {props.message}
            </div>  
        </>
    )
}

export default Alert
