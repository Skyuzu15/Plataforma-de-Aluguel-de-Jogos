import express from "express";
import UserModel from "../model/UserModel";
import sequelize from "../config/database";

const app = express(); 
const port = 3000; 

app.use(express.json());

sequelize.sync({ alter: true }).then(async () => {
    console.log("Banco sincronizado!");

    const user = await UserModel.findOne();
    if (!user) {
        await UserModel.create({
            id: 1,
            name: "Usuário Teste",
            email: "teste@email.com",
            password: "123456",
        });
        console.log("Usuário de teste criado!");
    }

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch((error) => {
    console.error("Erro ao sincronizar o banco:", error);
});
