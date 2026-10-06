import { EstadoItem } from "./estadoItem";
import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "./tipoEstacion";

export default class ItemPedido {
    private item: Menu;
    private cantidad: number;
    private estado: EstadoItem;

    constructor(item: Menu, cantidad: number) {
        this.item = item;
        this.cantidad = cantidad;
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public getEstacion(): TipoEstacionTrabajo {
        return this.item.getEstacionDetrabajo();
    }
}