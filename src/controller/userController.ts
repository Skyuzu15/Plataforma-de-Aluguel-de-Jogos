import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

// GET usuário por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        console.log("Rota /users/:id foi chamada!");  
        console.log("ID recebido:", req.params.id);

        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            console.log("Usuário não encontrado!");
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};

// POST criar usuário
export const createUser = async (req: Request, res: Response) => {
    try {
        console.log("Criando usuário:", req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "E-mail inválido" });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "A senha deve ter pelo menos 8 caracteres" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword, 
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const { name, password } = req.body; 

        const user = await UserModel.findByPk(id); 
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        if (name) user.name = name;
        if (password) user.password = password;

        await user.save();

        res.json({ message: "Usuário atualizado com sucesso", user });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await user.destroy();
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
        }

        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id }, "chave_secreta", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
};


