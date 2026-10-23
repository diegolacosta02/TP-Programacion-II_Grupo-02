import Queue from "./estructurasdedatos/queue";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";
import ItemPreparacion from "./pedidos/itempreparacion";

export default class EstacionDeTrabajo {
    private colaDePedidos: Queue<ItemPreparacion>;
    private tipoEstacion: TipoEstacionTrabajo;

    public constructor(tipoEstacion: TipoEstacionTrabajo) {
        this.colaDePedidos = new Queue<ItemPreparacion>();
        this.tipoEstacion = tipoEstacion;
    }

    public getTipo(): TipoEstacionTrabajo {
        return this.tipoEstacion;
    }

    public getCantidadPendientes(): number {
        return this.colaDePedidos.size();
    }

    public recibirItem(item: ItemPreparacion): void {
        if (item.getEstacion() !== this.tipoEstacion) {
            throw new Error("El item recibido no es preparable en esta estación.");
        }
        this.colaDePedidos.enqueue(item);
    }

    public prepararSiguiente(): ItemPreparacion {
        if (this.colaDePedidos.isEmpty()) {
            throw new Error("No hay items pendientes en la estación.");
        }
        const item = this.colaDePedidos.dequeue();
        item.comenzarPreparacion();
        return item;
    }
}
