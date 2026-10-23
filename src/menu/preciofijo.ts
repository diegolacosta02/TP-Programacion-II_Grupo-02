import { CERO } from "../constantes/constantes";
import { DescuentoCombo } from "./descuentocombo";
import { Menu } from "./menu";

export class PrecioFijo implements DescuentoCombo {
    private precio: number;

    public constructor(precio: number) {
        if (precio < CERO) {
            throw new Error("El precio fijo no puede ser negativo.");
        }
        this.precio = precio;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public calcular(productos: Menu[]): number {
        return this.precio;
    }
}