// Modelo de jugador con comentarios
export class Player {
    name: string;
    secretInfo: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    // Asigna información secreta al jugador
    addSecretInfo(info: string) {
        this.secretInfo.push(info);
    }
}