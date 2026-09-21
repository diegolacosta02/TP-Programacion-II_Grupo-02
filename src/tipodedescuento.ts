import { Menu } from "./menu";

export interface TipoDeDescuento {
    calcular(productos: Menu[]): number;
}