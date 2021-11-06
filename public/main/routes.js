module.exports = app => {

    const userDetails = require("./services/user.js");
    const vehicleDetails = require("./services/vehical.js");
    const userOrderDetails = require("./services/UserOrderDetails.js");
  
    var router = require("express").Router();


//------------------------------User API-------------------------

    router.post("/addNewUser", userDetails.addNewUser);
    router.post("/getUserByContact", userDetails.getUserByContact);    
    router.post("/updateUser", userDetails.updateUser);
    router.post("/cleanUserDetails", userDetails.cleanUserDetails);

//------------------------------Vehicle API-------------------------

    router.post("/addNewVehicle", vehicleDetails.addNewVehicle);
    router.post("/getVehicleListByUser", vehicleDetails.getVehicleListByUser);
    router.post("/getVehicleDetailsByID", vehicleDetails.getVehicleDetailsByID);    
    router.post("/updateVehicle", vehicleDetails.updateVehicle);    
    router.post("/cleanVehicleDetails", vehicleDetails.cleanVehicleDetails);

//------------------------------QR Code API-------------------------

    router.post("/requestQRByUser", userOrderDetails.requestQRByUser);
    router.post("/requestQRByVehicle", userOrderDetails.requestQRByVehicle);
    // router.post("/saveQrCodeLotDetails", qrcode.saveQrCodeLotDetails);
    router.post("/getVehicleDetailsByQR", vehicleDetails.getVehicleDetailsByQR);
 
    app.use("/api", router);

};
    