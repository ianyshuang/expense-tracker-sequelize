'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Expense.associate = function (models) {
    // associations can be defined here
    Expense.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Expense;
};