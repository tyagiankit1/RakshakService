const Jimp = require("jimp");
const fsExtra = require('fs-extra');
const images = require("images");
const archiver = require('archiver');
const fs = require("fs");
const db = require("../../models");
const QRCodeLotDetails = db.qrCodeLotDetails;
const Op = db.Sequelize.Op;
var QRCode = require('qrcode');


exports.generateQRLot = (req, res) => {
  const request = req.body;

  QRCodeLotDetails.findOne({
      where: {
        qrLotId: request.qrLotId
      }
  })
  .then(data => {
      console.log("Successfully saved New User details ::::: "); 
      let qrCode;
      for(let i = data.qrLotStart; i <= data.qrLotEnd; i++){
          qrCode = "RC"+i;
          // console.log(qrCode);
          let qrStore = "./QR/code.png";
          const URL="https://www.rakshakcode.com/qrScreen/"+qrCode;

          const opts = {
            errorCorrectionLevel: 'H',
            type: 'terminal',
            quality: 0.95,
            margin: 0.2,
            width: 990,
            color: {
             dark: '#000',
             light: '#FFF',
            },
           }

          QRCode.toFile(qrStore, URL, opts, function (err) {
            if (err) throw err
            images("sticker.png").draw(images(qrStore), 740, 860).save("./QR/RC"+i+".png", {quality : 50 });
            // console.log('done')
            var loadedImage;

            Jimp.read("./QR/RC"+i+".png")
            .then(function (image) {
                loadedImage = image;
                return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
            })
            .then(function (font) {
              console.log("i---------------> ", i);
              loadedImage.print(font, 10, 10, "RC"+i).write+("./QR/RC"+i+".png");

              if(i === data.qrLotEnd){
                fs.unlink("./QR/code.png", function(err) {
                  if (err) {
                    res.status(500).send({message: "Failed"});
                  } else {
                    zipDirectory("./QR/", "./QRZip/"+data.qrLotId).then(function() {
                      fsExtra.emptyDirSync("./QR/");
                      res.status(200).send({message: "Success"});
                    })
                  }
                })
              }
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send({message: "Failed"});
            });
          })
      }      
  })
  .catch(err => {
      console.log("Error while saving New User details::::: ", err); 
      res.send({ message: "Fail " });
  }); 
}

function zipDirectory(source, out) {
  const archive = archiver('zip');
  // const stream = fs.createWriteStream(out);
  const output = fs.createWriteStream(out + '.zip');
  console.log("source: ", source);
  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(output)
    ;

    // output.on('close', () => );
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      resolve();
    });
    archive.finalize();
  });
}

exports.downloadQRLot = (req, res) => {
  const request = req.body;
  const path = `./QRZip/`+request.qrLotId+`.zip`; 
  console.log("path: ", path);
  res.download(path);

}