const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');

/**
 * @swagger
 * /employeemaster:
 *  get: 
 *      description: Get all Employee Master
 *      tags: 
 *          - Employee Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_employee_master WHERE is_active = 1", (err, rows, fields)=>{
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
 * /employeemaster:
 *  post: 
 *      description: Post all Employee Master
 *      tags:
 *          - Employee Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.first_name != '' || postData.middle_name != '' || postData.last_name != '' && postData.email_id != ''){
        mysqlConnection.query("SELECT * FROM tai_employee_master WHERE email_id = ?",postData.email_id, (err, rows, fields)=>{
            if(rows.length == 0 && !err){
                mysqlConnection.query("INSERT INTO tai_employee_master SET is_active = 1,?;",postData, (err, rows, fields)=>{
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
 * /employeemaster/{id}:
 *  post: 
 *      description: post Employee Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Employee Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_employee_master WHERE id = ? AND is_active = 1',[req.params.id], (err, rows, fields) => {
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
 * /employeemaster/{id}:
 *  put: 
 *      description: Update Employee Master
 *      parameters:
 *          - in: path
 *            name: id     
 *      tags:
 *          - Employee Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_employee_master WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_employee_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
 * /employeemaster/{id}:
 *  delete: 
 *      description: Delete Employee Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Employee Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.put('/delete/:id', (req, res) => {
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_employee_master WHERE is_active = 1 AND id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_employee_master SET is_active = 0 WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
    // mysqlConnection.query("DELETE FROM tai_employee_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
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