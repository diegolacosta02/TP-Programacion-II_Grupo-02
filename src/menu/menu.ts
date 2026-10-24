import Producto from "./producto";

export abstract class Menu {
  protected nombre: string;

  public constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }
  
  public abstract getPrecio(): number;

  public abstract getProductosSimples(): Producto[]

}