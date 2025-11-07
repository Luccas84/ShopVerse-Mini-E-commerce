const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { autenticar, verificarAdmin } = require('../middleware/auth');

// Listar todas as categorias (público)
router.get('/', categoriaController.listar);

// Buscar categoria por ID (público)
router.get('/:id', categoriaController.buscarPorId);

// Criar categoria (admin)
router.post('/', autenticar, verificarAdmin, categoriaController.criar);

// Atualizar categoria (admin)
router.put('/:id', autenticar, verificarAdmin, categoriaController.atualizar);

// Deletar categoria (admin)
router.delete('/:id', autenticar, verificarAdmin, categoriaController.deletar);

module.exports = router;


