import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'Plataforma-de-Compra-de-Jogos',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize