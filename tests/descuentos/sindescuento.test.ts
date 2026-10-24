import SinDescuento from "../../src/descuentos/sindescuento"

describe("Sin descuento", () => {
    let sinDescuento: SinDescuento;

    beforeEach(() => {
        sinDescuento = new SinDescuento();
    })

    it("La clase siempre aplica", () => {
        expect(sinDescuento.aplica()).toBe(true)
    })

    it("El calculo de descuento debe dar cero", () => {
        expect(sinDescuento.calcular(15000)).toEqual(0)
    })

    it("Se devuelve en texto el nombre de la clase, sin declarar ningun porcentaje", () => {
        expect(sinDescuento.getNombre()).toBe("Sin descuento")
    })
})