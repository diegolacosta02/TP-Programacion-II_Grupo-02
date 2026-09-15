import { EstadoPedido } from "./estadopedido";

export default class Pedido {
    private items: ItemPedido[]
    private estado: EstadoPedido
    private modalidad: TipoDePedido

    constructor() {
        this.items = []
        this.estado = "EN_CONSTRUCCION"
        this.modalidad = 
    }

}