const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const { autenticar } = require('../middleware/auth');

// Listar avaliações de um produto
router.get('/produto/:produtoId', avaliacaoController.listarPorProduto);

// Criar avaliação
router.post('/', autenticar, avaliacaoController.criar);

module.exports = router;


