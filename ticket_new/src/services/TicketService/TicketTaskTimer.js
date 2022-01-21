import axios from "axios";
import {ticketTaskTimeUrl,_ErrorMsg,dataFormat} from '../../settings/constants';

const _URL=ticketTaskTimeUrl;

export async function getData(){
    await axios.get(_URL)
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
    await axios.post(_URL,config,{
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
    await axios.get(_URL+"/"+id)
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
    await axios.put(_URL+"/"+id,config,{
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