import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Order from "./Order";
import Game from "./Game";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
  }
);

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Game, { foreignKey: "game_id" });

export default OrderItem;
