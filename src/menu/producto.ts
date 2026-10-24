import { Categoria } from "../constantes/categoria";
import { Menu } from "./menu";
import { TipoEstacionTrabajo } from "../constantes/tipoEstacion";
import { CERO } from "../constantes/constantes";


export default class Producto extends Menu {
    private categoria: Categoria;
    private precio: number;
    private tipoEstacion: TipoEstacionTrabajo;

    public constructor(nombre: string, categoria: Categoria, precio: number, tipoEstacion: TipoEstacionTrabajo) {
        super(nombre);
        if (precio < CERO) {
            throw new Error("El precio no puede ser negativo.");
        }
        this.categoria = categoria;
        this.precio = precio;
        this.tipoEstacion = tipoEstacion;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getCategoria(): Categoria {
        return this.categoria;
    }

    public getEstacion(): TipoEstacionTrabajo {
        return this.tipoEstacion;
    }

    public getProductosSimples(): Producto[] {
        return [this];
    }
}