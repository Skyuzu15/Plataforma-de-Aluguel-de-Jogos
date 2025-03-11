import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import GameModel from "./Game";
import { DATE } from "sequelize";

class RentalModel extends Model {}

RentalModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_is: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GameModel,
                key: "id",
            },
        },
        rental_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM("Ativo", "Concluido", "Atrasado"),
            allowNull: false,
            defaultValue: "Ativo",
        },
},
{
    sequelize,
    modelName: "Rental",
    tableName: "rentals",
    timestamps: false,
}
)

UserModel.hasMany(RentalModel, { foreignKey: "user-id" });
GameModel.hasMany(RentalModel, { foreignKey: "game_id" });

GameModel.belongsTo(UserModel, { foreignKey: "user_id" });
GameModel.belongsTo(GameModel, { foreignKey: "game_id" });

export default RentalModel;