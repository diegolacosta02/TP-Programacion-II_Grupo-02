import MyNode from "./mynode";

export default class Stack<T> {
    private head: MyNode<T> | undefined;

    public constructor() {
        this.head = undefined;
    }

    public push(value: T): void {
        const newNode = new MyNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    public pops(): T {
        if (this.head === undefined) {
            throw new Error("La pila está vacía.");
        }
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    public peek(): T {
        if (this.head === undefined) {
            throw new Error("La pila está vacía.");
        }
        return this.head.value;
    }

    public isEmpty(): boolean {
        return this.head === undefined;
    }

    public size(): number {
        let contador = 0;
        let actual = this.head;
        while (actual !== undefined) {
            contador++;
            actual = actual.next;
        }
        return contador;
    }

    public toArray(): T[] {
        const resultado: T[] = [];
        let actual = this.head;
        while (actual !== undefined) {
            resultado.push(actual.value);
            actual = actual.next;
        }
        return resultado.reverse();
    }
}
