const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../db/conn');

Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_modules", (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                res.send(rows);
            }else{
                return res.status(400).send({
                    message: "No record found",
                    status: 0
                });
            }            
        }else{
            console.log(err);
        }
    })
});

Router.get('/:name' , (req, res) => {
    mysqlConnection.query("SELECT * FROM tai_modules WHERE module_name LIKE '%"+[req.params.name]+"%'", (err, rows, fields) => {
        if (!err){
            if(rows.length > 0){
                res.send(rows);               
            }else{
                return res.status(400).send({
                    message: "No record found",
                    status: 0
                });
            }  
        }
        else{
            console.log(err);
        }
    })
});

module.exports = Router;