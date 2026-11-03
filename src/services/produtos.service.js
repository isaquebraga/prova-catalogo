import { AppError } from "../utils/appError.js";

// SERVIÇO de Produto — REGRAS DE NEGÓCIO (inclui a regra que depende da Categoria).
// Lance `new AppError(mensagem, status)` quando uma regra for violada.
//
// Regras ao criar:
//   - o nome é OBRIGATÓRIO;
//   - o preço deve ser um número MAIOR que zero;
//   - a categoria informada precisa EXISTIR (regra do relacionamento 1-N) —
//     se não existir, rejeite (ex.: 422).
// Observação: preço chega do formulário como texto — converta para número antes.
// Métodos: criar e listar.
export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.repo = produtosRepository;
    this.categoriasRepo = categoriasRepository; // para checar se a categoria existe
  }

  listarProdutos() {
    return this.repo.listarProdutos();
  }

  criarProduto(nome, preco, categoriaId) {
    if (!nome) {
      throw new AppError(400, "produto já existe");
    }

    if (typeof preco != Number && preco < 0) {
      throw new AppError(401, "preço não é um valor positivo");
    }

    if (
      this.categoriasRepo.buscarCategoriaPorId(Number(categoriaId)) ===
      undefined
    ) {
      throw new AppError(422, "categoria não existe");
    }

    return this.categoriasRepo.criarProduto(
      nome,
      Number(preco),
      Number(categoriaId),
    );
  }
}
