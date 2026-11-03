import { AppError } from "../utils/appError.js";

// SERVIÇO de Categoria — REGRAS DE NEGÓCIO.
// Lance `new AppError(mensagem, status)` quando uma regra for violada.
//
// Regras:
//   - o nome da categoria é OBRIGATÓRIO (ex.: 400 se faltar).
// Métodos: criar e listar.
export class CategoriasService {
  constructor(categoriasRepository) {
    this.repo = categoriasRepository;
  }

  listarCategorias() {
    return this.repo.listarCategoria();
  }

  buscarCategoriaPorId(id) {
    return this.repo.buscarCategoriaPorId(id);
  }

  criarCategoria(nome) {
    if (!nome) {
      throw new AppError(400, "categoria já existe");
    }

    return this.repo.criarCategoria(nome)
  }
}
