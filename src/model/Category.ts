import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
  }
);

export default Category;
