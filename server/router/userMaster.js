const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../db/conn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// const table="tai_user_master";
const table="tai_employee_master";
/**
 * @swagger
 * /usermaster:
 *  get: 
 *      description: Get all role masters
 *      tags: 
 *          - User Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query(`SELECT * FROM ${table} WHERE is_active=1`, (err, rows, fields)=>{
        if(!err){
            return res.json({
                message: 'Data found',
                status:1,
                data:rows
            });
        }else{
            console.log(err);
        }
    })
})

/**
 * @swagger
 * /usermaster:
 *  post: 
 *      description: Get all role masters
 *      tags:
 *          - User Master
 *      responses:
 *          200:
 *              description: 'Data Inserted Successfully!'
 */
function validate(password) {
    bcrypt.hash(password, 10,(err,hash)=>{
        console.log(hash);
       return hash;
    })
}

Router.post("/", async (req, res)=>{    
    var postData = req.body;
    if(postData.password){
        var encrypt=await bcrypt.hash(postData.password, 10);
        postData.password = encrypt ;
    }
    if(postData.email_id != '' && postData.user_name != ''){
        mysqlConnection.query(`SELECT * FROM tai_employee_master WHERE email_id = '`+postData.email_id+`' OR user_name = '`+postData.user_name+`'` ,(err, rows, fields)=>{ 
            if(rows && rows.length == 0 && !err){
                mysqlConnection.query(`INSERT INTO ${table} SET is_active=1, ?;`,postData, (err, rows, fields)=>{
                    if(!err){
                        return res.json({
                            message: 'Data Inserted Successfully!',
                            status: 1,
                            data:null
                        });
                    }else{
                        return res.json({
                            message: 'Data Not Inserted',
                            status: 0,
                            data:err
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
 * /usermaster/{id}:
 *  post: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - User Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query(`SELECT * FROM ${table} WHERE is_active=1 AND id = ?`,[req.params.id], (err, rows, fields) => {
        if (rows.length !=0 && !err){
            return res.json({
                message: 'Data Found',
                status: 1,
                data:rows
            });
        }else{
            return res.json({
                message: 'Data Not Found',
                status: 0,
                data:rows
            });
        }
    })
});

/**
 * @swagger
 * /usermaster/{id}:
 *  put: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - User Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {
    //let learner = req.body;
    var postData = req.body;
    mysqlConnection.query(`UPDATE ${table} SET ? WHERE id = `+ req.params.id, postData, (err, rows, fields) => {
        if (!err){
            return res.json({
                message: 'Data Updated !!!',
                status: 1,
                data:null
            });
        }else{
            return res.json({
                message: 'Data Not Updated !!!',
                status: 0,
                data:null
            });
        }
    })
});

Router.put('/delete/:id', (req, res) => {
    //let learner = req.body;
    var postData = req.body;
    mysqlConnection.query(`UPDATE ${table} SET is_active=0 WHERE id = `+ req.params.id, postData, (err, rows, fields) => {
        if (!err){
            return res.json({
                message: 'Data Deleted !!!',
                status: 1,
                data:null
            });
        }else{
            return res.json({
                message: 'Data Not Updated !!!',
                status: 0,
                data:null
            });
        }
    })
});

/**
 * @swagger
 * /usermaster/{id}:
 *  delete: 
 *      description: Get all role masters
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - User Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Role Master deleted successfully.');
        else
            console.log(err);
    })
});

Router.post('/getotheruser/:id' , (req, res) => {
    mysqlConnection.query(`SELECT * FROM ${table} WHERE id != ?`,[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

module.exports = Router;