const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produtos = [
  // Moda
  {
    nome: 'Camiseta Premium Básica',
    descricao: 'Camiseta 100% algodão, confortável e versátil. Ideal para o dia a dia.',
    preco: 49.90,
    imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    categoria: 'Moda',
    estoque: 50
  },
  {
    nome: 'Tênis Esportivo Moderno',
    descricao: 'Tênis confortável para corrida e caminhada, com tecnologia de amortecimento.',
    preco: 299.90,
    imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    categoria: 'Moda',
    estoque: 30
  },
  {
    nome: 'Bolsa Feminina Elegante',
    descricao: 'Bolsa de couro sintético, espaço interno amplo e design moderno.',
    preco: 129.90,
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    categoria: 'Moda',
    estoque: 25
  },

  // Gadgets
  {
    nome: 'Smartwatch Pro',
    descricao: 'Relógio inteligente com monitoramento de saúde e notificações.',
    preco: 599.90,
    imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    categoria: 'Gadgets',
    estoque: 20
  },
  {
    nome: 'Fone Bluetooth Premium',
    descricao: 'Fone sem fio com cancelamento de ruído e bateria de longa duração.',
    preco: 349.90,
    imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    categoria: 'Gadgets',
    estoque: 40
  },
  {
    nome: 'Carregador Wireless',
    descricao: 'Carregador sem fio rápido e compatível com diversos dispositivos.',
    preco: 89.90,
    imagem: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    categoria: 'Gadgets',
    estoque: 60
  },

  // Decoração
  {
    nome: 'Vaso Decorativo Moderno',
    descricao: 'Vaso de cerâmica com design minimalista, perfeito para plantas.',
    preco: 79.90,
    imagem: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    categoria: 'Decoração',
    estoque: 35
  },
  {
    nome: 'Luminária LED Ambiente',
    descricao: 'Luminária com controle de intensidade e cor, cria atmosfera única.',
    preco: 159.90,
    imagem: 'https://images.unsplash.com/photo-1507473885765-e52c199d3c8c?w=500',
    categoria: 'Decoração',
    estoque: 28
  },
  {
    nome: 'Quadro Abstrato 50x70cm',
    descricao: 'Quadro decorativo com moldura elegante, ideal para sala ou escritório.',
    preco: 119.90,
    imagem: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500',
    categoria: 'Decoração',
    estoque: 15
  },

  // Beleza
  {
    nome: 'Kit Skincare Completo',
    descricao: 'Kit com produtos essenciais para cuidados da pele, 5 itens.',
    preco: 249.90,
    imagem: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500',
    categoria: 'Beleza',
    estoque: 45
  },
  {
    nome: 'Perfume Importado 100ml',
    descricao: 'Fragrância exclusiva e duradoura, notas amadeiradas e florais.',
    preco: 189.90,
    imagem: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
    categoria: 'Beleza',
    estoque: 32
  },
  {
    nome: 'Escova de Cabelo Profissional',
    descricao: 'Escova antiestática com cerdas suaves, reduz frizz e quebra.',
    preco: 39.90,
    imagem: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500',
    categoria: 'Beleza',
    estoque: 70
  },

  // Eletrônicos
  {
    nome: 'Tablet 10 polegadas',
    descricao: 'Tablet com tela Full HD, 64GB de armazenamento e processador rápido.',
    preco: 899.90,
    imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    categoria: 'Eletrônicos',
    estoque: 18
  },
  {
    nome: 'Mouse Gamer RGB',
    descricao: 'Mouse com iluminação RGB, sensor preciso e design ergonômico.',
    preco: 149.90,
    imagem: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    categoria: 'Eletrônicos',
    estoque: 55
  },
  {
    nome: 'Teclado Mecânico',
    descricao: 'Teclado mecânico com switches blue, retroiluminação RGB.',
    preco: 329.90,
    imagem: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    categoria: 'Eletrônicos',
    estoque: 42
  }
];

async function popularProdutos() {
  try {
    console.log('🛍️  Populando banco de dados com produtos...\n');

    // Criar categorias
    const categorias = {};
    const categoriasNomes = ['Moda', 'Gadgets', 'Decoração', 'Beleza', 'Eletrônicos'];

    for (const nomeCategoria of categoriasNomes) {
      const categoria = await prisma.categoria.upsert({
        where: { nome: nomeCategoria },
        update: {},
        create: { nome: nomeCategoria }
      });
      categorias[nomeCategoria] = categoria.id;
      console.log(`✅ Categoria "${nomeCategoria}" criada/verificada`);
    }

    // Criar produtos
    let criados = 0;
    let existentes = 0;

    for (const produtoData of produtos) {
      const categoriaId = categorias[produtoData.categoria];
      
      // Verificar se já existe
      const existe = await prisma.produto.findFirst({
        where: {
          nome: produtoData.nome,
          categoriaId: categoriaId
        }
      });

      if (!existe) {
        await prisma.produto.create({
          data: {
            nome: produtoData.nome,
            descricao: produtoData.descricao,
            preco: produtoData.preco,
            imagem: produtoData.imagem,
            categoriaId: categoriaId,
            estoque: produtoData.estoque
          }
        });
        criados++;
        console.log(`✅ Produto "${produtoData.nome}" criado`);
      } else {
        existentes++;
        console.log(`ℹ️  Produto "${produtoData.nome}" já existe`);
      }
    }

    console.log(`\n✨ Concluído! ${criados} produtos criados, ${existentes} já existiam.`);
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Erro ao popular produtos:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

popularProdutos();

