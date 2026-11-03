import { prisma } from "../config/database.js";

// REPOSITÓRIO de Produto — a ÚNICA camada que conversa com o Prisma.
// Implemente:
//   - listar todos (IMPORTANTE: traga junto a categoria de cada produto, para a
//     listagem conseguir mostrar o nome dela — pense em como o Prisma inclui
//     dados relacionados);
//   - criar um produto (guardando a referência para a categoria).
// Dica: use `prisma.produto.*`. Tudo é assíncrono.
export class ProdutosRepositoryPrisma {
  constructor(prisma) {
    this.prisma = prisma;
  }

  listarProdutos() {
    return this.prisma.findMany({
      where: { categoriaId },
      include: { categoria: true },
      orderBy: { nome: "asc" },
    });
  }

  criarProduto(nome, preco, categoriaId) {
    return this.prisma.create({
      data: { nome: nome, preco: preco, categoriaId: categoriaId },
    });
  }
}
