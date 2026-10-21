import Descuento from "./mediosdepago/descuento";
import { MedioDePago } from "./mediosdepago/mediodepago";
import SinDescuento from "./mediosdepago/sindescuento";

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

        this.descuentoAplicado = this.elegirMejor(descuentos)
        this.montoDescuento = this.descuentoAplicado.calcular(subTotal);
        this.total = subTotal - this.montoDescuento;
    }

    public getNombreDescuento(): string {
        return this.descuentoAplicado.getNombre();
    }

    public getTotal(): number {
        return this.total;
    }

    private elegirMejor(descuentos: Descuento[]): Descuento {
        return descuentos.filter(descuento => descuento.aplica(this.medioDePago, this.fecha))
        .reduce((mejor, actual) =>
            actual.calcular(this.subTotal) > mejor.calcular(this.subTotal) ? actual : mejor,
            new SinDescuento()
        );
    }

}