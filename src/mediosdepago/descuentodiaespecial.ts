import { CERO, CIEN } from "../constantes/constantes";
import Descuento from "./descuento";
import { MedioDePago } from "./mediodepago";

export default class DescuentoDiaEspecial implements Descuento {
    private diaSemana: number;
    private porcentaje: number;

    public constructor(diaSemana: number, porcentaje: number) {
        if (porcentaje < CERO || porcentaje > CIEN) {
            throw new Error("El porcentaje debe estar entre 0 y 100.");
        }
        this.diaSemana = diaSemana;
        this.porcentaje = porcentaje;
    }

    public getNombre(): string {
        return `Descuento de día especial (${this.porcentaje}%)`;
    }

    public aplica(_medioPago: MedioDePago, fecha: Date): boolean {
        return fecha.getDay() === this.diaSemana;
    }

    public calcular(subtotal: number): number {
        return subtotal * this.porcentaje / CIEN;
    }
}