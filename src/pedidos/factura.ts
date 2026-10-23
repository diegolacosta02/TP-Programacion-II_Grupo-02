import Descuento from "../descuentos/descuento";
import { MedioDePago } from "../constantes/mediodepago";
import SelectorDeDescuento from "../descuentos/selectordedescuento";

export default class Factura {
    private detalle: string[]
    private subTotal: number;
    private medioDePago: MedioDePago;
    private fecha: Date;
    private descuentoAplicado: Descuento
    private montoDescuento: number;
    private total: number;

    public constructor(detalle: string[], subTotal: number, medioP: MedioDePago, descuentos: Descuento[], fecha: Date) {
        this.detalle = detalle;
        this.subTotal = subTotal;
        this.medioDePago = medioP;
        this.fecha = new Date(fecha);

        this.descuentoAplicado = new SelectorDeDescuento(descuentos).elegirMejor(subTotal, medioP, this.fecha)
        this.montoDescuento = this.descuentoAplicado.calcular(subTotal);
        this.total = subTotal - this.montoDescuento;
    }

    public getNombreDescuento(): string {
        return this.descuentoAplicado.getNombre();
    }

    public getTotal(): number {
        return this.total;
    }

    public getDetalle(): string[] {
        return this.detalle
    }

    public getSubtotal(): number {
        return this.subTotal;
    }

    public getMedioPago(): MedioDePago {
        return this.medioDePago;
    }

    public mostrarDetalle(): void {
        this.detalle.forEach(linea => {
            console.log(linea)
        });
    }
}