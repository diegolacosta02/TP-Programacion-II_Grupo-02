import { CERO } from "../constantes/constantes";
import { Pedido } from "./pedido";

export default class PedidoDelivery extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    public constructor(direccion: string, costoEnvio: number) {
        super();
        if (costoEnvio < CERO) {
            throw new Error("El costo de envío no puede ser negativo.");
        }
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public getCostoEnvio(): number {
        return this.costoEnvio;
    }

    public calcularCostoAdicional(): number {
        return this.costoEnvio;
    }
}
