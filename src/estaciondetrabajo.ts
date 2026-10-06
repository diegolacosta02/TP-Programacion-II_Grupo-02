import Queue from "./estructurasdedatos/queue";
import ItemPedido from "./itempedido";
import { TipoEstacionTrabajo } from "./tipoEstacion";

export default class EstacionDeTrabajo {
    private colaDePedidos: Queue<ItemPedido>
    private tipoEstacion: TipoEstacionTrabajo

    constructor(tipoEstacion: TipoEstacionTrabajo) {
        this.colaDePedidos = new Queue
        this.tipoEstacion = tipoEstacion
    }

    public recibirItem(item: ItemPedido): void {
        if (item.getEstacion() !== this.tipoEstacion) {
            throw new Error("El item recibido no es preparable en esta estación")
        }
        this.colaDePedidos.enqueue(item);
    }

    public prepararSiguiente(): void {

    }

}