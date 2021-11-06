module.exports = app => {
var multer  = require('multer')
var formidable = require('formidable');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.ADMIN_IMAGE_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})

var upload = multer({ storage: storage });

var router = require("express").Router();

  router.post('/uploadExcel', upload.single('file'), function (req, res, next) {
      console.log(req.file);
      res.write('File uploaded successfully!');
      res.end();
  });
  
  app.use("/api", router);
};