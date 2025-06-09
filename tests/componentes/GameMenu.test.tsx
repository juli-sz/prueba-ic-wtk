import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import GameMenu from "../../src/components/GameMenu";
import Scoreboard from "../../src/components/Scoreboard";

describe("GameMenu component", () => {
    it("llama a onAddPlayer cuando se hace click en 'Agregar jugador'", () => {
        const onAddPlayer = vi.fn();
        render(
            <GameMenu
                onAddPlayer={onAddPlayer}
                onAddCategory={() => {}}
                onStartGame={() => {}}
                onShowScoreboard={() => {}}
            />
        );
        const btn = screen.getByRole("button", { name: /agregar jugador/i });
        fireEvent.click(btn);
        expect(onAddPlayer).toHaveBeenCalled();
    });

    it("llama a onAddCategory cuando se hace click en 'Agregar categoría'", () => {
        const onAddCategory = vi.fn();
        render(
            <GameMenu
                onAddPlayer={() => {}}
                onAddCategory={onAddCategory}
                onStartGame={() => {}}
                onShowScoreboard={() => {}}
            />
        );
        const btn = screen.getByRole("button", { name: /agregar categoría/i });
        fireEvent.click(btn);
        expect(onAddCategory).toHaveBeenCalled();
    });

    it("llama a onStartGame cuando se hace click en 'Iniciar juego'", () => {
        const onStartGame = vi.fn();
        render(
            <GameMenu
                onAddPlayer={() => {}}
                onAddCategory={() => {}}
                onStartGame={onStartGame}
                onShowScoreboard={() => {}}
            />
        );
        const btn = screen.getByRole("button", { name: /iniciar juego/i });
        fireEvent.click(btn);
        expect(onStartGame).toHaveBeenCalled();
    });

    it("llama a onShowScoreboard cuando se hace click en 'Ver marcador'", () => {
        const onShowScoreboard = vi.fn();
        render(
            <GameMenu
                onAddPlayer={() => {}}
                onAddCategory={() => {}}
                onStartGame={() => {}}
                onShowScoreboard={onShowScoreboard}
            />
        );
        const btn = screen.getByRole("button", { name: /ver marcador/i });
        fireEvent.click(btn);
        expect(onShowScoreboard).toHaveBeenCalled();
    });
});

describe("Scoreboard component", () => {
    it("muestra el título del marcador", () => {
        render(<Scoreboard winners={["Ana"]} />);
        expect(screen.getByText(/marcador/i)).toBeInTheDocument();
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
        expect(screen.getByText(/marcador/i)).toBeInTheDocument();
        // No debe haber ningún <li>
        expect(screen.queryAllByRole("listitem").length).toBe(0);
    });
});