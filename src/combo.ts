import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";
import { DescuentoCombo } from "./descuentocombo";

export default class Combo extends Menu {
    private productos: Menu[];
    private tipoDescuento: DescuentoCombo;

    public constructor(nombre: string, precio: number, tipoDescuento: DescuentoCombo) {
        super(nombre, precio);
        this.productos = [];
        this.tipoDescuento = tipoDescuento;
    }

    public agregarProducto(producto: Menu): void {
        this.productos.push(producto);
    }

    public getProductos(): Menu[] {
        return this.productos;
    }

    public getPrecio(): number {
        return this.tipoDescuento.calcular(this.productos);
    }

    public getEstacionDeTrabajo(nombreProducto: string): TipoEstacionTrabajo {
        let estacionBuscada: TipoEstacionTrabajo = undefined as unknown as TipoEstacionTrabajo;

        this.productos.forEach(producto => {
            if (producto.getNombre() === nombreProducto) {
                estacionBuscada = producto.getEstacionDeTrabajo(nombreProducto);
            }
        });

        return estacionBuscada
    }
}