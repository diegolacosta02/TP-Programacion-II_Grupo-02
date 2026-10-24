import { Categoria } from "../../src/constantes/categoria";
import { TipoEstacionTrabajo } from "../../src/constantes/tipoEstacion";
import Producto from "../../src/menu/producto"

describe("Producto", () => {
    let vacio: Producto;

    beforeEach(() => {
        vacio = new Producto("Vacio", Categoria.PLATOPRINCIPAL, 8000, TipoEstacionTrabajo.PARRILLA)
    })

    it("Un producto simple se devuelve a sí mismo en array", () => {
        expect(vacio.getProductosSimples()).toEqual([vacio]);
    })

    it("Se comprueba el error al intentar instanciar con precio negativo", () => {
        expect(() => new Producto("Gratis", Categoria.BEBIDA, -1, TipoEstacionTrabajo.BARRA)).toThrow("El precio no puede ser negativo.");
    })

    it("El producto devuelve su nombre", () => {
        expect(vacio.getNombre()).toBe("Vacio");
    })

    it("El producto devuelve su categoria", () => {
        expect(vacio.getCategoria()).toBe(Categoria.PLATOPRINCIPAL);
    })

    it("El producto devuelve su precio", () => {
        expect(vacio.getPrecio()).toBe(8000);
    })

    it("El producto devuelve su estacion de trabajo", () => {
        expect(vacio.getEstacion()).toBe(TipoEstacionTrabajo.PARRILLA);
    })
})