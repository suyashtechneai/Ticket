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
    mysqlConnection.query("SELECT * FROM tai_city_master WHERE is_active = 1", (err, rows, fields)=>{
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
    if(postData.city != ''){
        mysqlConnection.query("SELECT * FROM tai_city_master WHERE city = ?",postData.city, (err, rows, fields)=>{  
            if(rows && rows.length == 0 && !err){
               mysqlConnection.query("INSERT INTO tai_city_master SET is_active = 1,?;",postData, (err, rows, fields)=>{
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
Router.get('/:id' , (req, res) => {
    mysqlConnection.query("SELECT * FROM tai_country_master WHERE is_active = 1", (err, rows, fields)=>{
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
        mysqlConnection.query("SELECT * FROM tai_city_master WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_city_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
Router.put('/delete/:id', (req, res) => {
    var postData = req.body;
    mysqlConnection.query("SELECT * FROM tai_city_master WHERE is_active = 1 AND id = "+ req.params.id, (err, rows, fields) => {
    if(rows.length > 0){            
        mysqlConnection.query("UPDATE tai_city_master SET is_active = 0 WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
});

Router.get('/state/:id' , (req, res) => {
    //mysqlConnection.query('SELECT * FROM tai_city_master WHERE id = ?',[req.params.id], (err, rows, fields) => {
        mysqlConnection.query('SELECT sm.*,cm.*,sm.id as state_id, cm.id as city_id FROM tai_state_master as sm INNER JOIN tai_city_master as cm ON cm.state_id = sm.id WHERE state_id = '+req.params.id,[req.params.id], (err, rows, fields) => {   
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

module.exports = Router;