import { Menu } from "./menu";

export class Restaurante {

    private historialPedidos[]: Pedido
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
        this.historialPedidos.push(pedido); // Registra un nuevo pedido y lo agrega al historial
    }


    public agregarItem (pedido: Pedido, item: ItemPedido) : void{
        pedido.agregarItem(item); // Agrega un item pedido
    }

    public quitarItem(pedido: Pedido) : void {
        pedido.quitarUltimoItem(); // Elimina el ultimo item agregado a un pedido
    }

    public confirmarPedido(pedido: Pedido) : void {
        pedido.confirmar();
    }

}