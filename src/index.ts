/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Categoria } from "./constantes/categoria";
import { MedioDePago } from "./constantes/mediodepago";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";
import DescuentoDiaEspecial from "./descuentos/descuentodiaespecial";
import DescuentoEfectivo from "./descuentos/descuentoefectivo";
import EstacionDeTrabajo from "./estaciondetrabajo";
import Combo from "./menu/combo";
import { DescuentoPorcentual } from "./menu/descuentoporcentual";
import { PrecioFijo } from "./menu/preciofijo";
import Producto from "./menu/producto";
import ItemPedido from "./pedidos/itempedido";
import PedidoDelivery from "./pedidos/pedidodelivery";
import PedidoEnSalon from "./pedidos/pedidoensalon";
import Restaurante from "./restaurante";
 
const MARTES = 2;
const fechaDemo = new Date(2026, 9, 20);
 
interface Carta {
    restaurante: Restaurante;
    bife: Producto;
    combo: Combo;
    bebida: Producto;
}
 
function intentar(descripcion: string, accion: () => void): void {
    try {
        accion();
        console.log(`  OK     ${descripcion}`);
    } catch (error) {
        const motivo = error instanceof Error ? error.message : String(error);
        console.log(`  ERROR  ${descripcion} -> ${motivo}`);
    }
}
 
function crearRestaurante(): Carta {
    const bife = new Producto("Bife de chorizo", Categoria.PLATOPRINCIPAL, 12000, TipoEstacionTrabajo.PARRILLA);
    const flan = new Producto("Flan", Categoria.POSTRE, 3000, TipoEstacionTrabajo.COCINADULCE);
    const bebida = new Producto("Limonada", Categoria.BEBIDA, 2500, TipoEstacionTrabajo.BARRA);
    const combo = new Combo("Combo parrillero", new DescuentoPorcentual(10));
    combo.agregarProducto(bife);
    combo.agregarProducto(flan);
 
    const estaciones = [
        new EstacionDeTrabajo(TipoEstacionTrabajo.PARRILLA),
        new EstacionDeTrabajo(TipoEstacionTrabajo.BARRA),
        new EstacionDeTrabajo(TipoEstacionTrabajo.COCINADULCE),
        new EstacionDeTrabajo(TipoEstacionTrabajo.COCINAFRIA)
    ];
    const descuentos = [new DescuentoEfectivo(10), new DescuentoDiaEspecial(MARTES, 15)];
    const restaurante = new Restaurante(estaciones, [bife, flan, bebida, combo], descuentos);
    return { restaurante, bife, combo, bebida };
}
 
function flujoCompleto(carta: Carta): void {
    const { restaurante, combo, bebida } = carta;
    const pedido = new PedidoDelivery("Calle Falsa 123", 2500);
    restaurante.registrarPedido(pedido);
    restaurante.agregarItem(pedido, new ItemPedido(combo, 1));
    restaurante.agregarItem(pedido, new ItemPedido(bebida, 2));
    restaurante.confirmarPedido(pedido);
 
    [TipoEstacionTrabajo.PARRILLA, TipoEstacionTrabajo.BARRA, TipoEstacionTrabajo.COCINADULCE].forEach(tipo => {
        const tarea = restaurante.prepararSiguiente(tipo);
        console.log(`  ${TipoEstacionTrabajo[tipo]} prepara: ${tarea.getCantidad()}x ${tarea.getNombre()}`);
        restaurante.marcarListo(tarea);
    });
 
    const factura = restaurante.facturarPedido(pedido, MedioDePago.EFECTIVO, fechaDemo);
    factura.getDetalle();
    console.log(`  Recaudación: $${restaurante.consultarRecaudacion().toFixed(2)}`);
}
 
function erroresAlArmar(carta: Carta): void {
    const { restaurante, bife } = carta;
    const pedido = new PedidoEnSalon(1, 1000);
    restaurante.registrarPedido(pedido);
 
    intentar("agregar 0 bifes", () => restaurante.agregarItem(pedido, new ItemPedido(bife, 0)));
    intentar("quitar de un pedido vacío", () => restaurante.quitarItem(pedido));
    intentar("deshacer sin haber hecho nada", () => restaurante.deshacer(pedido));
    intentar("confirmar un pedido vacío", () => restaurante.confirmarPedido(pedido));
    intentar("quitar hasta un item que no es del pedido", () => pedido.quitarHasta(new ItemPedido(bife, 1)));
 
    const incompleto = new Combo("Combo incompleto", new PrecioFijo(1000));
    incompleto.agregarProducto(bife);
    intentar("pedir un combo con un solo producto", () => new ItemPedido(incompleto, 1));
}
 
function erroresEnCocinaYCobro(carta: Carta): void {
    const { restaurante, combo } = carta;
    const pedido = new PedidoEnSalon(2, 1500);
    restaurante.registrarPedido(pedido);
    restaurante.agregarItem(pedido, new ItemPedido(combo, 1));
    restaurante.confirmarPedido(pedido);
 
    intentar("agregar un item a un pedido ya confirmado", () =>
        restaurante.agregarItem(pedido, new ItemPedido(combo, 1)));
    intentar("facturar con la cocina sin terminar", () =>
        restaurante.facturarPedido(pedido, MedioDePago.EFECTIVO, fechaDemo));
 
    const tareaParrilla = restaurante.prepararSiguiente(TipoEstacionTrabajo.PARRILLA);
    intentar("modificar un item que ya está en preparación", () => pedido.getItems()[0].modificar(2));
    intentar("marcar listo una tarea que sigue pendiente", () =>
        restaurante.marcarListo(pedido.getPreparaciones()[1]));
 
    restaurante.marcarListo(tareaParrilla);
    restaurante.marcarListo(restaurante.prepararSiguiente(TipoEstacionTrabajo.COCINADULCE));
    intentar("facturar con todo listo", () => restaurante.facturarPedido(pedido, MedioDePago.EFECTIVO, fechaDemo));
    intentar("facturar por segunda vez", () => restaurante.facturarPedido(pedido, MedioDePago.EFECTIVO, fechaDemo));
}
 
function main(): void {
    const carta = crearRestaurante();
    console.log("--- Flujo completo: pedido con envío y combo ---");
    flujoCompleto(carta);
    console.log("\n--- Errores al armar un pedido ---");
    erroresAlArmar(carta);
    console.log("\n--- Errores en cocina y cobro ---");
    erroresEnCocinaYCobro(carta);
}
 
main();
