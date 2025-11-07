const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function criarAdmin() {
  try {
    console.log('🔐 Criar Usuário Administrador\n');

    rl.question('Nome: ', async (nome) => {
      rl.question('Email: ', async (email) => {
        rl.question('Senha: ', async (senha) => {
          try {
            // Verificar se email já existe
            const existe = await prisma.usuario.findUnique({
              where: { email }
            });

            if (existe) {
              console.log('❌ Email já cadastrado!');
              rl.close();
              await prisma.$disconnect();
              process.exit(1);
            }

            // Hash da senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // Criar admin
            const admin = await prisma.usuario.create({
              data: {
                nome,
                email,
                senha: senhaHash,
                admin: true
              }
            });

            console.log('\n✅ Administrador criado com sucesso!');
            console.log(`ID: ${admin.id}`);
            console.log(`Nome: ${admin.nome}`);
            console.log(`Email: ${admin.email}`);
            
            rl.close();
            await prisma.$disconnect();
          } catch (error) {
            console.error('❌ Erro ao criar administrador:', error);
            rl.close();
            await prisma.$disconnect();
            process.exit(1);
          }
        });
      });
    });
  } catch (error) {
    console.error('❌ Erro:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

criarAdmin();


