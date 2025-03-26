import express from "express";
import Order from "../model/Order";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ error: "Erro ao criar pedido" });
    }
});

export default router;