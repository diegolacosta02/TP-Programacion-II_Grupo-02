import { MedioDePago } from "../../src/constantes/mediodepago";
import DescuentoEfectivo from "../../src/descuentos/descuentoefectivo"

describe("Descuento en Efectivo", () => {
    let descuentoEfectivo: DescuentoEfectivo;

    beforeEach(() => {
        descuentoEfectivo = new DescuentoEfectivo(15);
    });

    it("Arroja error al instanciar con un porcentaje fuera de rango (0 a 100)", () => {
        let efectivo_menos_cinco: DescuentoEfectivo
        let efectivo_ciento_diez: DescuentoEfectivo

        expect (() => efectivo_menos_cinco = new DescuentoEfectivo(-5)).toThrow("El porcentaje debe estar entre 0 y 100")
        expect (() => efectivo_ciento_diez = new DescuentoEfectivo(110)).toThrow("El porcentaje debe estar entre 0 y 100")
    })
    
    it("Devuelve correctamente el porcentaje asignado al mostrar el nombre de la clase", () => {
        expect(descuentoEfectivo.getNombre()).toBe("Descuento por pago en efectivo (15%)")
    })
    
    it("Calcula el porcentaje sobre el subtotal correctamente", () => {
        expect(descuentoEfectivo.calcular(25000)).toBe(3750);
    })

    it("Se aplica el descuento al pagar con efectivo", () => {
        expect(descuentoEfectivo.aplica(MedioDePago.EFECTIVO)).toBe(true);
    })

    it("No se aplica el descuento al pagar con tarjeta de débito", () => {
        expect(descuentoEfectivo.aplica(MedioDePago.TARJETA_DEBITO)).toBe(false);
    })

    it("No se aplica el descuento al pagar con tarjeta de crédito", () => {
        expect(descuentoEfectivo.aplica(MedioDePago.TARJETA_CREDITO)).toBe(false);
    })

    it("No se aplica el descuento al pagar con billetera virtual", () => {
        expect(descuentoEfectivo.aplica(MedioDePago.BILLETERA_VIRTUAL)).toBe(false);
    })

})