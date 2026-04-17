require("dotenv").config();
const path = require("path");

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "img")));

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.get("/users", async (req, res) => {
  const adminPw = req.headers["admin-pw"];

  if (adminPw !== process.env.ADMIN_PW) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.post("/products", async (req, res) => {
  const adminPw = req.headers["admin-pw"];

  if (adminPw !== process.env.ADMIN_PW) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  try {
    const { name, price, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Nome e preço são obrigatórios" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

app.listen(3000, () => {
  console.log("Servidor SwitchUp! rodando na porta 3000 🚀");
});