import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import SelectorDeDescuento from "../../src/descuentos/selectordedescuento"
import { MedioDePago } from "../../src/constantes/mediodepago";
import Descuento from "../../src/descuentos/descuento";

function crearDescuento(aplica: boolean, monto: number): DeepMockProxy<Descuento> {
    const descuento = mockDeep<Descuento>();
    descuento.aplica.mockReturnValue(aplica);
    descuento.calcular.mockReturnValue(monto);
    return descuento;
}

describe("Selector de descuentos", () => {
    let FECHA: Date
    let SUBTOTAL: number

    beforeEach(() => {
        FECHA = new Date("2026-10-20T12:00:00");
        SUBTOTAL = 1000;
    })

    it("Sin descuentos devuelve SinDescuento", () => {
        const elegido = new SelectorDeDescuento([]).elegirMejor(SUBTOTAL, MedioDePago.BILLETERA_VIRTUAL, FECHA);
        expect(elegido.getNombre()).toBe("Sin descuento");
    })

    it("Si ningun descuento aplica, devuelve SinDescuento", () => {
        const efectivo = crearDescuento(false, 100);
        const diaEspecial = crearDescuento(false, 150);

        const elegido = new SelectorDeDescuento([efectivo, diaEspecial]).elegirMejor(SUBTOTAL, MedioDePago.TARJETA_DEBITO, FECHA);
        expect(elegido.getNombre()).toBe("Sin descuento");
    })

    it("Si aplica solo un descuento, lo elige", () => {
        const efectivo = crearDescuento(true, 100);
        const diaEspecial = crearDescuento(false, 150);

        const elegido = new SelectorDeDescuento([efectivo, diaEspecial]).elegirMejor(SUBTOTAL, MedioDePago.EFECTIVO, FECHA);
        expect(elegido).toBe(efectivo);
    })

    it("No elige un descuento que no aplique aunque tenga mejor descuento", () => {
        const aplica = crearDescuento(true, 100);
        const noAplica = crearDescuento(false, 1000);

        const elegido = new SelectorDeDescuento([aplica, noAplica]).elegirMejor(SUBTOTAL, MedioDePago.EFECTIVO, FECHA);
        expect(elegido).toBe(aplica);
        expect(noAplica.calcular).not.toHaveBeenCalled();
    })

    it("Si aplican varios descuentos, elige el de mayor monto sin importar el orden", () => {
        const chico = crearDescuento(true, 100);
        const grande = crearDescuento(true, 150);

        expect(new SelectorDeDescuento([chico, grande]).elegirMejor(SUBTOTAL, MedioDePago.EFECTIVO, FECHA)).toBe(grande);
        expect(new SelectorDeDescuento([grande, chico]).elegirMejor(SUBTOTAL, MedioDePago.EFECTIVO, FECHA)).not.toBe(chico);
    });

    it("Si los dos descuentos tienen el mismo monto, se elige el primero", () => {
        const primero = crearDescuento(true, 100);
        const segundo = crearDescuento(true, 100);

        const elegido = new SelectorDeDescuento([primero, segundo]).elegirMejor(SUBTOTAL, MedioDePago.EFECTIVO, FECHA);

        expect(elegido).toBe(primero);
        expect(elegido).not.toBe(segundo);
    });
})