export default interface Comando {
    ejecutar(): void;
    deshacer(): void;
}