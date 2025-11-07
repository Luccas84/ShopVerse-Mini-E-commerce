const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarPorProduto = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const avaliacoes = await prisma.avaliacao.findMany({
      where: { produtoId: parseInt(produtoId) },
      include: {
        usuario: {
          select: {
            nome: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ erro: 'Erro ao listar avaliações' });
  }
};

const criar = async (req, res) => {
  try {
    const { usuario } = req;
    const { produtoId, nota, comentario } = req.body;

    if (!produtoId || !nota || nota < 1 || nota > 5) {
      return res.status(400).json({ erro: 'Produto e nota (1-5) são obrigatórios' });
    }

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(produtoId) }
    });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    // Verificar se o usuário já avaliou este produto
    const avaliacaoExistente = await prisma.avaliacao.findFirst({
      where: {
        produtoId: parseInt(produtoId),
        usuarioId: usuario.id
      }
    });

    if (avaliacaoExistente) {
      return res.status(400).json({ erro: 'Você já avaliou este produto' });
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        produtoId: parseInt(produtoId),
        usuarioId: usuario.id,
        nota: parseInt(nota),
        comentario: comentario || ''
      },
      include: {
        usuario: {
          select: {
            nome: true
          }
        }
      }
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ erro: 'Erro ao criar avaliação' });
  }
};

module.exports = {
  listarPorProduto,
  criar
};


