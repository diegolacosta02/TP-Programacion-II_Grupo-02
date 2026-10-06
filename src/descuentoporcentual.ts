import { Menu } from "./menu";
import { TipoDeDescuento } from "./tipodedescuento";

export default class DescuentoPorcentual implements TipoDeDescuento {
    private descuentoPorcentual:number
   
    constructor(descuento: number) {
        this.descuentoPorcentual = descuento;
    }
    calcular(productos: Menu[]): number {
        return this.getTotalProductos(productos) * this.descuentoPorcentual;
    }

    private getTotalProductos(productos: Menu[]): number {
        let acum: number = 0;
    
        productos.forEach(producto => {
            acum += producto.getPrecio();
        });

        return acum;
    }
}