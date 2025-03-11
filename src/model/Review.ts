import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import GameModel from "./Game";

class ReviewModel extends Model {}

ReviewModel.init(
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
                model: GameModel,
                key: "id",
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1, 
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Review",
        tableName: "reviews",
        timestamps: false,
    }
)

UserModel.hasMany(ReviewModel, { foreignKey: "user_id" });
GameModel.hasMany(ReviewModel, { foreignKey: "game_id" });

ReviewModel.belongsTo(UserModel, { foreignKey: "user_id" });
ReviewModel.belongsTo(GameModel, { foreignKey: "game_id" });

export default ReviewModel;