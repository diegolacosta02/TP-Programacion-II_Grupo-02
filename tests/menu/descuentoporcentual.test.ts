import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Menu } from "../../src/menu/menu";
import { DescuentoPorcentual } from "../../src/menu/descuentoporcentual";

function crearMenu(precio: number): DeepMockProxy<Menu> {
    const menu = mockDeep<Menu>();
    menu.getPrecio.mockReturnValue(precio);
    return menu;
}

describe("DescuentoPorcentual", () => {
    let bife: DeepMockProxy<Menu>;
    let flan: DeepMockProxy<Menu>;

    beforeEach(() => {
        bife = crearMenu(12000);
        flan = crearMenu(3000);
    });

    it("Se descuenta el porcentaje sobre la suma de los productos", () => {
        expect(new DescuentoPorcentual(10).calcular([bife, flan])).toBeCloseTo(13500);
    });

    it("0% deja la suma intacta y 100% la anula", () => {
        expect(new DescuentoPorcentual(0).calcular([bife, flan])).toBe(15000);
        expect(new DescuentoPorcentual(100).calcular([bife, flan])).toBe(0);
    });

    it("El descuento sin productos devuelve cero", () => {
        expect(new DescuentoPorcentual(10).calcular([])).toBe(0);
    });

    it("Tira error ante porcentajes fuera de rango", () => {
        expect(() => new DescuentoPorcentual(-1)).toThrow("El porcentaje debe estar entre 0 y 100.");
        expect(() => new DescuentoPorcentual(101)).toThrow("El porcentaje debe estar entre 0 y 100.");
    });
});