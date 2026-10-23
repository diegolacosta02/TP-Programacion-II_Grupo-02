/* eslint-disable @typescript-eslint/class-methods-use-this */
import EstacionDeTrabajo from "./estaciondetrabajo";
import Queue from "./estructurasdedatos/queue";
import ItemPedido from "./pedidos/itempedido";
import { Menu } from "./menu/menu";
import Factura from "./pedidos/factura";
import Descuento from "./descuentos/descuento";
import { EstadoPedido } from "./constantes/estadopedido";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";
import ItemPreparacion from "./pedidos/itempreparacion";
import { MedioDePago } from "./constantes/mediodepago";
import { Pedido } from "./pedidos/pedido";
import { CERO } from "./constantes/constantes";

export default class Restaurante {
    private pedidos: Pedido[];
    private historialFacturas: Queue<Factura>;
    private menu: Menu[];
    private estaciones: EstacionDeTrabajo[];
    private descuentos: Descuento[];

    public constructor(estaciones: EstacionDeTrabajo[], menuInicial: Menu[], descuentos: Descuento[]) {
        this.pedidos = [];
        this.historialFacturas = new Queue<Factura>();
        this.menu = menuInicial;
        this.estaciones = estaciones;
        this.descuentos = descuentos;
    }

    public registrarPedido(pedido: Pedido): void {
        if (this.pedidos.includes(pedido)) {
            throw new Error("El pedido ya está registrado.");
        }
        this.pedidos.push(pedido);
    }

    public getPedidosEnCurso(): Pedido[] {
        return this.pedidos.filter(pedido => pedido.getEstado() !== EstadoPedido.FINALIZADO);
    }

    public agregarItem(pedido: Pedido, item: ItemPedido): void {
        pedido.agregarItem(item);
    }

    public quitarItem(pedido: Pedido): void {
        pedido.quitarUltimoItem();
    }

    public deshacer(pedido: Pedido): void {
        pedido.deshacer();
    }

    public confirmarPedido(pedido: Pedido): void {
        const destinos = pedido.getPreparaciones().map(preparacion => ({
            preparacion, estacion: this.buscarEstacion(preparacion.getEstacion())
        }));
        pedido.confirmar();
        destinos.forEach(destino => destino.estacion.recibirItem(destino.preparacion));
    }

    public prepararSiguiente(tipoEstacion: TipoEstacionTrabajo): ItemPreparacion {
        return this.buscarEstacion(tipoEstacion).prepararSiguiente();
    }

    public marcarListo(preparacion: ItemPreparacion): void {
        preparacion.marcarListo();
    }

    public calcularTotalACobrar(pedido: Pedido, medioPago: MedioDePago, fecha: Date): number {
        return pedido.calcularTotalACobrar(medioPago, this.descuentos, fecha);
    }

    public facturarPedido(pedido: Pedido, medioPago: MedioDePago, fecha: Date): Factura {
        const factura = pedido.facturar(medioPago, this.descuentos, fecha);
        this.historialFacturas.enqueue(factura);
        return factura;
    }

    public consultarHistorial(): Factura[] {
        return this.historialFacturas.toArray();
    }

    public consultarRecaudacion(): number {
        return this.historialFacturas.toArray().reduce((total, factura) => total + factura.getTotal(), CERO);
    }

    public getMenu(): Menu[] {
        return this.menu;
    }

    public agregarItemMenu(item: Menu): void {
        if (this.menu.some(existente => existente.getNombre() === item.getNombre())) {
            throw new Error("Ya existe un elemento del menú con ese nombre.");
        }
        this.menu.push(item);
    }

    public eliminarItemMenu(item: Menu): void {
        if (!this.menu.includes(item)) {
            throw new Error("El elemento no pertenece al menú.");
        }
        this.menu = this.menu.filter(existente => existente !== item);
    }

    private buscarEstacion(tipoEstacion: TipoEstacionTrabajo): EstacionDeTrabajo {
        const estacion = this.estaciones.find(candidata => candidata.getTipo() === tipoEstacion);
        if (estacion === undefined) {
            throw new Error("El restaurante no tiene una estación para ese producto.");
        }
        return estacion;
    }
}
