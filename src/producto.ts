import { Categoria } from "./categoria";
import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "./tipoEstacion";


export default class Producto extends Menu {
    private categoria: Categoria;
    private tipoEstacion: TipoEstacionTrabajo;

    constructor(nombre: string, categoria: Categoria, precio: number, tipoEstacion: TipoEstacionTrabajo) {
        super(nombre, precio);
        this.categoria = categoria;
        this.tipoEstacion = tipoEstacion;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getCategoria(): Categoria {
        return this.categoria;
    }

    public getTipoEstacion(): TipoEstacionTrabajo {
        return this.tipoEstacion;
    }
}