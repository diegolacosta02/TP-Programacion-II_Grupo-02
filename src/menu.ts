import { TipoEstacionTrabajo } from "./constantes/tipoEstacion";

export abstract class Menu {
  protected nombre: string;
  protected precio: number;

  public constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }

  public abstract getPrecio(): number;

  public getNombre(): string {
    return this.nombre;
  }

  public abstract getEstacionDeTrabajo(nombreProducto: string): TipoEstacionTrabajo

}