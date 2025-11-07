const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { autenticar, verificarAdmin } = require('../middleware/auth');

// Todas as rotas do dashboard requerem autenticação e admin
router.use(autenticar, verificarAdmin);

// Estatísticas gerais
router.get('/estatisticas', dashboardController.estatisticas);

// Gráficos de vendas
router.get('/vendas', dashboardController.vendas);

// Produtos mais vendidos
router.get('/produtos-populares', dashboardController.produtosPopulares);

module.exports = router;


