import Comando from "./comando";
import ItemPedido from "../itempedido";
import Stack from "./stack";

export default class ComandoQuitar implements Comando {
    private items: Stack<ItemPedido>;
    private itemQuitado?: ItemPedido;

    public constructor(items: Stack<ItemPedido>) {
        this.items = items;
    }

    public ejecutar(): void {
        this.itemQuitado = this.items.pop();
    }

    public deshacer(): void {
        if (!this.itemQuitado) {
            throw new Error("No se puede deshacer un comando que no fue ejecutado.");
        }
        this.items.push(this.itemQuitado);
        this.itemQuitado = undefined;
    }
}