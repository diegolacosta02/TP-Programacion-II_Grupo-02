import { EstadoItem } from "../constantes/estadoItem";
import { Menu } from "../menu/menu";
import { CERO, DECIMALES } from "../constantes/constantes";
import ItemPreparacion from "./itempreparacion";

export default class ItemPedido {
    private item: Menu;
    private cantidad: number;
    private preparaciones: ItemPreparacion[];

    public constructor(item: Menu, cantidad: number) {
        ItemPedido.validarCantidad(cantidad);
        this.item = item;
        this.cantidad = cantidad;
        this.preparaciones = ItemPedido.crearPreparaciones(item, cantidad);
    }

    public getNombre(): string {
        return this.item.getNombre();
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getPrecio(): number {
        return this.item.getPrecio() * this.cantidad;
    }

    public describir(): string {
        return `${this.cantidad}x ${this.getNombre()} - $${this.getPrecio().toFixed(DECIMALES)}`;
    }

    public getPreparaciones(): ItemPreparacion[] {
        return this.preparaciones;
    }

    public getEstado(): EstadoItem {
        const estados = this.preparaciones.map(preparacion => preparacion.getEstado());
        let estado = EstadoItem.EN_PREPARACION;
        if (estados.every(estado => estado === EstadoItem.PENDIENTE)) {
            estado = EstadoItem.PENDIENTE;
        }
        if (estados.every(estado => estado === EstadoItem.LISTO)) {
            estado = EstadoItem.LISTO;
        }
        return estado;
    }

    public estaListo(): boolean {
        return this.getEstado() === EstadoItem.LISTO;
    }

    public puedeModificarse(): boolean {
        return this.getEstado() === EstadoItem.PENDIENTE;
    }

    public modificar(cantidad: number, item?: Menu): void {
        if (!this.puedeModificarse()) {
            throw new Error("No es posible modificar un item que ya está en preparación o listo.");
        }
        ItemPedido.validarCantidad(cantidad);
        const nuevoItem = item ?? this.item;
        this.preparaciones = ItemPedido.crearPreparaciones(nuevoItem, cantidad);
        this.item = nuevoItem;
        this.cantidad = cantidad;
    }

    private static crearPreparaciones(menu: Menu, cantidad: number): ItemPreparacion[] {
        return menu.getProductosSimples().map(producto => new ItemPreparacion(producto, cantidad));
    }

    private static validarCantidad(cantidad: number): void {
        if (!Number.isInteger(cantidad) || cantidad <= CERO) {
            throw new Error("La cantidad debe ser un entero mayor a cero.");
        }
    }
}
