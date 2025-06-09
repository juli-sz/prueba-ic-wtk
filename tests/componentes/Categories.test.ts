import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {Categories} from "../components/Categories";

describe("Categories component", () => {
    it("muestra la lista de categorías", () => {
        const categories = [
            { name: "Armas", items: ["Cuchillo", "Pistola"] },
            { name: "Lugares", items: ["Cocina", "Sala"] }
        ];
        render(<Categories categories={categories} />);
        expect(screen.getByText("Armas")).toBeDefined();
        expect(screen.getByText("Lugares")).toBeDefined();
    });

    it("muestra mensaje si no hay categorías", () => {
        render(<Categories categories={[]} />);
        expect(screen.getByText(/categorías/i)).toBeDefined();
    });
});