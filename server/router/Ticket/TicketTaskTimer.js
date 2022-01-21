const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.u2yik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.on('error', err => {
  console.log('connection fail');
});

const dbm = mongoose.connection.on('connected', connected => {
  console.log('MongoDb Connection Successful');
});

const collection="taskTimer";

Router.post("/", (req, res) => {
  dbm.collection(collection).insertOne(req.body, function (err, row) {
    if (row.insertedCount && row.insertedCount > 0) {
      return res.send({
        message: 'Data Inserted Successfully !!!',
        status: 1,
        data: row.ops
      });
    } else {
      return res.send({
        message: 'Data Not Inserted !!!',
        status: 0,
        data: null
      });
    }

  })
});

Router.get("/", (req, res) => {
  dbm.collection(collection)
    .find()
    .toArray(function (err, rows) {
      if (rows) {
        res.send({
          message: 'Data Found !!!',
          status: 1,
          data: rows
        })
      } else {
        res.send({
          message: 'Data Not Found !!!',
          status: 0,
          data: null
        })

      }
    });
});

Router.get('/:id', (req, res) => {
  ObjectId = require('mongodb').ObjectId;
  // dbm.collection(collection).findOne({ _id: ObjectId(req.params.id) }, function (err, row) {  
    var query = { ticketId : req.params.id };
    dbm.collection(collection).find(query).toArray(function(err, row) {
    if (row) {
      res.send({
        message: 'Data Found !!!',
        status: 1,
        data: row
      })
    } else {
      res.send({
        message: 'Data Not Found !!!',
        status: 0,
        data: null
      })
    }
  });
});

Router.put('/:id', (req, res) => {

  ObjectId = require('mongodb').ObjectId;

    dbm.collection(collection).updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body },
      function (err, row) {
        if (row) {
          return res.send({
            message: 'Data Updated Successfully !!!',
            status: 1,
            data: [req.body]
          });
        } else {
          return res.send({
            message: 'Data Not Updated !!!',
            status: 0,
            data: null
          });
        }
      });
});

module.exports = Router;