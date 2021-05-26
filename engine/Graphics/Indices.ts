import { ISized } from "../Core/ISized";
import { Vector3 } from "../Math/Vector";

/**
 * A triangle indices representation.
 */
 export class Indices implements ISized {
    /** The triangle indices. */
    private _indices: Vector3;

    /** The triangle indices size *(in bytes)* */
    private _size: number = 0;

    constructor(indices: Vector3) {
        this._indices = indices;
        this.recalculateSize();
    }

    /**
     * The size of the triangle indices *(in byte)*
     */
    get size() {
        return this._size;
    }

    /**
     * The indices.
     */
    public get indices() { 
        return this._indices; 
    }
    
    /**
     * @param value The new indices.
     */
    public set indices(value) {
        this._indices = value;
        this.recalculateSize();
    }

    /**
     * Recalculate the size of the current `Indices`.
     */
    private recalculateSize() {
        this._size = this._indices.size;
    }
}