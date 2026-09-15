import { EstadoPedido } from "./estadopedido";
import ItemPedido from "./itempedido";
import { TipoDePedido } from "./tipodepedido";

export default class Pedido {
    private items: ItemPedido[]
    private estado: EstadoPedido
    private modalidad: TipoDePedido

    constructor(modalidad: TipoDePedido) {
        this.items = []
        this.estado = EstadoPedido.EN_CONSTRUCCION
        this.modalidad = modalidad;
    }
    
    public getEstado(): string {
        return this.estado.toString()
    }

}