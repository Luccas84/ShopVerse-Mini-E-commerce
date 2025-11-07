const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { autenticar, verificarAdmin } = require('../middleware/auth');

// Listar todos os produtos (público)
router.get('/', produtoController.listar);

// Buscar produto por ID (público)
router.get('/:id', produtoController.buscarPorId);

// Criar produto (admin)
router.post('/', autenticar, verificarAdmin, produtoController.criar);

// Atualizar produto (admin)
router.put('/:id', autenticar, verificarAdmin, produtoController.atualizar);

// Deletar produto (admin)
router.delete('/:id', autenticar, verificarAdmin, produtoController.deletar);

module.exports = router;


