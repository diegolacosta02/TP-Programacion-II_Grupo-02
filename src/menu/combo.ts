import { Menu } from "./menu";
import { DescuentoCombo } from "./descuentocombo";
import { MINIMO_PRODUCTOS_COMBO } from "../constantes/constantes";
import Producto from "./producto";

export default class Combo extends Menu {
    private productos: Menu[];
    private tipoDescuento: DescuentoCombo;

    public constructor(nombre: string, tipoDescuento: DescuentoCombo) {
        super(nombre);
        this.productos = [];
        this.tipoDescuento = tipoDescuento;
    }

    public agregarProducto(producto: Menu): void {
        if (producto === this) {
            throw new Error("Un combo no puede contenerse a sí mismo.");
        }
        this.productos.push(producto);
    }

    public getProductos(): Menu[] {
        return this.productos;
    }

    public getPrecio(): number {
        this.validarCompleto();
        return this.tipoDescuento.calcular(this.productos);
    }

    public getProductosSimples(): Producto[] {
        this.validarCompleto();
        return this.productos.flatMap(producto => producto.getProductosSimples());
    }

    private validarCompleto(): void {
        if (this.productos.length < MINIMO_PRODUCTOS_COMBO) {
            throw new Error(`Un combo debe tener al menos ${MINIMO_PRODUCTOS_COMBO} productos.`);
        }
    }
}