import Pedido from "./pedido";

export default class PedidoEnSalon extends Pedido {
    private mesa: number;
    private propinaMozo: number;

    public constructor(mesa: number) {  
        super();
        this.mesa = mesa;
        this.propinaMozo = 1000
    }

    public calcularCostoAdicional(): number {
        return this.propinaMozo;
    }

}