import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PrecioFijo } from "../../src/menu/preciofijo";
import Producto from "../../src/menu/producto";

describe("PrecioFijo", () => {
    let productoA: DeepMockProxy<Producto>
    let productoB: DeepMockProxy<Producto>
    
    beforeEach(() => {
        productoA = mockDeep<Producto>()
        productoB = mockDeep<Producto>()
        productoA.getPrecio.mockReturnValue(7000)
        productoB.getPrecio.mockReturnValue(3500)
    })

    it("Devuelve el precio fijo sin importar la suma de los productos", () => {
        const productos = [productoA, productoB]
        expect(new PrecioFijo(9000).calcular(productos)).toBe(9000);
    });

    it("Rechaza precios negativos al instanciar", () => {
        expect(() => new PrecioFijo(-1)).toThrow("El precio fijo no puede ser negativo.");
    });
});