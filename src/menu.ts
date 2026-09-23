import { TipoEstacionTrabajo } from "./tipoEstacion";

export abstract class Menu {
  protected nombre: string;
  protected precio: number;

  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }

  abstract getPrecio(): number;

  public getNombre(): string {
    return this.nombre;
  }
}