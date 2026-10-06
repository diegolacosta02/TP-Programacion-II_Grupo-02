import Pedido from "./pedido";
import { TipoDePedido } from "./tipodepedido";

export default class PedidoParaRetirar implements TipoDePedido {
    private horario: number

    constructor() {
        this.horario = 0
    }

    /*public puedeRetirar(p: Pedido): boolean {
        return p.getEstado() === "FINALIZADO"
    } este metodo deberia estar en pedido directamente */ 

    public calcularCostoAdicional(): number {
        return 0
    }

}