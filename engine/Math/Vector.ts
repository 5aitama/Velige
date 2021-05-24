import ISized from "../Core/ISized";
import TypedData from "../Core/TypedData";
import { DataType } from "../Core/types";

/**
 * The base class of all `Vector` classes.
 * All `Vector` classes need to extends this
 * class.
 */
export class Vector implements ISized {
    /** The vector data. */
    private _data: TypedData[];

    /** The size of the current `Vector` *(in bytes)* */
    private _size: number = 0;

    /** The data type in this `Vector`. */
    private _type: DataType = 0;

    /**
     * Create new instance of `Vector` class.
     * @param data The vector data.
     */
    constructor(data: TypedData[]) {
        this._data = data;
        this.recalculateSize();
    }

    /** Recalculate the size *(in bytes)* of the current `Vector`. */
    private recalculateSize() {
        let size = 0;
        let dataType: DataType | null = null;

        for(let i = 0; i < this._data.length; i++) {
            size += this._data[i].size;
            
            if(dataType === null)
                dataType = this._data[i].type;
            else 
                if(this._data[i].type !== dataType)
                    throw new Error("Vector error: The vector data must be the same the same data type")
        }
        
        this._size = size;
        this._type = dataType!;
    }

    /** The vector data. */
    public get data() {
        return this._data;
    }

    /** The vector size *(in bytes)* */
    public get size() {
        return this._size;
    }

    /** The type of each element in this `Vector`. */
    public get type() {
        return this._type;
    }

    /** @param data The new vector data. */
    public set data(data) {
        this._data = data;
    }

    /**
     * Replace a data element by a new `TypedData`.
     * @param index The index of the data element to be replaced.
     * @param newData The new data element.
     */
    protected setDataItem(index: number, newData: TypedData) {
        this._data[index] = newData;

        // We recalculate the size because
        // the `newData` type may not be the
        // same as the old `TypedData`.
        this.recalculateSize();
    }

    /**
     * Update the value of a data element.
     * @param index The index of the data element to be updated.
     * @param value The new data element value.
     */
    protected updateDataItem(index: number, value: number) {
        this._data[index].value = value;
    }

    /**
     * Perform a dot product between two vector.
     * @param a The right hand side vector.
     * @param b The left hand size vector.
     * @returns The result of a • b.
     */
    public static dot<T extends Vector>(a: T, b: T) : TypedData {
        let result = new TypedData(0, a.type);

        for(let i = 0; i < a.data.length; i++) {
            result.value += a.data[i].value * b.data[i].value;
        }

        return result;
    }

    /**
     * Perform an addition of two vector.
     * @param a The right hand side vector.
     * @param b The left hand size vector.
     * @returns The result of a + b.
     */
    public static add<T extends Vector>(a: T, b: T) : T {
        const data: TypedData[] = new Array(a.data.length);

        for(let i = 0; i < a.data.length; i++) {
            data[i] = new TypedData(a.data[i].value + b.data[i].value, a.data[i].type);
        }

        return new Vector(data) as T;
    }

    /**
     * Perform a substraction of two vector.
     * @param a The right hand side vector.
     * @param b The left hand size vector.
     * @returns The result of a - b.
     */
    public static sub<T extends Vector>(a: T, b: T) : T {
        const data: TypedData[] = new Array(a.data.length);

        for(let i = 0; i < a.data.length; i++) {
            data[i] = new TypedData(a.data[i].value - b.data[i].value, a.data[i].type);
        }

        return new Vector(data) as T;
    }

    /**
     * Perform a multiplication of two vector.
     * @param a The right hand side vector.
     * @param b The left hand size vector.
     * @returns The result of a * b.
     */
    public static mul<T extends Vector>(a: T, b: T) : T {
        const data: TypedData[] = new Array(a.data.length);

        for(let i = 0; i < a.data.length; i++) {
            data[i] = new TypedData(a.data[i].value * b.data[i].value, a.data[i].type);
        }

        return new Vector(data) as T;
    }

