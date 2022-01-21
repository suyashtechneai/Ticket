const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../db/conn');

/**
 * @swagger
 * /session:
 *  get: 
 *      description: Get all role masters
 *      tags: 
 *          - Session
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_session", (err, rows, fields)=>{
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

/**
 * @swagger
 * /session:
 *  post: 
 *      description: Get all role masters
 *      tags:
 *          - Session
 *      responses:
 *          200:
 *              description: 'Data Inserted Successfully!'
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.subject != ''){
        mysqlConnection.query("INSERT INTO tai_session SET ?;",postData, (err, rows, fields)=>{
            if(!err){
                return res.status(200).send({
                    message: 'Data Inserted Successfully!',
                    status: '1'
                });
            }else{
                return res.status(500).send({
                    message: 'Data Not Inserted',
                    status: '0'
                });
                console.log(err);
            }
        })
    }else{
        return res.status(500).send({
            message: 'All fields are required',
            status: '0'
        });
    }
});

/**
 * @swagger
 * /session/{id}:
 *  post: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Session
 *      responses:
 *          200:
 *              description: Success
 */
Router.post('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_session WHERE id = ?',[req.params.id], (err, rows, fields) => {
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

/**
 * @swagger
 * /session/{id}:
 *  put: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Session
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_session WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_session SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
                if (!err){
                    return res.status(200).send({
                        message: "Data Updated Successfully!",
                        status: 1
                    });
                    res.send('');
                }else{
                    console.log(err);
                }
            })
        }else{
            return res.status(400).send({
                message: "No such record found to update"
            });
        }
    })
});
/**
 * @swagger
 * /session/{id}:
 *  delete: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Session
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM tai_session WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err){
            return res.status(200).send({
                message: "Data Deleted Successfully!",
                status: 1
            });
        }else{
            return res.status(400).send({
                message: "Data Not Deleted ",
                status: 0
            });
        }  
    })
});

module.exports = Router;