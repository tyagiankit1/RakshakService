module.exports = (sequelize, Sequelize) => {
    const mechanicDetails = sequelize.define("mechanicDetails", {
      mechanicID: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false
      },
      picture: {
        type: Sequelize.STRING(3000), allowNull: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      address: {
        type: Sequelize.STRING, allowNull: false
      },
      pincode: {
        type: Sequelize.DOUBLE, allowNull: true
      },
      location: {
        type: Sequelize.JSON, allowNull: true
      },
      category: {
        type: Sequelize.STRING, allowNull: true
      },
      type: {
        type: Sequelize.STRING, allowNull: true
      },
      contact: {
        type: Sequelize.JSON, allowNull: true
      },
      timings: {
        type: Sequelize.STRING, allowNull: true
      },
      holiday: {
        type: Sequelize.JSON, allowNull: true
      }
    }, {
      freezeTableName: true
    });
    return mechanicDetails;
  };