import { Menu } from "./menu";

export interface DescuentoCombo {
    calcular(productos: Menu[]): number;
}