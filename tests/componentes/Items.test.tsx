import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Items from "../../src/components/Items";
import '@testing-library/jest-dom';

describe("Items component", () => {
    it("muestra los ítems de cada categoría", () => {
        const categories = [
            {
                name: "Armas",
                items: ["Cuchillo", "Pistola"],
                addItem: () => {},
                removeItem: () => {},
                shuffleItems: () => {},
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; },
                // Add any other required properties/methods if needed
            },
            {
                name: "Lugares",
                items: ["Cocina", "Sala"],
                addItem: () => {},
                removeItem: () => {},
                shuffleItems: () => {},
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; },
                // Add any other required properties/methods if needed
            }
        ];
        render(<Items categories={categories} />);
        expect(screen.getByText("Armas")).toBeInTheDocument();
        expect(screen.getByText("Cuchillo")).toBeInTheDocument();
        expect(screen.getByText("Pistola")).toBeInTheDocument();
        expect(screen.getByText("Lugares")).toBeInTheDocument();
        expect(screen.getByText("Cocina")).toBeInTheDocument();
        expect(screen.getByText("Sala")).toBeInTheDocument();
    });

    it("muestra mensaje si no hay categorías", () => {
        render(<Items categories={[]} />);
        expect(screen.getByText(/no hay categorías/i)).toBeInTheDocument();
    });
});