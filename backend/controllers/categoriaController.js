const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listar = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        _count: {
          select: { produtos: true }
        }
      },
      orderBy: { nome: 'asc' }
    });

    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ erro: 'Erro ao listar categorias' });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
      include: {
        produtos: true
      }
    });

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ erro: 'Erro ao buscar categoria' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
    }

    const categoria = await prisma.categoria.create({
      data: { nome }
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
    }

    const categoria = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nome }
    });

    res.json(categoria);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ erro: 'Erro ao atualizar categoria' });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se há produtos nesta categoria
    const produtos = await prisma.produto.findMany({
      where: { categoriaId: parseInt(id) }
    });

    if (produtos.length > 0) {
      return res.status(400).json({ 
        erro: 'Não é possível deletar categoria com produtos. Delete ou mova os produtos primeiro.' 
      });
    }

    await prisma.categoria.delete({
      where: { id: parseInt(id) }
    });

    res.json({ mensagem: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ erro: 'Erro ao deletar categoria' });
  }
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};


