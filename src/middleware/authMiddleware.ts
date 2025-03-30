import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token não fornecido!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number }; // O token deve conter o ID do usuário

        const user = await UserModel.findByPk(decoded.id); // Busca o usuário no banco

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        req.user = user; // Agora o TypeScript reconhecerá req.user corretamente

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido!" });
    }
};
