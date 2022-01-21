const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../db/conn');

/**
 * @swagger
 * /menurolemapping:
 *  get: 
 *      description: Get all Menu Role Mapping
 *      tags: 
 *          - Menu Role Mapping
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_menu_role_mapping", (err, rows, fields)=>{
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
 * /menurolemapping:
 *  post: 
 *      description: Post all Menu Role Mapping
 *      tags:
 *          - Menu Role Mapping
 *      responses:
 *          200:
 *              description: 'Data Inserted Successfully!'
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.subject != ''){
        mysqlConnection.query("INSERT INTO tai_menu_role_mapping SET ?;",postData, (err, rows, fields)=>{
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
 * /menurolemapping/{id}:
 *  post: 
 *      description: Post Menu Role Mapping
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Menu Role Mapping
 *      responses:
 *          200:
 *              description: Success
 */
Router.post('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_menu_role_mapping WHERE id = ?',[req.params.id], (err, rows, fields) => {
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
 * /menurolemapping/{id}:
 *  put: 
 *      description: Get Menu Role Mapping
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Menu Role Mapping
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_menu_role_mapping WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_menu_role_mapping SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
 * /menurolemapping/{id}:
 *  delete: 
 *      description: Get Menu Role Mapping
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Menu Role Mapping
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM tai_menu_role_mapping WHERE id = ?", [req.params.id], (err, rows, fields) => {
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