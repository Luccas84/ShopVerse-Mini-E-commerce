const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listar = async (req, res) => {
  try {
    const { usuario } = req;

    const where = usuario.admin ? {} : { usuarioId: usuario.id };

    const pedidos = await prisma.pedido.findMany({
      where,
      include: {
        usuario: {
          select: {
            nome: true,
            email: true
          }
        },
        itens: {
          include: {
            produto: {
              include: {
                categoria: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ erro: 'Erro ao listar pedidos' });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario } = req;

    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: {
          select: {
            nome: true,
            email: true
          }
        },
        itens: {
          include: {
            produto: {
              include: {
                categoria: true
              }
            }
          }
        }
      }
    });

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    // Verificar se o usuário tem permissão para ver este pedido
    if (!usuario.admin && pedido.usuarioId !== usuario.id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    res.json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ erro: 'Erro ao buscar pedido' });
  }
};

const criar = async (req, res) => {
  try {
    const { usuario } = req;
    const { itens } = req.body;

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: 'Carrinho vazio' });
    }

    // Calcular total e validar produtos
    let total = 0;
    const itensPedido = [];

    for (const item of itens) {
      const produto = await prisma.produto.findUnique({
        where: { id: item.produtoId }
      });

      if (!produto) {
        return res.status(400).json({ erro: `Produto ${item.produtoId} não encontrado` });
      }

      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ 
          erro: `Estoque insuficiente para o produto ${produto.nome}` 
        });
      }

      const subtotal = produto.preco * item.quantidade;
      total += subtotal;

      itensPedido.push({
        produtoId: produto.id,
        quantidade: item.quantidade,
        preco: produto.preco
      });
    }

    // Criar pedido com itens
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: usuario.id,
        total,
        status: 'pendente',
        itens: {
          create: itensPedido
        }
      },
      include: {
        itens: {
          include: {
            produto: true
          }
        }
      }
    });

    // Atualizar estoque dos produtos
    for (const item of itens) {
      await prisma.produto.update({
        where: { id: item.produtoId },
        data: {
          estoque: {
            decrement: item.quantidade
          }
        }
      });
    }

    res.status(201).json(pedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'];
    
    if (!statusValidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const pedido = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        usuario: {
          select: {
            nome: true,
            email: true
          }
        },
        itens: {
          include: {
            produto: true
          }
        }
      }
    });

    res.json(pedido);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizarStatus
};


