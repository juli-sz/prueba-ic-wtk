import { describe, it, expect } from "vitest";
import { Category } from "../src/models/Category";

describe("Category", () => {
    it("agrega items correctamente", () => {
        const cat = new Category("Test");
        cat.addItem("Item1");
        expect(cat.items.length).toBe(1);
        expect(cat.items[0]).toBe("Item1");
    });

    it("mezcla los items", () => {
        const cat = new Category("Test");
        cat.items = ["A", "B", "C"];
        cat.shuffleItems();
        expect(cat.items.length).toBe(3);
    });
});