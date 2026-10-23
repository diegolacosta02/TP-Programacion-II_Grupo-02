import Pedido from "./pedido";

export default class PedidoDelivery extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    public constructor(direccion: string) {
        super()
        this.direccion = direccion;
        this.costoEnvio = 2500;
    }

    public calcularCostoAdicional(): number {
        return this.costoEnvio;
    }
}