    /**
     * Perform a division of two vector.
     * @param a The right hand side vector.
     * @param b The left hand size vector.
     * @returns The result of a / b.
     */
    public static div<T extends Vector>(a: T, b: T) : T {
        const data: TypedData[] = new Array(a.data.length);

        for(let i = 0; i < a.data.length; i++) {
            data[i] = new TypedData(a.data[i].value / b.data[i].value, a.data[i].type);
        }

        return new Vector(data) as T;
    }
}

/**
 * A two dimensional vector representation.
 */
export class Vector2 extends Vector {
    /**
     * Create new instance of `Vector2` class.
     * @param x The `x` component value of the vector.
     * @param y The `y` component value of the vector.
     * @param type The type of each components value of the vector.
     */
    constructor(x: number | TypedData[], y?: number, type?: DataType) {
        if(Array.isArray(x)) {
            super(x);
        } else {
            if(y === undefined || type === undefined) {
                throw new Error("You need to provide the Y value and the type!");
            }
            super([
                new TypedData(x, type), 
                new TypedData(y, type),
            ]);
        }
    }

    /** The `x` component of the vector */
    get x() { return this.data[0].value }

    /** The `y` component of the vector */
    get y() { return this.data[1].value }

    /**
     * @param x The new `x` component value.
     */
    set x(x) { this.updateDataItem(0, x) }

    /**
     * @param y The new `y` component value.
     */
    set y(y) { this.updateDataItem(1, y) }
}

/**
 * A three dimensional vector representation.
 */
 export class Vector3 extends Vector {
    /**
     * Create new instance of `Vector2` class.
     * @param x The `x` component value of the vector.
     * @param y The `y` component value of the vector.
     * @param z The `z` component value of the vector.
     * @param type The type of each components value of the vector.
     */
    constructor(x: number | TypedData[], y?: number, z?: number, type?: DataType) {
        if(Array.isArray(x)) {
            super(x);
        } else {
            if(y === undefined || z === undefined || type === undefined) {
                throw new Error("You need to provide the Y value, Z value and the type!");
            }
            super([
                new TypedData(x, type), 
                new TypedData(y, type),
                new TypedData(z, type),
            ]);
        }
    }

    /** The `x` component of the vector */
    get x() { return this.data[0].value }

    /** The `y` component of the vector */
    get y() { return this.data[1].value }

    /** The `z` component of the vector */
    get z() { return this.data[2].value }

    /**
     * @param x The new `x` component value.
     */
    set x(x) { this.updateDataItem(0, x) }

    /**
     * @param y The new `y` component value.
     */
    set y(y) { this.updateDataItem(1, y) }

    /**
     * @param z The new `z` component value.
     */
    set z(z) { this.updateDataItem(2, z) }
}

/**
 * A four dimensional vector representation.
 */
 export class Vector4 extends Vector {
    /**
     * Create new instance of `Vector2` class.
     * @param x The `x` component value of the vector.
     * @param y The `y` component value of the vector.
     * @param z The `z` component value of the vector.
     * @param w The `w` component value of the vector.
     * @param type The type of each components value of the vector.
     */
    constructor(x: number | TypedData[], y?: number, z?: number, w?: number, type?: DataType) {
        if(Array.isArray(x)) {
            super(x);
        } else {
            if(y === undefined || z === undefined || w === undefined || type === undefined) {
                throw new Error("You need to provide the Y value, Z value, W value and the type!");
            }
            super([
                new TypedData(x, type), 
                new TypedData(y, type),
                new TypedData(z, type),
                new TypedData(w, type),
            ]);
        }
    }

    /** The `x` component of the vector */
    get x() { return this.data[0].value }

    /** The `y` component of the vector */
    get y() { return this.data[1].value }

    /** The `z` component of the vector */
    get z() { return this.data[2].value }

    /** The `w` component of the vector */
    get w() { return this.data[3].value }

    /**
     * @param x The new `x` component value.
     */
    set x(x) { this.updateDataItem(0, x) }

    /**
     * @param y The new `y` component value.
     */
    set y(y) { this.updateDataItem(1, y) }

    /**
     * @param z The new `z` component value.
     */
    set z(z) { this.updateDataItem(2, z) }

    /**
     * @param w The new `w` component value.
     */
    set w(w) { this.updateDataItem(3, w) }
}