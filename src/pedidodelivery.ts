import { TipoDePedido } from "./tipodepedido";

export default class PedidoDelivery implements TipoDePedido {
    private direccion: string;
    private costoEnvio: number;

    constructor(direccion: string) {
        this.direccion = direccion;
        this.costoEnvio = 2500;
    }

    public calcularCostoAdicional(): number {
        return this.costoEnvio;
    }
}