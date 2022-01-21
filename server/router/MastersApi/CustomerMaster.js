const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../db/conn');

/**
 * @swagger
 * /customermaster:
 *  get: 
 *      description: Get all Customer Master
 *      tags: 
 *           - Customer Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_customer_master WHERE is_active = 1", (err, rows, fields)=>{
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
})

/**
 * @swagger
 * /customermaster:
 *  post: 
 *      description: Post all Customer Master
 *      tags:
 *           - Customer Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.post("/", (req, res)=>{
    var postData = req.body;
    if(postData.name != ''){
        mysqlConnection.query("SELECT * FROM tai_customer_master WHERE name = ?",postData.name, (err, rows, fields)=>{
            if(!rows && !err){
                mysqlConnection.query("INSERT INTO tai_customer_master SET is_active = 1,?;",postData, (err, rows, fields)=>{
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
 * /customermaster/{id}:
 *  post: 
 *      description: Post Customer Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Customer Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_customer_master WHERE id = ? AND is_active = 1',[req.params.id], (err, rows, fields) => {
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
 * /customermaster/{id}:
 *  put: 
 *      description: Update Customer Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Customer Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/', (req, res) => {
    //let learner = req.body;
    var postData = req.body;
    mysqlConnection.query("SELECT * FROM tai_customer_master WHERE id = "+ req.body.id, postData, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_customer_master SET ? WHERE id = "+ req.body.id, postData, (err, rows, fields) => {
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
 * /customermaster/{id}:
 *  delete: 
 *      description: Delete Customer Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Customer Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.put('/delete/:id', (req, res) => {
    var postData = req.body;
    mysqlConnection.query("SELECT * FROM tai_customer_master WHERE is_active = 1 AND id = "+ req.body.id, postData, (err, rows, fields) => {
        if(rows.length > 0){            
            mysqlConnection.query("UPDATE tai_customer_master SET is_active = 0 WHERE id = "+ req.body.id, postData, (err, rows, fields) => {
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
    // mysqlConnection.query("DELETE FROM tai_customer_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
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