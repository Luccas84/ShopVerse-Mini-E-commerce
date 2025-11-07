const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listar = async (req, res) => {
  try {
    const { categoria, busca, limit, offset } = req.query;
    
    const where = {};
    
    if (categoria) {
      where.categoriaId = parseInt(categoria);
    }
    
    if (busca) {
      where.OR = [
        { nome: { contains: busca } },
        { descricao: { contains: busca } }
      ];
    }

    const produtos = await prisma.produto.findMany({
      where,
      include: {
        categoria: true,
        avaliacoes: {
          select: {
            nota: true
          }
        }
      },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined,
      orderBy: { createdAt: 'desc' }
    });

    // Calcular média de avaliações
    const produtosComMedia = produtos.map(produto => {
      const media = produto.avaliacoes.length > 0
        ? produto.avaliacoes.reduce((acc, av) => acc + av.nota, 0) / produto.avaliacoes.length
        : 0;
      
      return {
        ...produto,
        mediaAvaliacoes: media.toFixed(1),
        totalAvaliacoes: produto.avaliacoes.length
      };
    });

    res.json(produtosComMedia);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ erro: 'Erro ao listar produtos' });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
      include: {
        categoria: true,
        avaliacoes: {
          include: {
            usuario: {
              select: {
                nome: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    const media = produto.avaliacoes.length > 0
      ? produto.avaliacoes.reduce((acc, av) => acc + av.nota, 0) / produto.avaliacoes.length
      : 0;

    res.json({
      ...produto,
      mediaAvaliacoes: media.toFixed(1),
      totalAvaliacoes: produto.avaliacoes.length
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, descricao, preco, imagem, categoriaId, estoque } = req.body;

    if (!nome || !descricao || !preco || !imagem || !categoriaId) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        imagem,
        categoriaId: parseInt(categoriaId),
        estoque: estoque ? parseInt(estoque) : 0
      },
      include: {
        categoria: true
      }
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, imagem, categoriaId, estoque } = req.body;

    const produto = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: {
        ...(nome && { nome }),
        ...(descricao && { descricao }),
        ...(preco && { preco: parseFloat(preco) }),
        ...(imagem && { imagem }),
        ...(categoriaId && { categoriaId: parseInt(categoriaId) }),
        ...(estoque !== undefined && { estoque: parseInt(estoque) })
      },
      include: {
        categoria: true
      }
    });

    res.json(produto);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.produto.delete({
      where: { id: parseInt(id) }
    });

    res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};


