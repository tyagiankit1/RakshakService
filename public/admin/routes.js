module.exports = app => {
    const authService = require("./services/login.js");
    const empServices = require("./services/emp.js");
    const userServices = require("./services/user.js");
    const qrService = require("./services/qrDetails.js");
    const qrLotService = require("./services/qrLot.js");
    const upload = require("../fileSystem/upload.js");
    const mechanicDetails = require("./services/mechanicDetails.js");
  
    var router = require("express").Router();
    

    
//------------------------------Employee API-------------------------
    router.post("/registerEmp", authService.empRegister);
    router.post("/empLogin", authService.empLogin);
    router.post("/authProfile", authService.getAuthProfile);
    router.post("/getEmpList", authService.getEmpList);
    router.post("/cleanEmployeeDetails", authService.cleanEmployeeDetails);
    

    
//------------------------------QR API-------------------------

    router.post("/getUserList", userServices.getUserList);
    router.post("/getUserVehicle", userServices.getUserVehicle);
    router.post("/getUserOrder", userServices.getUserOrder);

//------------------------------QR API-------------------------

    router.post("/saveEmpDetails", empServices.saveEmpDetails);
    router.post("/genrateqr", empServices.genrateqr);

    router.post("/createQRLot", qrService.createQRLot);
    router.post("/getQRLotList", qrService.getQRLotList);
    router.post("/assignQRCode", qrService.assignQRCode);
    router.post("/updateQRCode", qrService.updateQRCode);
    router.post("/getQRListByUser", qrService.getQRListByUser);


    router.post("/generateQRLot", qrLotService.generateQRLot);
    router.post("/downloadQRLot", qrLotService.downloadQRLot);
    // router.post("/updateAirportDetailsById", airportServices.updateAirportDetailsById);
    
//------------------------------Mechanic API-------------------------

    router.post("/uploadMechanicXls", upload.single("file"), mechanicDetails.uploadMechanicXls);
    router.post("/getAllMechanicDetails", mechanicDetails.getAllMechanicDetails); 
    router.post("/cleanMechanicData", mechanicDetails.cleanMechanicData);     

    app.use("/api", router);

};
    