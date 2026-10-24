import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstadoItem } from "../../src/constantes/estadoItem";
import { TipoEstacionTrabajo } from "../../src/constantes/tipoEstacion";
import { Menu } from "../../src/menu/menu";
import Producto from "../../src/menu/producto";
import ItemPedido from "../../src/pedidos/itempedido";

function crearProducto(nombre: string, estacion: TipoEstacionTrabajo): DeepMockProxy<Producto> {
    const producto = mockDeep<Producto>();
    producto.getNombre.mockReturnValue(nombre);
    producto.getEstacion.mockReturnValue(estacion);
    producto.getProductosSimples.mockReturnValue([producto]);
    return producto;
}

function crearMenu(nombre: string, precio: number, productos: Producto[]): DeepMockProxy<Menu> {
    const menu = mockDeep<Menu>();
    menu.getNombre.mockReturnValue(nombre);
    menu.getPrecio.mockReturnValue(precio);
    menu.getProductosSimples.mockReturnValue(productos);
    return menu;
}

describe("ItemPedido", () => {
    const CANTIDAD = 2;
    const MENSAJE_CANTIDAD = "La cantidad debe ser un entero mayor a cero.";
    const MENSAJE_NO_MODIFICABLE = "No es posible modificar un item que ya está en preparación o listo.";

    let bifeProducto: DeepMockProxy<Producto>;
    let flanProducto: DeepMockProxy<Producto>;
    let limonadaProducto: DeepMockProxy<Producto>;
    let bife: DeepMockProxy<Menu>;
    let combo: DeepMockProxy<Menu>;
    let limonada: DeepMockProxy<Menu>;
    let item: ItemPedido;
    let itemCombo: ItemPedido;

    beforeEach(() => {
        bifeProducto = crearProducto("Bife", TipoEstacionTrabajo.PARRILLA);
        flanProducto = crearProducto("Flan", TipoEstacionTrabajo.COCINADULCE);
        limonadaProducto = crearProducto("Limonada", TipoEstacionTrabajo.BARRA);
        bife = crearMenu("Bife", 12000, [bifeProducto]);
        combo = crearMenu("Combo parrillero", 13500, [bifeProducto, flanProducto]);
        limonada = crearMenu("Limonada", 2500, [limonadaProducto]);
        item = new ItemPedido(bife, CANTIDAD);
        itemCombo = new ItemPedido(combo, 1);
    });

    describe("Pruebas de creación del item pedido", () => {

        it("Empieza con el estado pendiente, y puede modificarse", () => {
            expect(item.getEstado()).toBe(EstadoItem.PENDIENTE);
            expect(item.estaListo()).toBe(false);
            expect(item.puedeModificarse()).toBe(true);
        });

        it("Devuelve el nombre del menú y la cantidad recibida", () => {
            expect(item.getNombre()).toBe("Bife");
            expect(item.getCantidad()).toBe(CANTIDAD);
        });

        it("Rechaza cantidades al instanciar que no sean enteros positivos", () => {
            expect(() => new ItemPedido(limonada, 0)).toThrow(MENSAJE_CANTIDAD);
            expect(() => new ItemPedido(limonada, -1)).toThrow(MENSAJE_CANTIDAD);
            expect(() => new ItemPedido(limonada, 1.5)).toThrow(MENSAJE_CANTIDAD);
            
            expect(limonada.getProductosSimples).not.toHaveBeenCalled();
        });
    });

    describe("Pruebas de precio y descripción", () => {

        it("El precio debe ser el del menu multiplicado por la cantidad", () => {
            expect(item.getPrecio()).toBe(24000);
            expect(itemCombo.getPrecio()).toBe(13500);
        });

        it("Se describe con cantidad, nombre y precio", () => {
            expect(item.describir()).toBe("2x Bife - $24000.00");
        });
    });

    describe("Pruebas de preparación", () => {

        it("Un producto simple genera una sola tarea", () => {
            expect(item.getPreparaciones()).toHaveLength(1);
        });

        it("Un combo genera una tarea por producto, en orden", () => {
            const nombres = itemCombo.getPreparaciones().map(tarea => tarea.getNombre());
            expect(nombres).toEqual(["Bife", "Flan"]);
        });

        it("Cada item a preparar hereda la cantidad del ítem", () => {
            expect(item.getPreparaciones()[0].getCantidad()).toBe(CANTIDAD);
        });

        it("cada item a preparar va a la estación de su producto", () => {
            const estaciones = itemCombo.getPreparaciones().map(tarea => tarea.getEstacion());
            expect(estaciones).toEqual([TipoEstacionTrabajo.PARRILLA, TipoEstacionTrabajo.COCINADULCE]);
        });

        it("getPreparaciones devuelve un elemento", () => {
            itemCombo.getPreparaciones().pop();
            expect(itemCombo.getPreparaciones()).toHaveLength(1);
        });
    });

    describe("Pruebas de estados según sus tareas", () => {

        it("Está pendiente mientras ninguna tarea comenzó", () => {
            expect(itemCombo.getEstado()).toBe(EstadoItem.PENDIENTE);
        });

        it("Está en preparación apenas comienza una de sus tareas", () => {
            itemCombo.getPreparaciones()[0].comenzarPreparacion();
            expect(itemCombo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        it("Sigue en preparación mientras falte alguna tarea por terminar", () => {
            const [primera] = itemCombo.getPreparaciones();
            primera.comenzarPreparacion();
            primera.marcarListo();
            expect(itemCombo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
            expect(itemCombo.estaListo()).toBe(false);
        });

        it("Está listo cuando terminaron todas sus tareas", () => {
            itemCombo.getPreparaciones().forEach(tarea => {
                tarea.comenzarPreparacion();
                tarea.marcarListo();
            });
            expect(itemCombo.getEstado()).toBe(EstadoItem.LISTO);
            expect(itemCombo.estaListo()).toBe(true);
        });
    });

    describe("Pruebas de modificación", () => {

        it("Se cambia la cantidad mientras está pendiente", () => {
            item.modificar(3);
            expect(item.getCantidad()).toBe(3);
            expect(item.getNombre()).toBe("Bife");
            expect(item.getPrecio()).toBe(36000);
            expect(item.getPreparaciones()[0].getCantidad()).toBe(3);
        });

        it("Se cambia el producto mientras está pendiente", () => {
            item.modificar(1, limonada);
            expect(item.getNombre()).toBe("Limonada");
            expect(item.getCantidad()).toBe(1);
            expect(item.getPreparaciones()[0].getEstacion()).toBe(TipoEstacionTrabajo.BARRA);
        });

        it("Si no se pasa el nombre del producto por parametro se deberia conservar el original", () => {
            item.modificar(4);
            expect(item.getNombre()).toBe("Bife");
        });

        it("No se puede modificar si una tarea ya está en preparación", () => {
            item.getPreparaciones()[0].comenzarPreparacion();
            expect(item.puedeModificarse()).toBe(false);
            expect(() => item.modificar(3)).toThrow(MENSAJE_NO_MODIFICABLE);
            expect(item.getCantidad()).toBe(CANTIDAD);
        });

        it("No se puede modificar un ítem listo", () => {
            const [tarea] = item.getPreparaciones();
            tarea.comenzarPreparacion();
            tarea.marcarListo();
            expect(() => item.modificar(3)).toThrow(MENSAJE_NO_MODIFICABLE);
        });

        it("Un combo con una tarea comenzada tampoco se puede modificar", () => {
            itemCombo.getPreparaciones()[1].comenzarPreparacion();
            expect(() => itemCombo.modificar(2)).toThrow(MENSAJE_NO_MODIFICABLE);
        });
    });
});