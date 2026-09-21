import { Menu } from "./menu";
import { TipoDeDescuento } from "./tipodedescuento";
import { TipoEstacionTrabajo } from "./tipoEstacion";

export default class Combo extends Menu {
    private productos: Menu[]
    private tipoDescuento: TipoDeDescuento

    constructor(nombre: string, precio: number, tipoDescuento: TipoDeDescuento) {
        super(nombre, precio);
        this.productos = new Array
        this.tipoDescuento = tipoDescuento;
    }

    public getPrecio(): number {
        return this.tipoDescuento.calcular(this.productos);
    }

    public getEstacionDetrabajo(): TipoEstacionTrabajo {
        
        return TipoEstacionTrabajo.BARRA // placeholder, crear logica adecuada
    }

}