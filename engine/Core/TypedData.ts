import { DataType, sizeOfDataType } from "../types";

/**
 * Represent a typed data. I don't know if it
 * is good to do that but it's very usefull
 * especially to do GPU things.
 */
export default class TypedData {
    /** The `TypedData` value. */
    private _value: number;
    
    /** The `TypedData` type. */
    private _type: DataType;
    
    /** The `TypedData` size *(in bytes)* */
    private _size: number;

    /**
     * Create new instance of `TypedData`.
     * @param value The value.
     * @param type The type
     * @param size The size (in bytes)
     */
    constructor(value: number, type: DataType) {
        this._value = value;
        this._type  = type;
        this._size  = sizeOfDataType(type)!;
    }

    /** The `TypedData` value. */
    get value() {
        return this._value;
    }

    /** The `TypedData` type. */
    get type() {
        return this._type;
    }

    /** The `TypedData` size *(in bytes)* */
    get size() {
        return this._size;
    }

    /** 
     * The `TypedData` value. 
     * @param value The new `TypedData` value.
     */
    set value(value) {
        this._value = value;
    }
}