import { EstadoItem } from "./constantes/estadoItem";
import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";
import { CERO } from "./constantes/constantes";

export default class ItemPedido {
    private item: Menu;
    private cantidad: number;
    private estado: EstadoItem;

    public constructor(item: Menu, cantidad: number) {
        this.validarCantidad(cantidad)
        this.item = item;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
    }

    public getNombre(): string {
        return this.item.getNombre();
    }
    public getCantidad(): number {
        return this.cantidad;
    }
    public getEstado(): EstadoItem {
        return this.estado;
    }

    public describir(): string {
        return `${this.cantidad}x ${this.getNombre()} - $${this.getPrecio()}`;
    }

    public getEstacion(): TipoEstacionTrabajo {
        return this.item.getEstacionDeTrabajo(this.getNombre());
    }
    public getPrecio(): number {
        return this.item.getPrecio() * this.cantidad;
    }
    public estaListo(): boolean {
        return this.estado === EstadoItem.LISTO;
    }
    public comenzarPreparacion(): void {
        this.estado = EstadoItem.EN_PREPARACION;
    }
    public marcarListo(): void {
        this.estado = EstadoItem.LISTO;
    }
    public puedeModificarse(): boolean {
        return this.estado === EstadoItem.PENDIENTE;
    }

    private validarModificable(): void {
        if (!this.puedeModificarse()) {
            throw new Error("El item ya no puede modificarse ni cancelarse.")
        }
    }
    
    public modificar(cantidad: number, item?: Menu): void {
        this.validarModificable();
        this.validarCantidad(cantidad);

        this.cantidad = cantidad;
        if (item) {
            this.item = item;
        }
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    private validarCantidad(cantidad: number): void {
        if (!Number.isInteger(cantidad) || cantidad <= CERO) {
            throw new Error("La cantidad debe ser un entero mayor a cero.");
        }
    }
}