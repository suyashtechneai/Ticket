import axios from "axios";
import {masterURL,_ErrorMsg,dataFormat} from '../../settings/constants';


export async function getData(){
    await axios.get(masterURL.city)
    .then(response => {
        if(response.data){
            dataFormat.status=response.data.status;
            dataFormat.message=response.data.message;
            dataFormat.data=response.data.data;
        }
    })
    .catch(error => {
       dataFormat.status=202;
       dataFormat.message=_ErrorMsg;
       dataFormat.data=null;
    })
    return dataFormat;
}

export async function postData(config){
    await axios.post(masterURL.city,config,{
        'Content-Type':"application/json"
    })
    .then(response => {
        if(response.data){
            dataFormat.status=response.data.status;
            dataFormat.message=response.data.message;
            dataFormat.data=response.data.data;
        }
    })
    .catch(error => {
        dataFormat.status=202;
        dataFormat.message=_ErrorMsg;
        dataFormat.data=null;
    })
    return dataFormat;
}

export async function getDataUsingParam(id){
    await axios.get(masterURL.city+"/"+id)
    .then(response => {
        if(response.data){
            dataFormat.status=response.data.status;
            dataFormat.message=response.data.message;
            dataFormat.data=response.data.data;
        }
    })
    .catch(error => {
        dataFormat.status=202;
        dataFormat.message=_ErrorMsg;
        dataFormat.data=null;
    })
    return dataFormat;
}

export async function putData(id,config){
    await axios.put(masterURL.city+"/"+id,config,{
        'Content-Type':"application/json"
    })
    .then(response => {
        if(response.data){
            dataFormat.status=response.data.status;
            dataFormat.message=response.data.message;
            dataFormat.data=response.data.data;
        }
    })
    .catch(error => {
        dataFormat.status=202;
        dataFormat.message=_ErrorMsg;
        dataFormat.data=null;
    })
    return dataFormat;
}

export async function putDeleteData(id,payload){
    await axios.put(masterURL.city+"/delete/"+id,payload,{
        'Content-Type':"application/json"
    })
    .then(response => {
        if(response.data){
            dataFormat.status=response.data.status;
            dataFormat.message=response.data.message;
            dataFormat.data=response.data.data;
        }
    })
    .catch(error => {
        dataFormat.status=202;
        dataFormat.message=_ErrorMsg;
        dataFormat.data=null;
    })
    return dataFormat;
}