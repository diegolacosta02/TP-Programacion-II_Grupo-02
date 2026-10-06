import EstacionDeTrabajo from "./estaciondetrabajo";
import ItemPedido from "./itempedido";
import { Menu } from "./menu";
import Pedido from "./pedido";

export class Restaurante {

    private historialPedidos: Pedido[]
    private menu: Menu[]
    private estaciones: EstacionDeTrabajo[]
    // menuInicial = productos y combos 
    // estaciones = estaciones de cocina disponibles
    constructor(estaciones: EstacionDeTrabajo[], menuInicial: Menu[] = [] ){
        this.menu = menuInicial;
        this.estaciones = estaciones;
        this.historialPedidos = []
    }

    public registrarPedido(pedido: Pedido) : void {
        this.historialPedidos.push(pedido);
    }


    public agregarItem (pedido: Pedido, item: ItemPedido) : void{
        pedido.agregarItem(item);
    }

    public quitarItem(pedido: Pedido) : void {
        pedido.quitarUltimoItem();
    }

    public confirmarPedido(pedido: Pedido) : void {
        pedido.confirmar();
    }

}