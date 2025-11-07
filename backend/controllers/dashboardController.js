const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const estatisticas = async (req, res) => {
  try {
    const [
      totalProdutos,
      totalCategorias,
      totalPedidos,
      totalUsuarios,
      pedidosHoje,
      receitaTotal,
      receitaHoje
    ] = await Promise.all([
      prisma.produto.count(),
      prisma.categoria.count(),
      prisma.pedido.count(),
      prisma.usuario.count(),
      prisma.pedido.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.pedido.aggregate({
        _sum: { total: true }
      }),
      prisma.pedido.aggregate({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        },
        _sum: { total: true }
      })
    ]);

    res.json({
      totalProdutos,
      totalCategorias,
      totalPedidos,
      totalUsuarios,
      pedidosHoje,
      receitaTotal: receitaTotal._sum.total || 0,
      receitaHoje: receitaHoje._sum.total || 0
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
  }
};

const vendas = async (req, res) => {
  try {
    const { periodo = '7' } = req.query;
    const dias = parseInt(periodo);

    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const pedidos = await prisma.pedido.findMany({
      where: {
        createdAt: {
          gte: dataInicio
        },
        status: {
          not: 'cancelado'
        }
      },
      select: {
        total: true,
        createdAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Agrupar por data
    const vendasPorData = {};
    pedidos.forEach(pedido => {
      const data = pedido.createdAt.toISOString().split('T')[0];
      if (!vendasPorData[data]) {
        vendasPorData[data] = 0;
      }
      vendasPorData[data] += pedido.total;
    });

    const dados = Object.keys(vendasPorData).sort().map(data => ({
      data,
      valor: vendasPorData[data]
    }));

    res.json(dados);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({ erro: 'Erro ao buscar vendas' });
  }
};

const produtosPopulares = async (req, res) => {
  try {
    const produtos = await prisma.pedidoItem.groupBy({
      by: ['produtoId'],
      _sum: {
        quantidade: true
      },
      _count: {
        produtoId: true
      },
      orderBy: {
        _sum: {
          quantidade: 'desc'
        }
      },
      take: 10
    });

    const produtosComDetalhes = await Promise.all(
      produtos.map(async (item) => {
        const produto = await prisma.produto.findUnique({
          where: { id: item.produtoId },
          include: {
            categoria: true
          }
        });

        return {
          produto,
          quantidadeVendida: item._sum.quantidade,
          vezesPedido: item._count.produtoId
        };
      })
    );

    res.json(produtosComDetalhes);
  } catch (error) {
    console.error('Erro ao buscar produtos populares:', error);
    res.status(500).json({ erro: 'Erro ao buscar produtos populares' });
  }
};

module.exports = {
  estatisticas,
  vendas,
  produtosPopulares
};


