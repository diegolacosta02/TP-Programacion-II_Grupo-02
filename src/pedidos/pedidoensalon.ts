import { COSTO_MESA } from "../constantes/constantes";
import { Pedido } from "./pedido";

export default class PedidoEnSalon extends Pedido {
    private mesa: number;
    private propinaMozo: number;

    public constructor(mesa: number, propina: number) {
        super();
        this.mesa = mesa;
        this.propinaMozo = propina
    }

    public getMesa(): number {
        return this.mesa;
    }

    public calcularCostoAdicional(): number {
        return COSTO_MESA + this.propinaMozo;
    }
}
