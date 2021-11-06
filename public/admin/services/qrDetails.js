var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var rand = require("random-key");
var QRCode = require('qrcode');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = require("../../models");
const logger = require('../../../logger/logger');
const QRCodeLotDetails = db.qrCodeLotDetails;
const QRCodeDetails = db.qrCodeDetails;
const UserOrderDetails = db.userOrderDetails;


var jwt = require('jsonwebtoken');

exports.createQRLot = (req, res) => {
    const request = req.body;
    QRCodeLotDetails.max('qrLotEnd')
      .then(data => {
        console.log('data: ', data);
        let payload = {};
        if(isNaN(data)){
            payload = {
                'qrLotStart': 10001,
                'qrLotEnd':  10000 + request.lotSize,
                'lotSize': request.lotSize,
                'assignedTo': request.agent
            }  
            QRCodeLotDetails.create(payload)
            .then(data => {
                logger.info("Successfully saved New User details ::::: "); 
                res.status(200).send({message: "Success",QRLot: data});
            })
            .catch(err => {
                logger.error("Error while saving New User details::::: "+ err); 
                res.send({ message: "Fail " });
            });          
        } else{
            logger.info(data);
            payload = {
                'qrLotStart': data + 1,
                'qrLotEnd':  data + request.lotSize,
                'lotSize': request.lotSize,
                'assignedTo': request.agent
            }  
            QRCodeLotDetails.create(payload)
            .then(data => {
                logger.info("Successfully saved New User details ::::: "); 
                res.status(200).send({message: "Success",QRLot: data});
            })
            .catch(err => {
                logger.error("Error while saving New User details::::: "+ err); 
                res.send({ message: "Fail " });
            });       
        }
      })
      .catch(err => {
        logger.error("Error while saving New User details::::: "+ err); 
        res.send({ message: "Fail " });
      });    
  };


  exports.getQRLotList = (req, res) => {
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
          QRCodeLotDetails.findAll().then(qrLotList => {  
              
              res.status(200).send({ qrLotList: qrLotList });
            })
            .catch(err => {
              console.log("error: ", err);
              res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
            })   
        }        
      });
    }  
  };

  exports.assignQRCode = (req, res) => {
    var token = req.headers.authorization;
    var request = req.body;
    if (!token){
      res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    } else{
      let code = token.split("Bearer ")[1];
      jwt.verify(code, process.env.SECRET, function(err, decoded) {
        if (err){
          res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
        } else{
          console.log("decoded: ", decoded)

          const URL="https://www.rakshakcode.com/qrScreen/"+request.qrcode;

          QRCode.toDataURL(URL, {
            color: {
              dark: '#4F4F4F',  // Blue dots
              light: '#0000' // Transparent background
            },
          }, function (err, src) {
            if (err) throw err

            payload = {
              'image': src,
              'qrCode': request.qrcode,
              'qrStatus':  "Assigned",
              'userID': request.orderData.userID,
              'vehicleID': request.orderData.vehicleID,
              'primaryContact': request.orderData.contactNo
            }  
            console.log(payload)
            QRCodeDetails.create(payload)
            .then(data => {
                logger.info("Successfully saved New User details ::::: "+ JSON.stringify(request)); 
                let update_data = request.orderData;
                update_data.orderStatus = "Assigned";
                UserOrderDetails.update(update_data, {
                  where: {
                    orderID: request.orderData.orderID
                  }
                })
                .then(data => {
                  logger.info("Successfully updated User details ::::: "); 
                  res.status(200).send({message: "Success",userDetails:data});
                })
                .catch(err => {
                  logger.error("Error while updating User details::::: "+ err); 
                  res.send({ message: "Fail " });
                });
            })
            .catch(err => {
                logger.error("Error while saving New User details::::: "+ err); 
                res.send({ message: "Fail " });
            }); 

          })
 
        }        
      });
    }  
  };

  exports.updateQRCode = (req, res) => {
    var token = req.headers.authorization;
    var request = req.body;
    if (!token){
      res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    } else{
      let code = token.split("Bearer ")[1];
      jwt.verify(code, process.env.SECRET, function(err, decoded) {
        if (err){
          res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
        } else{
          console.log("decoded: ", decoded)

            QRCodeDetails.update(request.qrData, {
              where: {
                qrCode: request.qrData.qrCode
              }
            })
            .then(data => {
                logger.info("Successfully saved New User details ::::: "); 
                UserOrderDetails.update(request.orderData, {
                  where: {
                    orderID: request.orderData.orderID
                  }
                })
                .then(data => {
                  logger.info("Successfully updated User details ::::: "); 
                  res.status(200).send({message: "Success",userDetails:data});
                })
                .catch(err => {
                  logger.error("Error while updating User details::::: "+ err); 
                  res.send({ message: "Fail " });
                });
            })
            .catch(err => {
                logger.error("Error while saving New User details::::: "+ err); 
                res.send({ message: "Fail " });
            }); 
 
        }        
      });
    }  
  };
  
  exports.getQRListByUser = (req, res) => {
    // var token = req.headers.authorization;
    // if (!token){
    //   res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
    // } else{
    //   let code = token.split("Bearer ")[1];
    //   jwt.verify(code, process.env.SECRET, function(err, decoded) {
    //     if (err){
    //       res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
    //     } else{
    //       console.log("decoded: ", decoded)
          QRCodeDetails.findAll({
            where: {userID: req.body.userID }
            }).then(qrList => {  
              
              res.status(200).send({ qrList: qrList });
            })
            .catch(err => {
              console.log("error: ", err);
              res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
            })   
        // }        
    //   });
    // }  
  };