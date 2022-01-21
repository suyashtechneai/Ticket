const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const userMiddleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const table="tai_employee_master";

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ){
            return res.json({ 
                status: 0,
                message: "All fields are required" ,
                data:null
            });
        }else{
            db.query(
                `SELECT * FROM ${table} WHERE email_id = ${db.escape(email)};`,
                (err, result) => {
                  // user does not exists
                  if (err) {
                    return res.json({
                      status: 0,
                      message: "Query not executed",
                      data:err
                    });
                  }
                  if (!result.length) {
                    return res.json({
                      status: 0,
                      message: 'Email or password is incorrect!',
                      data:null
                    });
                  }
                  // check password
                  bcrypt.compare(
                    password,
                    result[0]['password'],
                    (bErr, bResult) => {
                      if (bErr) {
                        return res.json({
                          status: 0,
                          message: 'Username or password is incorrect!',
                          data:null
                        });
                      }
                      if (bResult) {
                        const token = jwt.sign({
                            email: result[0].email,
                            id: result[0].id
                          },
                          'SECRETKEY', {
                            expiresIn: '7d'
                          }
                        );
                        db.query(
                          `UPDATE ${table} SET last_login = now(), jwt_token = '${token}' WHERE id = '${result[0].id}'`
                        );
                        res.cookie("jwtoken", token, {
                            expires: new Date(Date.now() + 25892000000),
                            httpOnly:true
                        });
                        return res.json({
                          status:1,
                          message:"Logged In ",
                          data:{
                            email: result[0].email_id,
                            id: result[0].id,
                            username: result[0].user_name,
                            name:result[0].first_name+" "+result[0].last_name,

                            message: 'Logged in!',                          
                            status: 1,  
                            token: token
                          }
                          
                        });
                      }
                      return res.status(401).send({
                        message: 'Username or password is incorrect!',
                        status: 0
                      });
                    }
                  );
                }
            );
        }

    }catch(err){
        console.log('yes');
    }
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.json({ 
            status:0,
            message: "All fields are required" 
        });
    }else{
        db.query(
            `SELECT * FROM ${table} WHERE LOWER(email) = LOWER(${db.escape(
            email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.json({
                    status:0,
                    message: 'This email is already in use!',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.json({
                        status:0,
                        message: err,
                    });
                } else {
                    db.query(
                    `INSERT INTO ${table} (username, email, password, last_login, created_at, updated_at) VALUES ( ${db.escape(username)}, ${db.escape(email)}, ${db.escape(hash)}, now(), now(), now())`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: err,
                                status: 0
                            });
                        }else{
                            return res.status(201).send({
                                message: 'Registered!',
                                status: 1
                            });
                        }                        
                    });
                }
                });
            }
        });    
    }
});

router.get('/about', authenticate.Authenticate, (req, res) => {
  //console.log('Hello About');
  res.send(req.decoded);
});

module.exports = router;