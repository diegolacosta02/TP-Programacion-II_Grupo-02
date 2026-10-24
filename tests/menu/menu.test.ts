import { CERO } from "../../src/constantes/constantes";
import { Menu } from "../../src/menu/menu"
import Producto from "../../src/menu/producto";

class MenuDePrueba extends Menu {
    public getPrecio(): number {
        return CERO;
    }

    public getProductosSimples(): Producto[] {
        return [];
    }
}

describe("Menu", () => {
    let menu: MenuDePrueba;

    beforeEach(() => {
        menu = new MenuDePrueba("Milanesa");
    })

    it("Devuelve el nombre recibido al instanciar", () => {
        expect(menu.getNombre()).toBe("Milanesa");
    })

    it("El precio de MenuDePrueba debe dar cero", () => {
        expect(menu.getPrecio()).toBe(0);
    })

    it("getProductosSimples debe devolver un array vacío", () => {
        expect(menu.getProductosSimples()).toBeDefined()
    })
})