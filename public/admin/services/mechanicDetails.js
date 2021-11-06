const db = require("../../models");
const MechanicDetails = db.mechanicDetails;
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

const uploadMechanicXls = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/public/excelFiles/" + req.file.filename;
    let count = 0;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let mechanics = [];

      rows.forEach((row) => {
        let mechanic = {
            name: row[0],
            address: row[1],
            pincode: row[2],
            location: {'lat': 30.985078+count, 'long': 80.664538+count},
            category: row[5],
            type: row[4],
            contact: row[3]
        };
        count++;
        mechanics.push(mechanic);
      });

      MechanicDetails.bulkCreate(mechanics)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const cleanMechanicData = (req, res) => {
  const request = req.body; 
  MechanicDetails.destroy({
    truncate: true
  })
    .then(data => {
      res.status(200).send("Successfully deleted data");
    })
    .catch(err => {
      res.send({ message: "Fail " });
    });
};

const getAllMechanicDetails = (req, res) => {
  MechanicDetails.findAll()
    .then((data) => {
        res.status(200).send(data);
    //   res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mechanics.",
      });
    });
};

// const download = (req, res) => {
//   mechanicDetails.findAll().then((objs) => {
//     let mechanics = [];

//     objs.forEach((obj) => {
//       mechanics.push({
//         id: obj.id,
//         title: obj.title,
//         description: obj.description,
//         published: obj.published,
//       });
//     });

//     let workbook = new excel.Workbook();
//     let worksheet = workbook.addWorksheet("mechanics");

//     worksheet.columns = [
//       { header: "Id", key: "id", width: 5 },
//       { header: "Title", key: "title", width: 25 },
//       { header: "Description", key: "description", width: 25 },
//       { header: "Published", key: "published", width: 10 },
//     ];

//     // Add Array Rows
//     worksheet.addRows(mechanics);

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=" + "mechanics.xlsx"
//     );

//     return workbook.xlsx.write(res).then(function () {
//       res.status(200).end();
//     });
//   });
// };

module.exports = {
  uploadMechanicXls,
  cleanMechanicData,
  getAllMechanicDetails
//   download,
};
