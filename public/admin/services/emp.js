const db = require("../../models");
const logger = require('../../../logger/logger');
const EmpDetails = db.empDetails;
const qr = require("qrcode");
let print = {"code": [],"image": []};

exports.saveEmpDetails = (req, res) => {
  const request = req.body;  
  logger.info("Saving Employee details with params::::: ", request); 
  // res.send({ request });

  EmpDetails.create(request)
    .then(data => {
      logger.info("Successfully saved Airport details ::::: "); 
      res.status(200).send({message: "Success"});
    })
    .catch(err => {
      logger.error("Error while saving Airport details::::: "+ err); 
      res.send({ message: "Fail " });
    });
};

exports.genrateqr = (async(req, res) => {
  const request = req.body;  
  
  logger.info("Saving Employee details with params::::: ", request); 
  // res.send({ request });
  let url="";
  
  await create(request,url);
res.send(print);

});
 function create(request,url){
  for(let i=0;i<request.length;i++){
    url="https://cyberimprintsolutions.atlassian.net/wiki/spaces/XM/pages/230260746/QR+Project/"+i
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");
    print.code.push(request.length);
    print.image.push(src);  
    // Let us return the QR code image as our response and set it to be the source used in the webpage 
});
}

 }

// exports.updateAirportDetailsById = (req, res) => {
//   const request = req.body; 
//   const update_data=req.body.update_data;
//   logger.info("Updating Airport details with params::::: ", update_data);  
//   AirportDetails.update(update_data, {
//     where: {
//       airport_id: request.Airport_Id
//     }
//   })
//   .then(data => {
//     logger.info("Successfully updated Airport details ::::: "); 
//     res.status(200).send({message: "Success"});
//   })
//   .catch(err => {
//     logger.error("Error while updating Airport details::::: "+ err); 
//     res.send({ message: "Fail " });
//   });    
// };