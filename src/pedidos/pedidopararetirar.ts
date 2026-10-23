import { COSTO_RETIRO } from "../constantes/constantes";
import { Pedido } from "./pedido";

export default class PedidoParaRetirar extends Pedido {
    private horario: Date
    
    public constructor(horario: Date) {
        super()
        this.horario = horario
    }

    public puedeRetirar(ahora: Date): boolean {
        return this.puedeFacturarse() && ahora >= this.horario;
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public calcularCostoAdicional(): number {
        return COSTO_RETIRO;
    }

}