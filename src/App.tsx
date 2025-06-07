import React, { useState } from "react";
import { Player } from "./models/Player";
import { Category } from "./models/Category";
import { initialPlayers, initialCategories } from "./data";
import GameMenu from "./components/GameMenu";
import Players from "./components/Players";
import Categories from "./components/Categories";
import Scoreboard from "./components/Scoreboard";
import "./styles.css";

// Paso a paso del juego:
// 1. Muestra menú para agregar jugadores/categorías o iniciar el juego.
// 2. Permite ver los jugadores y categorías actuales.
// 3. Al iniciar el juego, reparte información secreta y muestra alerts.
// 4. Permite ver el marcador de ganadores.

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([...initialPlayers]);
    const [categories, setCategories] = useState<Category[]>([...initialCategories]);
    const [winners, setWinners] = useState<string[]>(["Juli", "Lia"]); // Simulado

    // Agrega jugador usando prompt
    const handleAddPlayer = () => {
        const name = prompt("Nombre del jugador:");
        if (name) setPlayers([...players, new Player(name)]);
    };

    // Agrega categoría usando prompt
    const handleAddCategory = () => {
        const name = prompt("Nombre de la categoría:");
        if (name) setCategories([...categories, new Category(name)]);
    };

    // Inicia el juego, reparte ítems y muestra alerts
    const handleStartGame = () => {
        if (players.length < 2 || categories.length < 2) {
            alert("Debe haber al menos 2 jugadores y 2 categorías.");
            return;
        }
        const info: string[] = [];
        categories.forEach(cat => {
            cat.shuffleItems();
            const item = cat.items[0];
            info.push(item);
        });
        players.forEach((player, i) => {
            player.secretInfo = [];
            categories.forEach((cat, j) => {
                player.addSecretInfo(info[j]);
            });
            alert(`Información secreta de ${player.name}: ${player.secretInfo.join(", ")}`);
        });
        alert("¡El juego ha comenzado!");
    };

    // Muestra marcador de ganadores (simulado)
    const handleShowScoreboard = () => {
        alert("Ganadores previos: " + winners.join(", "));
    };

    return (
        <div className="container">
            <h1>Who's the Killer?</h1>
            <GameMenu
                onAddPlayer={handleAddPlayer}
                onAddCategory={handleAddCategory}
                onStartGame={handleStartGame}
                onShowScoreboard={handleShowScoreboard}
            />
            <Players players={players} />
            <Categories categories={categories} />
            {/* <Scoreboard winners={winners} /> */}
        </div>
    );
};

export default App;