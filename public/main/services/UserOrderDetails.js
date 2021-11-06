const db = require("../../models");
var QRCode = require('qrcode');
const logger = require('../../../logger/logger');
const UserOrderDetails = db.userOrderDetails;
const VehicleDetails = db.vehicleDetails;


// exports.saveQrCodeLotDetails = (req, res) => {
//   const request = req.body;
//   console.log(request);
//   logger.info("Saving New QR Code Lot with params::::: "+request); 
//   QrCodeLotDetails.create(request)
//     .then(data => {
//       logger.info("Successfully saved New QR Code Lot ::::: "); 
//       res.status(200).send({message: "Success",id:data.user_id});
//     })
//     .catch(err => {
//       logger.error("Error while saving New QR Code Lot ::::: "+ err); 
//       res.send({ message: "Fail " });
//     });
// };

exports.requestQRByUser = (req, res) => {
  const request = req.body;
  console.log(request);
  logger.info("Request New QR Code by the user with params::::: "+request); 
  UserOrderDetails.create(request)
    .then(data => {
      logger.info("Successfully saved New QR Code Lot ::::: "); 
      res.status(200).send({message: "Success",data:data});
    })
    .catch(err => {
      logger.error("Error while saving New QR Code Lot ::::: "+ err); 
      res.send({ message: "Fail " });
    });
};

exports.requestQRByVehicle = (req, res) => {
  const request = req.body;
  console.log(request);
  logger.info("Request New QR Code by the user with params::::: "+request); 
  UserOrderDetails.create(request)
    .then(data => {
      logger.info("Successfully saved New QR Code Lot ::::: "); 
      let update_data = {
        qrStatus: true
      }
      VehicleDetails.update(update_data, {
        where: {
          vehicleID: data.vehicleID
        }
      })
      .then(data => {
        logger.info("Successfully updated Vehicle details ::::: "); 
        res.status(200).send({message: "Success", data:data});
      })
      .catch(err => {
        logger.error("Error while updating Vehicle details::::: "+ err); 
        // res.send({ message: "Fail " });
      });
      
    })
    .catch(err => {
      logger.error("Error while saving New QR Code Lot ::::: "+ err); 
      res.send({ message: "Fail " });
    });
};