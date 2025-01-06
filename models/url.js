"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  url.init(
    {
      id: DataTypes.STRING,
      original_url: DataTypes.STRING,
      short_code: DataTypes.STRING,
      click_count: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "url",
    }
  )
  return url
}
