import { MedioDePago } from "./mediodepago";


export default interface Descuento {
    getNombre(): string;
    aplica(medioPago: MedioDePago, fecha: Date): boolean;
    calcular(subtotal: number): number;
}