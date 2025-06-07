import React, { useState } from "react";
import { Player } from "./models/Player";
import { Category } from "./models/Category";
import { initialPlayers, initialCategories } from "./data";
import GameMenu from "./components/GameMenu";
import Players from "./components/Players";
import Categories from "./components/Categories";
import Items from "./components/Items";
import Scoreboard from "./components/Scoreboard";
import "./App.css"; // Importa el CSS para estilos

// Componente principal de la aplicación
const App: React.FC = () => {
    // Estado para la lista de jugadores
    const [players, setPlayers] = useState<Player[]>([...initialPlayers]);
    // Estado para la lista de categorías
    const [categories, setCategories] = useState<Category[]>([...initialCategories]);
    // Estado para la lista de ganadores (simulado)
    const [winners, setWinners] = useState<string[]>(["Juli", "Lia"]); // Simulado
    // Estado para mostrar/ocultar el marcador
    const [showScoreboard, setShowScoreboard] = useState(false);

    // Estado para edición
    const [editMode, setEditMode] = useState(false);
    const [editSection, setEditSection] = useState<"jugadores" | "categorias" | "items" | null>(null);
    const [editedPlayers, setEditedPlayers] = useState<string[]>(players.map(p => p.name));
    const [editedCategories, setEditedCategories] = useState<string[]>(categories.map(c => c.name));
    const [editedItems, setEditedItems] = useState<string[][]>(categories.map(c => [...c.items]));

    // --- Jugadores ---
    const handleAddPlayer = () => {
        const name = prompt("Nombre del jugador:");
        if (name) setPlayers([...players, new Player(name)]);
    };

    // --- Categorías ---
    const handleAddCategory = () => {
        const name = prompt("Nombre de la categoría:");
        if (name) {
            setCategories([...categories, new Category(name)]);
            setEditedCategories([...editedCategories, name]);
            setEditedItems([...editedItems, []]);
        }
    };

    // --- Ítems ---
    const handleAddItemToCategory = (categoryIndex: number) => {
        const item = prompt("Nuevo ítem para la categoría:");
        if (item) {
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].addItem(item);
            setCategories(updatedCategories);

            // También actualiza el estado de edición de ítems si está en modo edición
            const updatedEditedItems = [...editedItems];
            updatedEditedItems[categoryIndex] = [...updatedEditedItems[categoryIndex], item];
            setEditedItems(updatedEditedItems);
        }
    };

    // --- Juego ---
    const handleStartGame = () => {
        if (players.length < 2 || categories.length < 2) {
            alert("Debe haber al menos 2 jugadores y 2 categorías.");
            return;
        }
        if (categories.some(cat => cat.items.length === 0)) {
            alert("Cada categoría debe tener al menos un ítem.");
            return;
        }

        const tempItemsByCategory = categories.map(cat => {
            const itemsCopy = [...cat.items];
            for (let i = itemsCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
            }
            return itemsCopy;
        });

        for (let i = 0; i < categories.length; i++) {
            if (tempItemsByCategory[i].length < players.length) {
                alert(`No hay suficientes ítems en la categoría "${categories[i].name}" para repartir a todos los jugadores.`);
                return;
            }
        }

        players.forEach((player, playerIdx) => {
            player.secretInfo = [];
            categories.forEach((cat, catIdx) => {
                const item = tempItemsByCategory[catIdx].shift();
                if (item) {
                    player.addSecretInfo(item);
                }
            });
            alert(`Información secreta de ${player.name}: ${player.secretInfo.join(", ")}`);
        });

        alert("¡El juego ha comenzado!");
    };

    const handleShowScoreboard = () => {
        setShowScoreboard(!showScoreboard);
    };

    // --- Guardar cambios de edición ---
    const handleSavePlayers = () => {
        setPlayers(editedPlayers.map(name => new Player(name)));
        setEditMode(false);
        setEditSection(null);
    };

    const handleSaveCategories = () => {
        // Actualiza las categorías y sus ítems
        const newCategories = editedCategories.map((name, idx) => new Category(name, editedItems[idx]));
        setCategories(newCategories);
        setEditMode(false);
        setEditSection(null);
    };

    // --- Agregar desde edición ---
    const handleAddPlayerEdit = () => {
        const name = prompt("Nombre del jugador:");
        if (name) setEditedPlayers([...editedPlayers, name]);
    };

    const handleAddCategoryEdit = () => {
        const name = prompt("Nombre de la categoría:");
        if (name) {
            setEditedCategories([...editedCategories, name]);
            setEditedItems([...editedItems, []]);
        }
    };

    const handleAddItemEdit = (catIdx: number) => {
        const item = prompt("Nuevo ítem para la categoría:");
        if (item) {
            const updated = [...editedItems];
            updated[catIdx] = [...updated[catIdx], item];
            setEditedItems(updated);
        }
    };

    // --- Eliminar jugador/categoría/ítem desde edición ---
    const handleRemovePlayerEdit = (idx: number) => {
        setEditedPlayers(editedPlayers.filter((_, i) => i !== idx));
    };

    const handleRemoveCategoryEdit = (idx: number) => {
        setEditedCategories(editedCategories.filter((_, i) => i !== idx));
        setEditedItems(editedItems.filter((_, i) => i !== idx));
    };

    const handleRemoveItemEdit = (catIdx: number, itemIdx: number) => {
        const updated = [...editedItems];
        updated[catIdx] = updated[catIdx].filter((_, i) => i !== itemIdx);
        setEditedItems(updated);
    };

    // --- Render ---
    return (
        <div className="container">
            <h1>Who's the Killer?</h1>
            <GameMenu
                onAddPlayer={handleAddPlayer}
                onAddCategory={handleAddCategory}
                onStartGame={handleStartGame}
                onShowScoreboard={handleShowScoreboard}
                editMode={editMode}
            />
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? "Salir de edición" : "Editar juego"}
            </button>
            {editMode && (
                <div style={{ margin: "1em 0" }}>
                    <button onClick={() => setEditSection("jugadores")}>Editar jugadores</button>
                    <button onClick={() => setEditSection("categorias")}>Editar categorías</button>
                    <button onClick={() => setEditSection("items")}>Editar ítems</button>
                </div>
            )}
            {/* Edición de jugadores */}
            {editMode && editSection === "jugadores" && (
                <div style={{ margin: "1em 0" }}>
                    <h2>Editar jugadores</h2>
                    {editedPlayers.map((name, idx) => (
                        <div key={idx} style={{ marginBottom: "0.5em" }}>
                            <label>Jugador {idx + 1}: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => {
                                    const newPlayers = [...editedPlayers];
                                    newPlayers[idx] = e.target.value;
                                    setEditedPlayers(newPlayers);
                                }}
                            />
                            <button onClick={() => handleRemovePlayerEdit(idx)} style={{ marginLeft: "0.5em" }}>Eliminar</button>
                        </div>
                    ))}
                    <button onClick={handleAddPlayerEdit}>Agregar jugador</button>
                    <button onClick={handleSavePlayers} style={{ marginLeft: "1em" }}>Guardar cambios</button>
                </div>
            )}
            {/* Edición de categorías */}
            {editMode && editSection === "categorias" && (
                <div style={{ margin: "1em 0" }}>
                    <h2>Editar categorías</h2>
                    {editedCategories.map((name, idx) => (
                        <div key={idx} style={{ marginBottom: "0.5em" }}>
                            <label>Categoría {idx + 1}: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => {
                                    const newCategories = [...editedCategories];
                                    newCategories[idx] = e.target.value;
                                    setEditedCategories(newCategories);
                                }}
                            />
                            <button onClick={() => handleRemoveCategoryEdit(idx)} style={{ marginLeft: "0.5em" }}>Eliminar</button>
                        </div>
                    ))}
                    <button onClick={handleAddCategoryEdit}>Agregar categoría</button>
                    <button onClick={handleSaveCategories} style={{ marginLeft: "1em" }}>Guardar cambios</button>
                </div>
            )}
            {/* Edición de ítems */}
            {editMode && editSection === "items" && (
                <div style={{ margin: "1em 0" }}>
                    <h2>Editar ítems de cada categoría</h2>
                    {editedCategories.map((catName, catIdx) => (
                        <div key={catIdx} style={{ marginBottom: "1em" }}>
                            <strong>{catName}</strong>
                            <ul>
                                {editedItems[catIdx]?.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...editedItems];
                                                updated[catIdx][itemIdx] = e.target.value;
                                                setEditedItems(updated);
                                            }}
                                        />
                                        <button onClick={() => handleRemoveItemEdit(catIdx, itemIdx)} style={{ marginLeft: "0.5em" }}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleAddItemEdit(catIdx)}>Agregar ítem</button>
                        </div>
                    ))}
                    <button onClick={handleSaveCategories}>Guardar cambios</button>
                </div>
            )}
            {/* Lista de jugadores */}
            <Players players={players} />
            {/* Lista de categorías */}
            <Categories categories={categories} />
            {/* Permitir agregar ítems a cada categoría SOLO en modo edición */}
            <Items categories={categories} />
            {editMode && categories.map((cat, idx) => (
                <button key={idx} onClick={() => handleAddItemToCategory(idx)}>
                    Agregar ítem a {cat.name}
                </button>
            ))}
            {/* Marcador de ganadores */}
            {showScoreboard && <Scoreboard winners={winners} />}
            <button onClick={() => {
                setPlayers([...initialPlayers]);
                setCategories([...initialCategories]);
                setEditedPlayers(initialPlayers.map(p => p.name));
                setEditedCategories(initialCategories.map(c => c.name));
                setEditedItems(initialCategories.map(c => [...c.items]));
            }}>Restablecer juego</button>
        </div>
    );
};

export default App;