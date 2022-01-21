import axios from "axios";
import {masterURL,_ErrorMsg,dataFormat} from '../../settings/constants';

const _URL=masterURL.country;

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
const headers = { 
    'Authorization': 'Bearer my-token',
    'Content-Type': 'multipart/form-data' 
};

export async function postData(payload){
    await axios.post(_URL,payload,headers)
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

export async function putData(id,payload){
    await axios.put(_URL+"/"+id,payload,{
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
    await axios.put(_URL+"/delete/"+id,payload,{
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