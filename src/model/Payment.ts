import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import RentalModel from "./Rental";

class PaymentModel extends Model {}

PaymentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rentals_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RentalModel,
                key: "id",
            },
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM("Pendente", "Pago", "Cancelado"),
            allowNull: false,
            defaultValue: "Pendente",
        },
    },
    {
        sequelize,
        modelName: "Payment",
        tableName: "payments",
        timestamps: false,
    }
)

RentalModel.hasOne(PaymentModel, { foreignKey: "rental_id" });
RentalModel.belongsTo(RentalModel, { foreignKey: "rental_id" });

export default PaymentModel;