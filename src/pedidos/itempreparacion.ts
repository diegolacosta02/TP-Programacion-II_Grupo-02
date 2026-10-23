import { EstadoItem } from "../constantes/estadoItem";
import { TipoEstacionTrabajo } from "../constantes/tipoEstacion";
import Producto from "../menu/producto";

export default class ItemPreparacion {
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem;

    public constructor(producto: Producto, cantidad: number) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
    }

    public getNombre(): string {
        return this.producto.getNombre();
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getEstado(): EstadoItem {
        return this.estado;
    }

    public getEstacion(): TipoEstacionTrabajo {
        return this.producto.getEstacion();
    }

    public comenzarPreparacion(): void {
        if (this.estado !== EstadoItem.PENDIENTE) {
            throw new Error("Solo se puede comenzar la preparación de un item pendiente.");
        }
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public marcarListo(): void {
        if (this.estado !== EstadoItem.EN_PREPARACION) {
            throw new Error("Solo se puede marcar como listo un item en preparación.");
        }
        this.estado = EstadoItem.LISTO;
    }
}
