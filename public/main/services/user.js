const { Op } = require("sequelize");
const db = require("../../models");
var rand = require("random-key");
const logger = require('../../../logger/logger');
const UserDetails = db.userDetails;


exports.addNewUser = (req, res) => {
  const request = req.body;
  let random = Math.floor(Math.random() * 900) + 100;
  let refCode = (request.name.split(" ")[0]).toLowerCase().concat(random);
  request.refCode = refCode;
  console.log('--->', );
  logger.info("Saving New User details with params::::: "+request); 
  
  let payload = {
    "name": request.name,
    "city": request.city,
    "address": request.address,
    "state": request.state,
    "pincode": request.pincode,
    "email": request.email,
    "contactNo": request.contactNo,
    "refCode": refCode,
    "picture": request.picture,
    "refByCode": request.refByCode
  }


  UserDetails.create(payload)
    .then(data => {
      logger.info("Successfully saved New User details ::::: "); 
      res.status(200).send({message: "Success",userDetails:data});
    })
    .catch(err => {
      logger.error("Error while saving New User details::::: "+ err); 
      res.send({ message: "Fail " });
    });
};

exports.getUserByContact = (req, res) => {
  const request = req.body;
  logger.info("Making get User request."); 
    UserDetails.findAll({
      where: {
        contactNo: request.contact
      }})
      .then(data => {
        logger.info("Successfully fetched Influencer details.");
        res.status(200).send(data);
      })
      .catch(err => {
        logger.info("Error while fetching Influencer details: "+ err);
        res.send({ message: "Fail " });
      });
  };

  exports.cleanUserDetails = (req, res) => {
    const request = req.body;
    logger.info("Making get User request."); 
      UserDetails.destroy({
        where: {
          contactNo: {
            [Op.or]: request.contact
          }
        }
      })
      .then(data => {
        logger.info("Destroy data for User details.");
        res.status(200).send("Successfully deleted data");
      })
      .catch(err => {
        logger.info("Error while fetching Influencer details: "+ err);
        res.send({ message: "Fail " });
      });
  };

  exports.updateUser = (req, res) => {
    const request = req.body; 
    const update_data=req.body.update_data;
   
    logger.info("Updating User details with params::::: ", update_data); 
    UserDetails.update(update_data, {
      where: {
        userID: request.userID
      }
    })
    .then(data => {
      logger.info("Successfully updated User details ::::: "); 
      res.status(200).send({message: "Success",userDetails:update_data});
    })
    .catch(err => {
      logger.error("Error while updating User details::::: "+ err); 
      res.send({ message: "Fail " });
    });
  };