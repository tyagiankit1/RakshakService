module.exports = (sequelize, Sequelize) => {
    const qrCodeDetails = sequelize.define("qrCodeDetails", {
      image: {
        type: Sequelize.STRING(3000), allowNull: false
      },
      qrCode: {
        type: Sequelize.STRING, primaryKey: true, allowNull: false
      },
      qrStatus: {
        type: Sequelize.STRING, allowNull: false
      },
      userID: {
        type: Sequelize.UUID, allowNull: false
      },
      vehicleID: {
        type: Sequelize.UUID, allowNull: true
      },
      primaryContact: {
        type: Sequelize.DOUBLE, allowNull: false
      },
      EmgContact: {
        type: Sequelize.JSON, allowNull: true
      },
    }, {
      freezeTableName: true
    });
    return qrCodeDetails;
  };