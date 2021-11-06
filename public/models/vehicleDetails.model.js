module.exports = (sequelize, Sequelize) => {
    const vehicleDetails = sequelize.define("vehicalDetails", {
      vehicleID: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false
      },
      userID: {
        type: Sequelize.UUID, allowNull: false
      },
      regNumber: {
        type: Sequelize.STRING, allowNull: false
      },
      owner: {
        type: Sequelize.STRING, allowNull: false
      }, 
      brand: {
        type: Sequelize.STRING, allowNull: false
      },
      model: {
        type: Sequelize.STRING, allowNull: false
      }, 
      fuelType: {
        type: Sequelize.STRING, allowNull: false
      },
      vehType: {
        type: Sequelize.STRING, allowNull: false
      },
      transmissionType: {
        type: Sequelize.STRING, allowNull: false
      },
      insuranceNumber: {
        type: Sequelize.STRING, allowNull: true
      },
      insuranceExpire: {
        type: Sequelize.STRING, allowNull: true
        },
      pollutionNumber : {
        type: Sequelize.STRING, allowNull: true
      },
      pollutionExpire : {
        type: Sequelize.STRING, allowNull: true
      },
      vehStatus  : {
        type: Sequelize.STRING, allowNull: true
      },
      qrStatus  : {
        type: Sequelize.BOOLEAN, defaultValue: false, allowNull: true
      },
    }, {
      freezeTableName: true
    });
    return vehicleDetails;
  };