// Datos iniciales simulados para el juego
import { Category } from "./models/Category";
import { Player } from "./models/Player";

export const initialCategories = [
    (() => { const c = new Category("Armas"); c.items = ["Cuchillo", "Cuerda", "Pistola"]; return c; })(),
    (() => { const c = new Category("Lugares"); c.items = ["Cocina", "Sala", "Patio"]; return c; })(),
];
export const initialPlayers = [
    new Player("Juli"),
    new Player("Lia"),
];