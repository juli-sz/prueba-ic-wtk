import React from "react";

// Componente de menú principal con comentarios
interface Props {
    onAddPlayer: () => void;
    onAddCategory: () => void;
    onStartGame: () => void;
    onShowScoreboard: () => void;
}

const GameMenu: React.FC<Props> = ({
                                       onAddPlayer,
                                       onAddCategory,
                                       onStartGame,
                                       onShowScoreboard,
                                   }) => (
    <div className="menu">
        <button onClick={onAddPlayer}>Agregar Jugador</button>
        <button onClick={onAddCategory}>Agregar Categoría</button>
        <button onClick={onStartGame}>Comenzar Juego</button>
        <button onClick={onShowScoreboard}>Ver Marcador</button>
    </div>
);

export default GameMenu;