const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'shopverse_secret_key_2024';

// Middleware para autenticar usuário
const autenticar = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];
    
    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId }
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

// Middleware para verificar se é admin
const verificarAdmin = (req, res, next) => {
  if (!req.usuario || !req.usuario.admin) {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

module.exports = { autenticar, verificarAdmin, JWT_SECRET };


