import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category";

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
  }
);

Game.belongsTo(Category, { foreignKey: "category_id" });

export default Game;
