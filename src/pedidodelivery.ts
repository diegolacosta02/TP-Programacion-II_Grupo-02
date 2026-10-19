import Pedido from "./pedido";

export default class PedidoDelivery extends Pedido {
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