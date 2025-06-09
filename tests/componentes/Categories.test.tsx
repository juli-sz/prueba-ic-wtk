import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
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
                // Add any other required properties/methods here
            },
            {
                name: "Lugares",
                items: ["Cocina", "Sala"],
                addItem: vi.fn(),
                removeItem: vi.fn(),
                shuffleItems: vi.fn(),
                getItems: function () { return this.items; },
                // Add any other required properties/methods here
            }
        ];
        render(<Categories categories={categories as any} />);
        expect(screen.getByText("Armas")).toBeInTheDocument();
        expect(screen.getByText("Lugares")).toBeInTheDocument();
    });

    it("muestra mensaje si no hay categorías", () => {
        render(<Categories categories={[]} />);
        expect(screen.getByText(/categorías/i)).toBeInTheDocument();
    });
});