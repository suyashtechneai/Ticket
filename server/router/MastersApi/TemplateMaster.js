const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');

/**
 * @swagger
 * /designationmaster:
 *  get: 
 *      description: Get all Designation Master
 *      tags: 
 *          - Designation Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_template_master ", (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                return res.json({
                    message: "Record found",
                    status: 0,
                    data: rows
                });
            }else{
                return res.json({
                    message: "No record found",
                    status: 0,
                    data: null
                });
            }               
        }else{
            console.log(err);
        }
    })
});

/**
 * @swagger
 * /designationmaster:
 *  post: 
 *      description: Post all Designation Master
 *      parameters:
 *          - in: path
 *            name: designation
 *      tags:
 *          - Designation Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.post("/", (req, res)=>{
    var postData = req.body;    
    if(postData.templete_name != ''){
        mysqlConnection.query("SELECT * FROM tai_template_master  WHERE templete_name = ?",postData.templete_name, (err, rows, fields)=>{
            if(rows.length == 0 && !err){
               mysqlConnection.query("INSERT INTO tai_template_master  SET ?;",postData, (err, rows, fields)=>{
                    if(!err){
                        return res.json({
                            message: "Data Inserted Successfully!",
                            status: 0,
                            data: null
                        });
                    }else{
                        return res.json({
                            message: 'Data Not Inserted',
                            status: '0',
                            data: null
                        });
                }
               })
            }else{
                return res.json({
                    message: 'Data already exist',
                    status: '0',
                    data: null
                });
            }
        })      
    }else{
        return res.json({
            message: 'All fields are required',
            status: '0',
            data: null
        });
    }
});

/**
 * @swagger
 * /designationmaster/{id}:
 *  post: 
 *      description: Post Designation Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Designation Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.post('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_template_master  WHERE id = ?',[req.params.id], (err, rows, fields) => {
        if (!err){
            if(rows.length > 0){
                return res.json({
                    message: "Record found",
                    status: 0,
                    data: rows
                });             
            }else{
                return res.json({
                    message: "No record found",
                    status: 0,
                    data: null
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
 * /designationmaster/{id}:
 *  put: 
 *      description: Update Designation Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Designation Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_template_master  WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_template_master  SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
                if (!err){
                    return res.json({
                        message: "Data Updated Successfully!",
                        status: 1,
                        data: null
                    });
                }else{
                    return res.json({
                        message: 'Data Not Inserted',
                        status: '0',
                        data: null
                    });
                }
            })
        }else{
            return res.json({
                message: "No such record found to update",
                status: '0',
                data: null
            });
        }
    })
});

/**
 * @swagger
 * /designationmaster/{id}:
 *  delete: 
 *      description: Delete Designation Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Designation Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM tai_template_master  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err){
            return res.json({
                message: "Data Deleted Successfully!",
                status: 1,
                data: null
            });
        }else{
            return res.json({
                message: "Data Not Deleted ",
                status: 0,
                data: null
            });
        }  
    })
});

module.exports = Router;