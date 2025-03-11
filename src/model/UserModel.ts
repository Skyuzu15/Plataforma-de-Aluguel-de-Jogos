import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "cliente",),
        allowNull: false,
        defaultValue: "cliente",
    },
},
{
    sequelize,
    modelName: 'UserModel',
    tableName: 'users'
}
)

export default UserModel