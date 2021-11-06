var express = require('express');
const { Op } = require("sequelize");
var router = express.Router();
var bodyParser = require('body-parser');
var rand = require("random-key");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = require("../../models");
const logger = require('../../../logger/logger');
const regMail = require('../../mailer/newRegistration.json');
const mailerSerive = require('../../mailer/mailer.js');
const EmpDetails = db.empDetails;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { userDetails } = require('../../models');

exports.empRegister = (req, res) => {

  let password = "";
  if(req.body.password === undefined){
    password = rand.generate(7);
  }else {
    password = req.body.password;
  }
  var hashedPassword = bcrypt.hashSync(password, 8);   
  let request = req.body;
  request.password = hashedPassword;
  request.role = 'admin';
  
  EmpDetails.create(request).then(user => {
      var token = jwt.sign({ id: user.email, role: user.role }, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        regMail.body = regMail.body.replace('client_name', user.name).replace('role_name', user.role).replace('your_email', user.email).replace('your_password', password);
        console.log('regMail: ', regMail.body);
        mailerSerive.sendMail(regMail, user.email);
        res.status(200).send({ auth: true, token: token });
      })
      .catch(err => {
        console.log("error: ", err);
        res.status(500).send({ error: "Server Error", errorMessage: "There was a problem registering the user." });
      })
      
};

exports.empLogin = (req, res) => {
  EmpDetails.findOne({
        where: {email: req.body.email }
        }).then(user => {
          if (!user){        
            res.status(200).send({ error: "No User", errorMessage: "No User Found" });
          }else {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid){
              res.status(401).send({ error: "UnAutharize", errorMessage: "Invaloid User Credentials" });
            } else{
              var token = jwt.sign({ id: user.email, role: user.role }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
              });
              let userDetails = {
                id: user.empID,
                email: user.email,
                name: user.name,
                contact: user.contactNo,
                role: user.role
              }
              res.status(200).send({ auth: true, accessToken: token, user: userDetails });
            }
          }
        })
      .catch(err => {
        console.log("error: ", err);
        res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
      })
};


exports.getAuthProfile = (req, res) => {
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
        EmpDetails.findOne({
          where: {email: decoded.id }
          }).then(user => {  
            let userDetails = {
              id: user.emp_id,
              email: user.email,
              name: user.name,
              contact: user.contact,
              role: user.role
            }
            res.status(200).send({ user: userDetails });
          })
          .catch(err => {
            console.log("error: ", err);
            res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
          })   
      }        
    });
  }  
};

exports.getEmpList = (req, res) => {
  var token = req.headers.authorization;
  if (!token){
    res.status(401).send({ error: "Unauthorized", errorMessage: "No token provided." });
  } else{
    let code = token.split("Bearer ")[1];
    jwt.verify(code, process.env.SECRET, function(err, decoded) {
      if (err){
        res.status(500).send({ error: "Unauthorized", errorMessage: "Failed to authenticate token." });
      } else{
        EmpDetails.findAll()
        .then(data => {   
          res.status(200).send(data);    
          })
          .catch(err => {
            console.log("error: ", err);
            res.status(500).send({ error: "Server Error", errorMessage: "Error on the server." });
          })   


      }        
    });
  }  
};

exports.cleanEmployeeDetails = (req, res) => {
  const request = req.body;
  logger.info("Making get User request." + JSON.stringify(request)); 
    EmpDetails.destroy({
      where: {
        email: request.email
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