import ISized from "../Core/ISized";
import TypedData from "../Core/TypedData";
import { DataType } from "../Core/types";
import { Vector, Vector3, Vector4 } from "./Vector";

/**
 * The base class of all `Matrix` classes.
 * All `Matrix` classes need to extends this
 * class.
 */
export class Matrix<V extends Vector> implements ISized {
    /** The matrix data */
    private _data: TypedData[];

    /** The matrix size *(in bytes)* */
    private _size: number = 0;

    /** The matrix data type */
    private _type: DataType = 0;

    /** The matrix width */
    private _width: number;

    /** The matrix height */
    private _height: number;

    constructor(data: TypedData[], width: number, height: number) {
        this._data = data;
        this._width = width;
        this._height = height;
        this.recalculateSize();
    }

    /** Recalculate the size *(in bytes)* of the current `Matrix`. */
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

    /** The matrix data. */
    public get data() {
        return this._data;
    }

    /** The matrix size *(in bytes)* */
    public get size() {
        return this._size;
    }

    /** The type of each element in this `Matrix`. */
    public get type() {
        return this._type;
    }

    /** The matrix with */
    public get width() {
        return this._width;
    }

    /** The matrix height */
    public get height() {
        return this._height;
    }

    /** @param data The new matrix data. */
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
     * Multiply two `Matrix`.
     * @param a Left hand side matrix.
     * @param b Right hand side matrix.
     */
    public static mul<T extends Matrix<Vector>>(a: T, b: T) : T {
        const result: TypedData[] = new Array(a.width * a.height);

        for(let r = 0; r < a.width; r++) {
            const row = a.row(r);
            for(let c = 0; c < a.height; c++) {
                result[r * a.width + c] = Vector.dot(row, b.column(c));
            }
        }

        return new Matrix(result, a.width, a.height) as T;
    }

    /**
     * Get the matrix row.
     * @param index The row index.
     * @returns The matrix row.
     */
    row<T extends Vector>(index: number): T;

    /**
     * Set the matrix row.
     * @param index The row index.
     * @param data The new matrix row data.
     */
    row(index: number, data: number[]): void;

    row(index: number, data?: number[]) {
        const _index = index * this._width;
        if(data !== undefined) {
            for(let i = 0; i < this._width; i++)
                this.data[i + _index] = new TypedData(data[i], this.type);
            return;
        } else {
            const row: TypedData[] = new Array(this._width);

            for(let i = 0; i < this._width; i++)
                row[i] = this.data[i + _index];
            
           return new Vector(row) as V;
        }
    }
 
    /**
     * Get the matrix column.
     * @param index The column index.
     * @returns The matrix column.
     */
    column<T extends Vector>(index: number): T;
 
    /**
     * Set the matrix column.
     * @param index The column index.
     * @param data The new matrix column data.
     */
    column(index: number, data: number[]): void;

    column(index: number, data?: number[]) {
        const _index = index;
        if(data !== undefined) {
            for(let i = 0; i < this._height; i++)
                this.data[i * this._width + _index] = new TypedData(data[i], this._type);
            return;
        } else {
            const col: TypedData[] = new Array(this._height);
            for(let i = 0; i < this._height; i++)
                col[i] = this.data[i * this._width + _index];
            
            return new Vector(col) as V;
        }
    }
}

/**
 * A 4x4 matrix.
 */
export class Matrix4x4 extends Matrix<Vector4> {

    /**
     * Create new instance of `Matrix4x4`.
     * @param data The matrix data.
     * @param type The type of each matrix data.
     */
    constructor(data: number[], type: DataType) {
        const typedData: TypedData[] = [];

        for(let i = 0; i < data.length; i++) {
            typedData[i] = new TypedData(data[i], type);
        }

        super(typedData, 4, 4);
    }

    /**
     * Create a identity matrix.
     * @param type The type of each matrix data.
     * @returns A 4x4 identity matrix.
     */
     identity(type: DataType) {
        return new Matrix4x4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ], type);
    }
}

/**
 * A 3x3 matrix.
 */
 export class Matrix3x3 extends Matrix<Vector3> {

    /**
     * Create new instance of `Matrix3x3`.
     * @param data The matrix data.
     * @param type The type of each matrix data.
     */
    constructor(data: number[], type: DataType) {
        const typedData: TypedData[] = [];

        for(let i = 0; i < data.length; i++) {
            typedData[i] = new TypedData(data[i], type);
        }

        super(typedData, 3, 3);
    }

    /**
     * Create a identity matrix.
     * @param type The type of each matrix data.
     * @returns A 3x3 identity matrix.
     */
    identity(type: DataType) {
        return new Matrix3x3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ], type);
    }
}