
export default class MyNode<T> {
    private _value: T;
    private _next: MyNode<T> | undefined;

    public constructor(value: T) {
        this._value = value;
        this._next = undefined;
    }

    public get value(): T {
        return this._value;
    }

    public get next(): MyNode<T> | undefined {
        return this._next;
    }

    public set next(node: MyNode<T> | undefined) {
        this._next = node;
    }
}
