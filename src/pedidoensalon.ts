import { TipoDePedido } from "./tipodepedido";

export default class PedidoEnSalon implements TipoDePedido {
    private mesa: number;
    private propinaMozo: number;

    constructor(mesa: number) {
        this.mesa = mesa;
        this.propinaMozo = 1000
    }

    public calcularCostoAdicional(): number {
        return this.propinaMozo;
    }

}