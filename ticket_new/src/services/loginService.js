import axios from "axios";
import {loginURL,_ErrorMsg} from "../settings/constants";

var data = {
    status:0,
    message:null,
    data:null
}

export function getData(config,callback, errorcallback){
}

export async function postData(config){
    await axios.post(loginURL,config)
    .then(response => {
        if(response.data){
            data.status=response.data.status;
            data.message=response.data.message;
            data.data=response.data.data;
        }
    })
    .catch(error => {
        console.log("Error",error);
       data.status=202;
       data.message=_ErrorMsg;
       data.data=null;
    })
    return data;
}

