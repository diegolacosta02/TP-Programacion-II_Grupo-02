import { CERO, CIEN } from "../constantes/constantes";
import Descuento from "./descuento";
import { MedioDePago } from "../constantes/mediodepago";

export default class DescuentoEfectivo implements Descuento {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        if (porcentaje < CERO || porcentaje > CIEN) {
            throw new Error("El porcentaje debe estar entre 0 y 100.");
        }
        this.porcentaje = porcentaje;
    }

    public getNombre(): string {
        return `Descuento por pago en efectivo (${this.porcentaje}%)`;
    }
// eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public aplica(medioPago: MedioDePago): boolean {
        return medioPago === MedioDePago.EFECTIVO;
    }

    public calcular(subtotal: number): number {
        return subtotal * this.porcentaje / CIEN;
    }
}