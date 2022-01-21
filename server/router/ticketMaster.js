const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../db/conn');

/**
 * @swagger
 * /departmentmaster:
 *  get: 
 *      description: Get all Department Master
 *      tags: 
 *          - Department Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM tai_ticket_master", (err, rows, fields)=>{
       
            if(rows.length > 0){
               return res.json({
                    message: 'Data Found!',
                    status: 1,
                    data:rows
                    });
            }else{
                return res.json({
                    message: 'Data Not Found!',
                    status: 0,
                    data:null
                    });
            }            
        
    })
});

/**
 * @swagger
 * /departmentmaster:
 *  post: 
 *      description: Post all Department Master
 *      tags:
 *          - Department Master
 *      responses:
 *          200:
 *              description: Success
 */
function generateTicketId(){
    var ticketId=null;
    var tempId=null;
    mysqlConnection.query("SELECT ticket_id from tai_ticket_master order by id desc limit 1",(err, rows, fields)=>{
        if(rows[0].ticket_id){
            var split=rows[0].ticket_id.split("T");
            tempId=parseInt(split[1])+1;
        }else{
            tempId=20220;
        }
        ticketId="T"+tempId;
        console.log(ticketId);
        return ticketId;
    })
}

Router.post("/", (req, res)=>{
    var ticketId=null;
    var postData = req.body;

    mysqlConnection.query("SELECT ticket_id from tai_ticket_master order by id desc limit 1",(err, rows, fields)=>{
        
        if(rows[0].ticket_id){
            var split=rows[0].ticket_id.split("T");
            tempId=parseInt(split[1])+1;
        }else{
            tempId=20220;
        }
        ticketId="T"+tempId;
        postData = {...postData,'ticket_id':ticketId }
            
        mysqlConnection.query("INSERT INTO tai_ticket_master SET ?;",postData, (err, rows, fields)=>{
            if(!err){
                return res.json({
                    message: 'Data Inserted Successfully!',
                    status: 1,
                    data:rows
                });
            }else{
                return res.json({
                    message: 'Data Not Inserted',
                    status: 0,
                    data:err
                });
            }   
        })


    })


});

/**
 * @swagger
 * /departmentmaster/{id}:
 *  post: 
 *      description: Post Department Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Department Master
 *      responses:
 *          200:
 *              description: Success
 */
Router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM tai_ticket_master WHERE id = ?',[req.params.id], (err, rows, fields) => {
            if(rows.length > 0 && !err){
                return res.json({
                    message: 'Data Found!',
                    status: 1,
                    data:rows
                    });
            }else{
                return res.json({
                    message: 'Data Not Found!',
                    status: 0,
                    data:null
                    });
            }    
        })
    });

/**
 * @swagger
 * /departmentmaster/{id}:
 *  put: 
 *      description: Update Department Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Department Master
 *      responses:
 *          200:
 *              description: "Data Updated Successfully!"
 */
Router.put('/:id', (req, res) => {  
    var postData = req.body;      
    mysqlConnection.query("UPDATE tai_ticket_master SET ? WHERE id = "+ req.params.id, postData, (err, rows, fields) => {
        if (!err){
            return res.json({
                message: "Data Updated Successfully!",
                status: 1,
                date:null
            });    
        }else{
            return res.json({
                message: "Data Not Updated!",
                status: 0,
                date:null
            });
        }
    })
});

/**
 * @swagger
 * /departmentmaster/{id}:
 *  delete: 
 *      description: Delete Department Master
 *      parameters:
 *          - in: path
 *            name: id
 *      tags:
 *          - Department Master
 *      responses:
 *          200:
 *              description: "Data Deleted Successfully!"
 */
Router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM tai_ticket_master WHERE id = ?", [req.params.id], (err, rows, fields) => {
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