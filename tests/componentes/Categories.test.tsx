import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Categories from "../../src/components/Categories";

describe("Categories component", () => {
    it("muestra la lista de categorías", () => {
        const categories = [
            {
                name: "Armas",
                items: ["Cuchillo", "Pistola"],
                addItem: vi.fn(),
                removeItem: vi.fn(),
                shuffleItems: vi.fn(),
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; }
            },
            {
                name: "Lugares",
                items: ["Cocina", "Sala"],
                addItem: vi.fn(),
                removeItem: vi.fn(),
                shuffleItems: vi.fn(),
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; }
            }
        ];
        render(<Categories categories={categories} />);
        expect(screen.getByText("Armas")).toBeDefined();
        expect(screen.getByText("Lugares")).toBeDefined();
    });

    // it("muestra mensaje si no hay categorías", () => {
    //     render(<Categories categories={[]} />);
    //     expect(screen.getByText(/categorías/i)).toBeDefined();
    // });
});