import { Router } from "express";

export function criarRotasDeCategorias(controller) {
    const rotas = Router();

    rotas.get("/categorias", controller.index);
    rotas.get("/categorias/nova", controller.novo);
    rotas.post("/categorias", controller.criar);

    return rotas;
}
