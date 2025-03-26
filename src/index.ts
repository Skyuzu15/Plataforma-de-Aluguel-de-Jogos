import express from 'express'
import sequelize from './config/database'
import UserModel from './model/UserModel'
import GameModel from './model/Game'
import CategoryModel from './model/Category'
import PaymentModel from './model/Payment'
import ReviewModel from './model/Review'
import Order from './model/Order'
import OrderItem from './model/OrderItem'

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Word!')
})

app.get('/users', async (req, res) => {
    const users= await UserModel.findAll()
    res.send(users)
}) 

app.get('/games', async (req, res) => {
    const games= await GameModel.findAll()
    res.send(games)
})

app.post("/orders", async (req, res) => {
    try {
        console.log("Recebendo pedido:", req.body);

        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erro ao criar pedido:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("Erro desconhecido:", error);
            res.status(500).json({ error: "Erro inesperado ao criar pedido" });
        }
    }
});

app.get('/categories', async (req, res) => {
    const categories= await CategoryModel.findAll()
    res.send(categories)
})

app.get('/payments', async (req, res) => {
    const payments= await PaymentModel.findAll()
    res.send(payments)
})

app.get('/reviews', async (req, res) => {
    const reviews= await ReviewModel.findAll()
    res.send(reviews)
})

app.get('/orderitem', async (req, res) => {
    const reviews= await OrderItem.findAll()
    res.send(OrderItem)
})

sequelize
    .sync({ alter: true }) 
    .then(() => {
        console.log("Banco sincronizado com sucesso!");

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco:", error);
    });
