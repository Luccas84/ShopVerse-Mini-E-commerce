const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { autenticar, verificarAdmin } = require('../middleware/auth');

// Listar pedidos do usuário ou todos (admin)
router.get('/', autenticar, pedidoController.listar);

// Buscar pedido por ID
router.get('/:id', autenticar, pedidoController.buscarPorId);

// Criar pedido
router.post('/', autenticar, pedidoController.criar);

// Atualizar status do pedido (admin)
router.put('/:id/status', autenticar, verificarAdmin, pedidoController.atualizarStatus);

module.exports = router;


