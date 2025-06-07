import React from "react";
import { Player } from "../models/Player";

// Componente para mostrar jugadores
interface Props {
    players: Player[];
}

const Players: React.FC<Props> = ({ players }) => (
    <div>
        <h2>Jugadores</h2>
        <ul>
            {players.map((p, i) => (
                <li key={i}>{p.name}</li>
            ))}
        </ul>
    </div>
);

export default Players;