// Modelo de categoría con comentarios
export class Category {
    name: string;
    items: string[];

    constructor(name: string) {
        this.name = name;
        this.items = [];
    }

    // Agrega un item a la categoría
    addItem(item: string) {
        this.items.push(item);
    }

    // Mezcla los ítems usando Fisher-Yates
    shuffleItems() {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }
}