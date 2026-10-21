import Comando from "./comando";
import ItemPedido from "../itempedido";
import Stack from "./stack";

export default class ComandoAgregar implements Comando {
    private items: Stack<ItemPedido>;
    private item: ItemPedido;

    public constructor(items: Stack<ItemPedido>, item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    public ejecutar(): void {
        this.items.push(this.item);
    }

    public deshacer(): void {
        this.items.pop();
    }
}