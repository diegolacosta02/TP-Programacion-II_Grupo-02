/* eslint-disable @typescript-eslint/class-methods-use-this */
import EstacionDeTrabajo from "./estaciondetrabajo";
import Queue from "./estructurasdedatos/queue";
import ItemPedido from "./itempedido";
import { Menu } from "./menu";
import Pedido from "./pedido";

export class Restaurante {

    private historialPedidos: Queue<Pedido>
    private menu: Menu[]
    private estaciones: EstacionDeTrabajo[]
    // menuInicial = productos y combos 
    // estaciones = estaciones de cocina disponibles
    public constructor(estaciones: EstacionDeTrabajo[], menuInicial: Menu[]) {
        this.menu = menuInicial;
        this.estaciones = estaciones;
        this.historialPedidos = new Queue();
    }

    public registrarPedido(pedido: Pedido) : void {
        this.historialPedidos.enqueue(pedido);
    }

    public agregarItem (pedido: Pedido, item: ItemPedido) : void {
        pedido.agregarItem(item);
    }

    public quitarItem(pedido: Pedido) : void {
        pedido.quitarUltimoItem();
    }

    public confirmarPedido(pedido: Pedido) : void {
        pedido.confirmar();
    }

}