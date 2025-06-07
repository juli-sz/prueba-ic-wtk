import React from "react";
import { Category } from "../models/Category";

// Componente para mostrar categorías y cantidad de ítems
interface Props {
    categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => (
    <div>
        <h2>Categorías</h2>
        <ul>
            {categories.map((c, i) => (
                <li key={i}>{c.name} ({c.items.length} ítems)</li>
            ))}
        </ul>
    </div>
);

export default Categories;