import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "canceled"),
      allowNull: false,
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
  }
);

Order.belongsTo(UserModel, { foreignKey: "user_id" });

export default Order;
