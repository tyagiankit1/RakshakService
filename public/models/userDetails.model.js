module.exports = (sequelize, Sequelize) => {
  const userDetails = sequelize.define("userDetails", {
    userID: {
      type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false
    },
    picture: {
      type: Sequelize.STRING(3000), allowNull: true
    },
    name: {
      type: Sequelize.STRING, allowNull: false
    },
    contactNo: {
      type: Sequelize.DOUBLE, unique: true, allowNull: false
    },
    email: {
      type: Sequelize.STRING, allowNull: false
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
      type: Sequelize.STRING, allowNull: false
    },
    refCode: {
      type: Sequelize.STRING, allowNull: false
    },
    refByCode: {
      type: Sequelize.STRING, allowNull: true
    }    
  }, {
    freezeTableName: true
  });
  return userDetails;
};