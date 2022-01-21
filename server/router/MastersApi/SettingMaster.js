const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');

/**
 * @swagger
 * /settingmaster:
 *  get: 
 *      description: Get all role masters
 *      tags: 
 *          - Setting Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_setting_master", (err, rows, fields)=>{
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
 * /settingmaster:
 *  post: 
 *      description: Get all role masters
 *      tags:
 *          - Setting Master
 *      responses:
 *          200:
 *              description: 'Data Inserted Successfully!'
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.subject != ''){
        mysqlConnection.query("INSERT INTO tai_setting_master SET ?;",postData, (err, rows, fields)=>{
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
            message: 'All fields are required',
            status: '0',
            data: null
        });
    }
});

/**
 * @swagger
 * /settingmaster/{id}:
 *  post: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Setting Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.post('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_setting_master WHERE id = ?',[req.params.id], (err, rows, fields) => {
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
 * /settingmaster/{id}:
 *  put: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Setting Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;
        mysqlConnection.query("SELECT * FROM tai_setting_master WHERE id = "+ req.params.id, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_setting_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
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
 * /settingmaster/{id}:
 *  delete: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Setting Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM tai_setting_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
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