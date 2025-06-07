import { describe, it, expect } from "vitest";
import { Player } from "../src/models/Player";

describe("Player", () => {
    it("agrega información secreta", () => {
        const player = new Player("Test");
        player.addSecretInfo("Secreto1");
        expect(player.secretInfo[0]).toBe("Secreto1");
    });
});