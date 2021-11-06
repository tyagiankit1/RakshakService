var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var rand = require("random-key");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = require("../../models");
const logger = require('../../../logger/logger');
const UserDetails = db.userDetails;
const VehicleDetails = db.vehicleDetails;
const UserOrderDetails = db.userOrderDetails;

var jwt = require('jsonwebtoken');


exports.getUserList = (req, res) => {
    var token = req.headers.authorization;
    if (!token){
      res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    } else{
      let code = token.split("Bearer ")[1];
      jwt.verify(code, process.env.SECRET, function(err, decoded) {
        if (err){
          res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
        } else{
          console.log("decoded: ", decoded)
          UserDetails.findAll().then(userList => {  
              
              res.status(200).send({ userList: userList });
            })
            .catch(err => {
              console.log("error: ", err);
              res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
            })   
        }        
      });
    }  
  };
  
  exports.getUserVehicle = (req, res) => {
    var token = req.headers.authorization;
    console.log("req: ", req.body.userID)
    if (!token){
      res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    } else{
      let code = token.split("Bearer ")[1];
      jwt.verify(code, process.env.SECRET, function(err, decoded) {
        if (err){
          res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
        } else{
          console.log("decoded: ", decoded)
          VehicleDetails.findAll({
            where: {userID: req.body.userID }
            }).then(userList => {  
              
              res.status(200).send({ userList: userList });
            })
            .catch(err => {
              console.log("error: ", err);
              res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
            })   
        }        
      });
    }  
  };

  exports.getUserOrder = (req, res) => {
    var token = req.headers.authorization;
    console.log("req: ", req.body.userID)
    if (!token){
      res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    } else{
      let code = token.split("Bearer ")[1];
      jwt.verify(code, process.env.SECRET, function(err, decoded) {
        if (err){
          res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
        } else{
          console.log("decoded: ", decoded)
          UserOrderDetails.findAll({
            where: {userID: req.body.userID }
            }).then(userOrderList => {              
              res.status(200).send({ userOrderList: userOrderList });
            })
            .catch(err => {
              console.log("error: ", err);
              res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
            })   
        }        
      });
    }  
  };