import Descuento from "./descuento";
import { MedioDePago } from "../constantes/mediodepago";
import SinDescuento from "./sindescuento";

export default class SelectorDeDescuento {
    private descuentos: Descuento[];

    public constructor(descuentos: Descuento[]) {
        this.descuentos = descuentos;
    }

    public elegirMejor(subtotal: number, medioPago: MedioDePago, fecha: Date): Descuento {
        return this.descuentos
            .filter(descuento => descuento.aplica(medioPago, fecha))
            .reduce<Descuento>(
                (mejor, actual) => actual.calcular(subtotal) > mejor.calcular(subtotal) ? actual : mejor,
                new SinDescuento()
            );
    }
}
