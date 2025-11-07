const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Cadastro de usuário
router.post('/cadastro', authController.cadastro);

// Login
router.post('/login', authController.login);

// Verificar token
router.get('/verificar', authController.verificarToken);

module.exports = router;


