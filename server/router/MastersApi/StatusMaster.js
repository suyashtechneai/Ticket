const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');

/**
 * @swagger
 * /statusmaster:
 *  get: 
 *      description: Get all role masters
 *      tags: 
 *          - Status Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_status_master WHERE is_active = 1", (err, rows, fields)=>{
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
 * /statusmaster:
 *  post: 
 *      description: Get all role masters
 *      tags:
 *          - Status Master
 *      responses:
 *          200:
 *              description: 'Data Inserted Successfully!'
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.status != ''){
        mysqlConnection.query("SELECT * FROM tai_status_master WHERE status = ?",postData.status, (err, rows, fields)=>{            
            if(rows && rows.length == 0 && !err){
                mysqlConnection.query("INSERT INTO tai_status_master SET is_active = 1,?;",postData, (err, rows, fields)=>{
                    if(!err){
                        return res.json({
                            message: "Data Inserted Successfully!",
                            status: 1,
                            data: null
                        });
                    }else{
                        return res.json({
                            message: 'Data Not Inserted',
                            status: '0',
                            data: err
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
 * /statusmaster/{id}:
 *  post: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Status Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_status_master WHERE is_active = 1 AND id = ?',[req.params.id], (err, rows, fields) => {
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
 * /statusmaster/{id}:
 *  put: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Status Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_status_master WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_status_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
 * /statusmaster/{id}:
 *  delete: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Status Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.put('/delete/:id', (req, res) => {
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_status_master WHERE is_active = 1 AND id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_status_master SET is_active = 0 WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
                if (!err){
                    return res.json({
                        message: "Data Deleted Successfully!",
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
    // mysqlConnection.query("DELETE FROM tai_status_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
    //     if (!err){
    //         return res.json({
    //             message: "Data Deleted Successfully!",
    //             status: 1,
    //             data: null
    //         });
    //     }else{
    //         return res.json({
    //             message: "Data Not Deleted ",
    //             status: 0,
    //             data: null
    //         });
    //     }  
    // })
});

module.exports = Router;