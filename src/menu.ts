import { Categoria } from "./categoria";

export abstract class Menu {
    protected nombre: string;
    protected categoria: Categoria;

    constructor(nombre: string, categoria: Categoria){
        this.nombre = nombre;
        this.categoria = categoria;
    }

    abstract getPrecio(): number;

    getNombre(): string {
    return this.nombre;
  }
 
  getCategoria(): Categoria {
    return this.categoria;
  }
}