module.exports = (sequelize, Sequelize) => {
    const userOrderDetails = sequelize.define("userOrderDetails", {
      orderID: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false
      },
      userID: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false
      },
      vehicleID: {
        type: Sequelize.UUID, allowNull: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      contactNo: {
        type: Sequelize.DOUBLE, allowNull: false
      },
      address: {
        type: Sequelize.STRING, allowNull: false
      },
      city: {
        type: Sequelize.STRING, allowNull: false
      },      
      state: {
        type: Sequelize.STRING, allowNull: false
      },
      pincode: {
        type: Sequelize.STRING,  allowNull: false
      },
      refByCode: {
        type: Sequelize.STRING,  allowNull: true
      },
      orderStatus: {
        type: Sequelize.STRING,  allowNull: false
      },
      transactionId: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4,  allowNull: false
      }

    }, {
      freezeTableName: true
    });
    return userOrderDetails;
  };