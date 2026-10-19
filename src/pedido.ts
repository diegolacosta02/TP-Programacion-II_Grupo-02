import { EstadoPedido } from "./estadopedido";
import ItemPedido from "./itempedido";
import Stack from "./estructurasdedatos/stack";

export default class Pedido {
    private items: Stack<ItemPedido>
    private estado: EstadoPedido
    private modalidad: TipoDePedido

    constructor(modalidad: TipoDePedido) {
        this.items = new Stack
        this.estado = EstadoPedido.EN_CONSTRUCCION
        this.modalidad = modalidad;
    }
    
    public getEstado(): string {
        return this.estado.toString()
    }

    public agregarItem(item: ItemPedido): void{
        this.items.push(item);
    }

    public quitarUltimoItem(): void{
        if (this.items.length === 0) {
            throw new Error("No hay ningun item en la lista");
        }
        
        this.items.pop()
    }
    
    public confirmar(): void {
        this.estado = EstadoPedido.CONFIRMADO;
    }
}