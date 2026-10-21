import { CERO } from "./constantes/constantes";
import { EstadoPedido } from "./constantes/estadopedido";
import Pedido from "./pedido";

export default class PedidoParaRetirar extends Pedido {
    private horario: number

    public constructor() {
        super()
        this.horario = 0
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public puedeRetirar(pedido: Pedido): boolean {
        
        return pedido.getEstado() === EstadoPedido.FINALIZADO
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public calcularCostoAdicional(): number {
        return CERO
    }

}