import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Players from "../../src/components/Players";

describe("Players component", () => {
    it("muestra la lista de jugadores", () => {
        const players = [
            { 
                name: "Ana", 
                secretInfo: [], 
                addSecretInfo: vi.fn(), 
                clearSecretInfo: vi.fn(), 
                getSecretInfo: vi.fn().mockReturnValue([]) 
            },
            { 
                name: "Luis", 
                secretInfo: [], 
                addSecretInfo: vi.fn(), 
                clearSecretInfo: vi.fn(), 
                getSecretInfo: vi.fn().mockReturnValue([]) 
            }
        ];
        render(<Players players={players} />);
        expect(screen.getByText("Ana")).toBeInTheDocument();
        expect(screen.getByText("Luis")).toBeInTheDocument();
    });

    // it("muestra mensaje si no hay jugadores", () => {
    //     render(<Players players={[]} />);
    //     expect(screen.getByText(/jugadores/i)).toBeInTheDocument();
    // });
});