import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstadoItem } from "../../src/constantes/estadoItem";
import { TipoEstacionTrabajo } from "../../src/constantes/tipoEstacion";
import Producto from "../../src/menu/producto";
import ItemPreparacion from "../../src/pedidos/itempreparacion";

describe("ItemPreparacion", () => {
    const CANTIDAD = 2;

    let bife: DeepMockProxy<Producto>;
    let tarea: ItemPreparacion;

    beforeEach(() => {
        bife = mockDeep<Producto>();
        bife.getNombre.mockReturnValue("Bife");
        bife.getEstacion.mockReturnValue(TipoEstacionTrabajo.PARRILLA);
        tarea = new ItemPreparacion(bife, CANTIDAD);
    });

    it("Empieza la instancia en estado pendiente", () => {
        expect(tarea.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    it("Devuelve el nombre del producto", () => {
        expect(tarea.getNombre()).toBe("Bife");
    });

    it("Devuelve la cantidad recibida", () => {
        expect(tarea.getCantidad()).toBe(CANTIDAD);
    });

    it("La estacion designada viene por parametro al ser creada por el ItemPedido", () => {
        expect(tarea.getEstacion()).toBe(TipoEstacionTrabajo.PARRILLA);
    });

    it("El metodo comenzarPreparacion cambia el estado a en preparación", () => {
        tarea.comenzarPreparacion();
        expect(tarea.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    it("marcarListo la cambia a listo cuando estaba en preparación", () => {
        tarea.comenzarPreparacion();
        tarea.marcarListo();
        expect(tarea.getEstado()).toBe(EstadoItem.LISTO);
    });

    it("Lanza error al intentar comenzar la preparacion cuando ya está siendo preparado", () => {
        tarea.comenzarPreparacion();
        expect(() => tarea.comenzarPreparacion()).toThrow("Solo se puede comenzar la preparación de un item pendiente.");
        expect(tarea.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    it("Lanza error al intentar comenzar la preparacion si ya está listo", () => {
        tarea.comenzarPreparacion();
        tarea.marcarListo();
        expect(() => tarea.comenzarPreparacion()).toThrow("Solo se puede comenzar la preparación de un item pendiente.");
        expect(tarea.getEstado()).toBe(EstadoItem.LISTO);
    });

    it("No se puede marcar listo una tarea pendiente, no se saltea 'en preparación'", () => {
        expect(() => tarea.marcarListo()).toThrow("Solo se puede marcar como listo un item en preparación.");
        expect(tarea.getEstado()).toBe(EstadoItem.PENDIENTE);
    });
});