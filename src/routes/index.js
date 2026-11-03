import { Router } from 'express';

import { prisma } from "../config/database.js"
import { CategoriasRepositoryPrisma } from "../repositories/categorias.repository.prisma.js"
import { CategoriasService } from "../services/categorias.service.js"
import { CategoriasController } from "../controllers/categorias.controller.js"
import { ProdutosRepositoryPrisma } from "../repositories/produtos.repository.prisma.js"
import { ProdutosService } from "../services/produtos.service.js"
import { ProdutosController } from "../controllers/produtos.controller.js"
import { criarRotasDeCategorias } from "./categorias.routes.js"
import { criarRotasDeProdutos } from "./produtos.routes.js"

// COMPOSITION ROOT + ROTAS SSR.
// Monte a cadeia de dependências (repositório -> service -> controller) das duas
// entidades e declare as rotas.
//
// Rotas que a aplicação precisa ter:
//   GET  /                   -> redireciona para /produtos
//   -- Categorias --
//   GET  /categorias         -> listagem
//   GET  /categorias/nova    -> formulário de nova categoria (declare ANTES de rotas com :id, se houver)
//   POST /categorias         -> validar entrada e criar
//   -- Produtos --
//   GET  /produtos           -> listagem
//   GET  /produtos/novo      -> formulário de novo produto
//   POST /produtos           -> validar entrada e criar
export function criarRotas() {
  const router = Router();

  const categoriasService = new CategoriasService(new CategoriasRepositoryPrisma(prisma));
  const produtosService = new ProdutosService(new ProdutosRepositoryPrisma(prisma))
  const categoriasController = new CategoriasController (categoriasService);
  const produtosController = new ProdutosController(produtosService, categoriasService);

  router.get("/", (req, res) => res.redirect("produtos/index"));
  router.use("produtos/index", criarRotasDeProdutos(produtosController));
  router.use("categorias/index", criarRotasDeCategorias(categoriasController))

  return router;
}
