import Producto from "./producto";

export abstract class Menu {
  protected nombre: string;

  public constructor(nombre: string) {
    this.nombre = nombre;
  }

  public abstract getPrecio(): number;

  public getNombre(): string {
    return this.nombre;
  }

  public abstract getProductosSimples(): Producto[]

}