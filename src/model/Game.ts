import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import CategoryModel from "./Category";

class GameModel extends Model {}

GameModel.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rental_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CategoryModel,
            key: "id",
        },
    },
},
{
    sequelize,
    modelName:"Game",
    tableName:"games",
    timestamps: false,
}
)

CategoryModel.hasMany(GameModel, {foreignKey: "category_id"});
GameModel.belongsTo(CategoryModel, {foreignKey: "category_id"});

export default GameModel;