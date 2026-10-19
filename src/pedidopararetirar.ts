import Pedido from "./pedido";

export default class PedidoParaRetirar extends Pedido {
    private horario: number

    constructor() {
        this.horario = 0
    }

    public puedeRetirar(p: Pedido): boolean {
        return p.getEstado() === "FINALIZADO"
    }

    public calcularCostoAdicional(): number {
        return 0
    }

}