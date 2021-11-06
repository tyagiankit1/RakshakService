module.exports = (sequelize, Sequelize) => {
    const qrCodeLotDetails = sequelize.define("qrLotDetails", {
      qrLotId: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false
      },
      qrLotStart: {
        type: Sequelize.INTEGER, allowNull: false
      },
      qrLotEnd: {
        type: Sequelize.INTEGER, allowNull: false
      },
      lotSize: {
        type: Sequelize.STRING, allowNull: false
      },
      assignedTo: {
        type: Sequelize.STRING, allowNull: false
      }
    }, {
      freezeTableName: true
    });
    return qrCodeLotDetails;
  };