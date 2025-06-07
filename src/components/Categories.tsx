import React from "react";
import { Category } from "../models/Category";

/**
 * Componente: Categories
 * Responsabilidad: Mostrar la lista de categorías y la cantidad de ítems en cada una.
 * Colaboradores: Recibe un array de Category como prop.
 */
interface Props {
    categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => (
    <div>
        <h2>Categorías</h2>
        <ul>
            {categories.map((c, i) => (
                <li key={i}>
                    {/* Muestra el nombre de la categoría y la cantidad de ítems */}
                    {c.name} ({c.items.length} ítems)
                </li>
            ))}
        </ul>
    </div>
);

export default Categories;