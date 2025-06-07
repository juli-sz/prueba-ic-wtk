import React from "react";

// Componente marcador, muestra ganadores (simulado)
interface Props {
    winners: string[];
}

const Scoreboard: React.FC<Props> = ({ winners }) => (
    <div>
        <h2>Marcador (Ganadores previos)</h2>
        <ul>
            {winners.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
    </div>
);

export default Scoreboard;