import { Router } from "express";

export function criarRotasDeProdutos(controller) {
    const rotas = Router();

    rotas.get("/produtos", controller.index);
    rotas.get("/produtos/nova", controller.novo);
    rotas.post("/produtos", controller.criar);

    return rotas;
}
