import express from 'express'
import sequelize from './config/database'
import UserModel from './model/UserModel'
import GameModel from './model/Game'
import CategoryModel from './model/Category'
import RentalModel from './model/Rental'
import PaymentModel from './model/Payment'
import ReviewModel from './model/Review'

const app = express()
const port = 3000

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

app.get('/rentals', async (req, res) => {
    const rentals= await RentalModel.findAll()
    res.send(rentals)
})

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

sequelize
    .sync({ alter: true})
    .then(() => {
        console.log('Deu bom')
    })
    .catch((error) => {
        console.log('F total', error)
    })

app.listen(port, () => {
    console.log('Server is running on port', port)
})
