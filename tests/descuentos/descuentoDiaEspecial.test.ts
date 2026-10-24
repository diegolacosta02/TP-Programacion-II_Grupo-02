import { MedioDePago } from "../../src/constantes/mediodepago";
import DescuentoDiaEspecial from "../../src/descuentos/descuentodiaespecial"

describe("Descuento en Dia Especial", () => {
    let descuentoDiaEspecial: DescuentoDiaEspecial;
    let DIA_MARTES: number
    let MARTES: Date;
    let MIERCOLES: Date;

    beforeEach(() => {
        DIA_MARTES = 2
        descuentoDiaEspecial = new DescuentoDiaEspecial(DIA_MARTES, 20);
        MARTES = new Date("2026-10-20T12:00:00");
        MIERCOLES = new Date("2026-10-21T12:00:00");
    })

    it("Arroja error al instanciar con un porcentaje fuera de rango (0 a 100)", () => {
            let diaespecial_menos_cinco: DescuentoDiaEspecial
            let diaespecial_ciento_diez: DescuentoDiaEspecial
    
            expect (() => diaespecial_menos_cinco = new DescuentoDiaEspecial(DIA_MARTES, -5)).toThrow("El porcentaje debe estar entre 0 y 100")
            expect (() => diaespecial_ciento_diez = new DescuentoDiaEspecial(DIA_MARTES, 110)).toThrow("El porcentaje debe estar entre 0 y 100")
        })

    it("Devuelve correctamente el porcentaje asignado al mostrar el nombre de la clase", () => {
        expect(descuentoDiaEspecial.getNombre()).toBe("Descuento de día especial (20%)")
    })

    it("Calcula el porcentaje sobre el subtotal correctamente", () => {
        expect(descuentoDiaEspecial.calcular(40000)).toBe(8000);
    })

    it("Aplica el día programado, con billetera virtual", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.BILLETERA_VIRTUAL, MARTES)).toBe(true);
    })

    it("Aplica el día programado, con efectivo", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.EFECTIVO, MARTES)).toBe(true);
    })

    it("Aplica el día programado, con tarjeta de crédito", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.TARJETA_CREDITO, MARTES)).toBe(true);
    })

    it("Aplica el día programado, con tarjeta de débito", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.TARJETA_DEBITO, MARTES)).toBe(true);
    })

    it("Rechaza el descuento en un dia incorrecto, con billetera virtual", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.BILLETERA_VIRTUAL, MIERCOLES)).toBe(false);
    })

    it("Rechaza el descuento en un dia incorrecto, con efectivo", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.EFECTIVO, MIERCOLES)).toBe(false);
    })

    it("Rechaza el descuento en un dia incorrecto, con tarjeta de crédito", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.TARJETA_CREDITO, MIERCOLES)).toBe(false);
    })

    it("Rechaza el descuento en un dia incorrecto, con tarjeta de débito", () => {
        expect(descuentoDiaEspecial.aplica(MedioDePago.TARJETA_DEBITO, MIERCOLES)).toBe(false);
    })
})