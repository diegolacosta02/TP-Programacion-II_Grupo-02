import { Categoria } from "./constantes/categoria";
import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";


export default class Producto extends Menu {
    private categoria: Categoria;
    private tipoEstacion: TipoEstacionTrabajo;

    public constructor(nombre: string, categoria: Categoria, precio: number, tipoEstacion: TipoEstacionTrabajo) {
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

    public getEstacionDeTrabajo(nombreProducto: string): TipoEstacionTrabajo {
        if (nombreProducto != this.nombre) {
            throw new Error("El nombre del producto no coincide.")
        }
        return this.tipoEstacion
    }
}