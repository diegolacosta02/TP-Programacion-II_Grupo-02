import { Menu } from "./menu";
import { TipoDeDescuento } from "./tipodedescuento";
import { TipoEstacionTrabajo } from "./tipoEstacion";

export default class Combo extends Menu {
    private productos: Menu[];
    private tipoDescuento: TipoDeDescuento;

    constructor(nombre: string, precio: number, tipoDescuento: TipoDeDescuento) {
        super(nombre, precio);
        this.productos = [];
        this.tipoDescuento = tipoDescuento;
    }

    public agregarProducto(p: Menu): void {
        this.productos.push(p);
    }

    public getProductos(): Menu[] {
        return this.productos;
    }

    public getPrecio(): number {
        return this.tipoDescuento.calcular(this.productos);
    }
}