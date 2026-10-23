import { EstadoPedido } from "../constantes/estadopedido";
import ItemPedido from "./itempedido";
import Stack from "../estructurasdedatos/stack";
import Comando from "../estructurasdedatos/comando";
import ComandoAgregar from "../estructurasdedatos/comandoagregar";
import ComandoQuitar from "../estructurasdedatos/comandoquitar";
import { CERO, MENOS_UNO } from "../constantes/constantes";
import Factura from "./factura";
import { MedioDePago } from "../constantes/mediodepago";
import Descuento from "../descuentos/descuento";

export default class Pedido {
    private items: Stack<ItemPedido>
    private estado: EstadoPedido
    private historial: Stack<Comando>

    public constructor() {
        this.items = new Stack<ItemPedido>();
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historial = new Stack<Comando>();
    }
    
    private validarEnConstruccion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado, no admite modificaciones.");
        }
    }
    
    public getEstado(): EstadoPedido {
        return this.estado
    }

    public agregarItem(item: ItemPedido): void {
        this.validarEnConstruccion();
        this.ejecutar(new ComandoAgregar(this.items, item));
    }

    public quitarUltimoItem(): void {
        this.validarEnConstruccion();
        if (this.items.isEmpty()) {
            throw new Error("No hay ningún ítem en el pedido.");
        }
        this.ejecutar(new ComandoQuitar(this.items));
    }

    public quitarHasta(item: ItemPedido): void {
        this.validarEnConstruccion();

        const lista = this.items.toArray();
        const posicion = lista.indexOf(item);

        if (posicion === MENOS_UNO) {
            throw new Error("El ítem no pertenece al pedido.");
        }

        const cantidadAQuitar = lista.length - posicion;

        for (let i = 0; i < cantidadAQuitar; i++) {
            this.quitarUltimoItem();
        }
    }
    
    public confirmar(): void {
        this.validarEnConstruccion();
        if (this.items.isEmpty()) {
            throw new Error("No se puede confirmar un pedido vacío.");
        }
        this.estado = EstadoPedido.CONFIRMADO;
        this.historial = new Stack<Comando>();
    }

    public puedeFacturarse(): boolean {
        const lista = this.items.toArray();
        return lista.length > CERO && lista.every(i => i.estaListo());
    }

    public calcularSubtotal(): number {
        
        const lista = this.items.toArray();
        let contador= 0;

        lista.forEach(item => {
            contador += item.getPrecio()
        });

        return contador
    }

    public getDetalle(): string[] {
        return this.items.toArray().map(item => item.describir());
    }

    public facturar(medioPago: MedioDePago, descuentos: Descuento[], fecha: Date): Factura {
        if (!this.puedeFacturarse()) {
            throw new Error("No se puede facturar: hay items que no estan listos.")
        }
        const factura = new Factura(this.getDetalle(), this.calcularSubtotal(), medioPago, descuentos, fecha)
        this.estado = EstadoPedido.FINALIZADO
        return factura
    }

    public deshacer(): void {
        this.validarEnConstruccion();
        if (this.historial.isEmpty()) {
            throw new Error("No hay nada para deshacer.");
        }
        this.historial.pop()?.deshacer();
    }

    protected ejecutar(comando: Comando): void {
        comando.ejecutar();
        this.historial.push(comando);
    }
}