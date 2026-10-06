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

    public pop(): T | undefined {
        if (this.isEmpty()){
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    public isEmpty(): boolean {
        return this.head === undefined;
    }

}