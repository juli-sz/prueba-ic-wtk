import React from "react";
import { Category } from "../models/Category";

// Componente opcional para mostrar ítems de cada categoría
interface Props {
    categories: Category[];
}

const Items: React.FC<Props> = ({ categories }) => (
    <div>
        <h2>Ítems por Categoría</h2>
        {categories.map((c, i) => (
            <div key={i}>
                <strong>{c.name}</strong>
                <ul>
                    {c.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

export default Items;