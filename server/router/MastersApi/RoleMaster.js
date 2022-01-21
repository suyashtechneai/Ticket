const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');
/**
 * @swagger
 * definitions:
 *   Rolemaster:
 *     type:
 *     properties:
 *       role_name:
 *         type: string
 *         description: rolename
 *         example: "abc"
 *       remark:
 *         type: string
 *         description: remark
 *         example: "a-b"
 *       is_active:
 *         type: integer
 *         description: active or not
 *         example: "0 or 1"
 */

/**
 * @swagger
 * /rolemaster:
 *  get: 
 *      description: Get all role masters
 *      tags: 
 *          - Role Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_role_master WHERE is_active = 1", (err, rows, fields)=>{
        if(!err){
            if(rows && rows.length > 0){
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
 * /rolemaster:
 *   post:  
 *     summary: "Create Role Master"
 *     description: "Create a new role master."
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Rolemaster'
 *     responses:
 *       default:
 *         description: "successful operation"       
 */ 
 Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.role){
        mysqlConnection.query("SELECT * FROM tai_role_master WHERE role = ?",postData.role, (err, rows, fields)=>{
            
            if(rows && rows.length == 0 && !err){
                
                mysqlConnection.query("INSERT INTO tai_role_master SET is_active = 1,?;",postData, (err, rows, fields)=>{
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
 * /rolemaster/{id}:
 *  post: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Role Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_role_master WHERE is_active = 1 AND id = ?',[req.params.id], (err, rows, fields) => {
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
 * /rolemaster/{id}:
 *  put: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Role Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_role_master WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_role_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
 * /rolemaster/{id}:
 *  delete: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Role Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.put('/delete/:id', (req, res) => {
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_role_master WHERE is_active = 1 AND id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_role_master SET is_active = 0 WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
    // mysqlConnection.query("DELETE FROM tai_role_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
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