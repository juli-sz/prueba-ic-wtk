import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Scoreboard from "../../src/components/Scoreboard";

describe("Scoreboard component", () => {
    it("muestra el título del marcador", () => {
        render(<Scoreboard winners={["Ana"]} />);
        expect(screen.getByText(/marcador \(ganadores previos\)/i)).toBeInTheDocument();
    });

    it("muestra todos los ganadores provistos", () => {
        const winners = ["Ana", "Luis", "Pedro"];
        render(<Scoreboard winners={winners} />);
        winners.forEach(winner => {
            expect(screen.getByText(winner)).toBeInTheDocument();
        });
    });

    it("muestra lista vacía si no hay ganadores", () => {
        render(<Scoreboard winners={[]} />);
        // El título siempre debe estar
        expect(screen.getByText(/marcador \(ganadores previos\)/i)).toBeInTheDocument();
        // No debe haber ningún <li>
        expect(screen.queryAllByRole("listitem").length).toBe(0);
    });
});