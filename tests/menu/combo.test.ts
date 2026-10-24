import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import Combo from "../../src/menu/combo";
import { DescuentoCombo } from "../../src/menu/descuentocombo";
import Producto from "../../src/menu/producto";

function crearProducto(nombre: string, precio: number): DeepMockProxy<Producto> {
    const producto = mockDeep<Producto>();
    producto.getNombre.mockReturnValue(nombre);
    producto.getPrecio.mockReturnValue(precio);
    producto.getProductosSimples.mockReturnValue([producto]);
    return producto;
}

describe("Combo", () => {
    const PRECIO_DEL_COMBO = 13500;

    let bife: DeepMockProxy<Producto>;
    let coca: DeepMockProxy<Producto>;
    let estrategia: DeepMockProxy<DescuentoCombo>;
    let combo: Combo;

    beforeEach(() => {
        bife = crearProducto("Bife", 12000);
        coca = crearProducto("Coca", 3500);
        estrategia = mockDeep<DescuentoCombo>();
        estrategia.calcular.mockReturnValue(PRECIO_DEL_COMBO);

        combo = new Combo("Combo de bife con coca", estrategia);
        combo.agregarProducto(bife);
        combo.agregarProducto(coca);
    });

    it("Se comprueba el nombre instanciado", () => {
        expect(combo.getNombre()).toBe("Combo de bife con coca");
    });

    it("El precio es el que calcula la estrategia", () => {
        expect(combo.getPrecio()).toBe(PRECIO_DEL_COMBO);
    });

    it("Sus productos simples son los agregados", () => {
        const nombres = combo.getProductosSimples().map(producto => producto.getNombre());
        expect(nombres).toEqual(["Bife", "Coca"]);
    });

    it("getProductos devuelve una copia", () => {
        combo.getProductos().pop();
        expect(combo.getProductos()).toHaveLength(1);
    });

    it("Descompone los combos anidados", () => {
        const flan = crearProducto("Flan", 3000);
        const externo = new Combo("Combo externo", estrategia);
        externo.agregarProducto(combo);
        externo.agregarProducto(flan);

        const nombres = externo.getProductosSimples().map(producto => producto.getNombre());
        expect(nombres).toEqual(["Bife", "Coca", "Flan"]);
    });

    it("Se comprueba errores al crear combos con menos de dos productos", () => {
        const incompleto = new Combo("Incompleto", estrategia);
        incompleto.agregarProducto(bife);

        expect(() => incompleto.getPrecio()).toThrow("Un combo debe tener al menos 2 productos.");
        expect(() => incompleto.getProductosSimples()).toThrow("Un combo debe tener al menos 2 productos.");
        expect(estrategia.calcular).not.toHaveBeenCalled();
    });

    it("Se comprueba error al intentar agregar al combo dentro de sí mismo", () => {
        expect(() => combo.agregarProducto(combo)).toThrow("Un combo no puede contenerse a sí mismo.");
    });
});