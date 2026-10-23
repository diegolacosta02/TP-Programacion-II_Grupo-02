import { CERO, CIEN } from "../constantes/constantes";
import { DescuentoCombo } from "./descuentocombo";
import { Menu } from "./menu";

export class DescuentoPorcentual implements DescuentoCombo {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        if (porcentaje < CERO || porcentaje > CIEN) {
            throw new Error("El porcentaje debe estar entre 0 y 100.");
        }
        this.porcentaje = porcentaje;
    }

    public calcular(productos: Menu[]): number {
        const suma = productos.reduce((total, producto) => total + producto.getPrecio(), CERO);
        return suma * (CIEN - this.porcentaje) / CIEN;
    }
}