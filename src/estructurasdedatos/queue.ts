import MyNode from "./mynode";

export default class Queue<T> {
    private first: MyNode<T> | undefined;
    private last: MyNode<T> | undefined;

    public constructor() {
        this.first = undefined;
        this.last = undefined;
    }

    public enqueue(value: T): void {
        const newNode = new MyNode(value);
        if (this.last === undefined) {
            this.first = newNode;
        } else {
            this.last.next = newNode;
        }
        this.last = newNode;
    }

    public dequeue(): T {
        if (this.first === undefined) {
            throw new Error("La cola está vacía.");
        }
        const value = this.first.value;
        this.first = this.first.next;
        if (this.first === undefined) {
            this.last = undefined;
        }
        return value;
    }

    public isEmpty(): boolean {
        return this.first === undefined;
    }

    public size(): number {
        return this.toArray().length;
    }

    public toArray(): T[] {
        const resultado: T[] = [];
        let actual = this.first;
        while (actual !== undefined) {
            resultado.push(actual.value);
            actual = actual.next;
        }
        return resultado;
    }
}
