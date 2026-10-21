import MyNode from "./mynode";

export default class Stack<T> {
    private head: MyNode<T>;

    public constructor() {
        this.head = undefined as unknown as MyNode<T>;
    }

    public push(value: T): void {
        const newNode = new MyNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    // eslint-disable-next-line id-length
    public pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    public isEmpty(): boolean {
        return this.head === undefined;
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

    public peek(): T | undefined {
        return this.isEmpty() ? undefined : this.head.value;
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
}