import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'plataforma-de-compra-de-jogos',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize