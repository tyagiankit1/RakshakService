module.exports = (sequelize, Sequelize) => {
  const empDetails = sequelize.define("empDetails", {
    empID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING(3000),
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,      
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contactNo: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return empDetails;
};
