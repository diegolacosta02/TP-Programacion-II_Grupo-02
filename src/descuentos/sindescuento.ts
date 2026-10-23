/* eslint-disable @typescript-eslint/class-methods-use-this */
import { CERO } from "../constantes/constantes";
import Descuento from "./descuento";

export default class SinDescuento implements Descuento {
    public getNombre(): string {
        return "Sin descuento";
    }

    public aplica(): boolean {
        return true;
    }

    public calcular(subtotal: number): number {
        return subtotal * CERO;
    }
}