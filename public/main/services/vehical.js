const { Op } = require("sequelize");
const db = require("../../models");
var QRCode = require('qrcode');
const logger = require('../../../logger/logger');
const VehicleDetails = db.vehicleDetails;
var bcrypt = require('bcryptjs');

exports.addNewVehicle = (req, res) => {
  const request = req.body;
  console.log(request);
  logger.info("Saving New Vehicle details with params::::: "+request); 
  VehicleDetails.create(request)
    .then(data => {
      logger.info("Successfully saved New Vehicle details ::::: "); 
      res.status(200).send({message: "Success", vehicleDetails: data});
    })
    .catch(err => {
      logger.error("Error while saving New Vehicle details::::: "+ err); 
      res.send({ message: "Fail " });
    });
};

exports.getVehicleListByUser = (req, res) => {
  const request = req.body;
  logger.info("Making get Vehicle request."); 
  VehicleDetails.findAll({
      where: {
        userID: request.userID
      }})
      .then(data => {
        logger.info("Successfully fetched Vehicle details.");
        res.status(200).send(data);
      })
      .catch(err => {
        logger.info("Error while fetching Vehicle details: "+ err);
        res.send({ message: "Fail " });
      });
  };

  exports.getVehicleDetailsByID = (req, res) => {
    const request = req.body;
    logger.info("Making get Vehicle request."); 
    VehicleDetails.findAll({
        where: {
          vehicleID: request.vehicleID
        }})
        .then(data => {
          logger.info("Successfully fetched Vehicle details.");
          res.status(200).send(data);
        })
        .catch(err => {
          logger.info("Error while fetching Vehicle details: "+ err);
          res.send({ message: "Fail " });
        });
    };

  exports.cleanVehicleDetails = (req, res) => {
    const request = req.body;
    logger.info("Deleting Vehicle data."); 
    VehicleDetails.destroy({
        where: {
          regNumber: {
            [Op.or]: request.regNumber
          }
        }
        })
        .then(data => {
          logger.info("Destroy data for Vehicle details.");
          res.status(200).send("Successfully deleted data");
        })
        .catch(err => {
          logger.info("Error while fetching Influencer details: "+ err);
          res.send({ message: "Fail " });
        });
    };

  exports.getVehicleDetailsByQR = (req, res) => {
    const request = req.body;
    logger.info("Making get Vehicle request."); 
    VehicleDetails.findAll({
        where: {
          qr_code: request.qr_code
        }})
        .then(data => {
          logger.info("Successfully fetched Vehicle details.");
          res.status(200).send(data);
        })
        .catch(err => {
          logger.info("Error while fetching Vehicle details: "+ err);
          res.send({ message: "Fail " });
        });
    };

  exports.updateVehicle = (req, res) => {
    const request = req.body; 
    const update_data=req.body.update_data;
   
    logger.info("Updating Vehicle details with params::::: ", update_data); 
    VehicleDetails.update(update_data, {
      where: {
        vehicleID: request.vehicleID
      }
    })
    .then(data => {
      logger.info("Successfully updated Vehicle details ::::: "); 
      res.status(200).send({message: "Success"});
    })
    .catch(err => {
      logger.error("Error while updating Vehicle details::::: "+ err); 
      res.send({ message: "Fail " });
    });
  };

  exports.createQRcode = (req, res) => {
    const request = req.body; 
    const update_data=req.body.update_data;
   
    logger.info("Create QR Code with params::::: ", update_data); 
    VehicleDetails.update(update_data, {
      where: {
        rc_number: request.rc_number
      }
    })
    .then(data => {
      const URL="http://qrweb.cyberimprintsolutions.com/QRData/"+update_data.qr_code;
      QRCode.toDataURL(URL, (err, src) => {
        if (err) res.send("Error occured");
      // console.log(src);
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        // res.render("scan", { src });
        res.send({ data: src, vehicleDetails: update_data });
      });
    })
    .catch(err => {
      logger.error("Error while Create QR Code::::: "+ err); 
      res.send({ message: "Fail " });
    });
  };