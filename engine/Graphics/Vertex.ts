import ISized from "../Core/ISized";
import { Vector } from "../Math/Vector";
import { DataType } from "../types";

/**
 * Little wrapper of WebGL `VertexAttribute`. It contain
 * the same data as a regular `VertexAttribute`. Is just
 * an "Objectify" version of the WebGL `VertexAttribute`.
 */
export class VertexAttribute {
    /** The number of components per vertex attribute */
    private _size: number;

    /** The data type of each components */
    private _type: DataType;

    /** The index of the vertex attribute. */
    private _index: number;

    /**
     * The offset in bytes between the beginning of consecutive 
     * vertex attributes. Cannot be larger than 255. If stride 
     * is 0, the attribute is assumed to be tightly packed, that 
     * is, the attributes are not interleaved but each attribute 
     * is in a separate block, and the next vertex' attribute 
     * follows immediately after the current vertex.
     */
    private _stride: number;

    /**
     * The offset in bytes of the first component in the vertex 
     * attribute array. Must be a multiple of the byte length of 
     * type.
     */
    private _offset: number;

    /** Indicate if the data must be normalized */
    private _normalized: boolean;
    
    /**
     * Create new instance of `VertexAttribute` class.
     * @param index The index of the vertex attribute.
     * @param size The number of components per vertex attribute
     * @param type The data type of each components
     * @param normalized If the data must be normalized
     * @param stride Specifying the offset in bytes between the beginning of consecutive vertex attributes. Cannot be larger than 255. If stride is 0, the attribute is assumed to be tightly packed, that is, the attributes are not interleaved but each attribute is in a separate block, and the next vertex' attribute follows immediately after the current vertex.
     * @param offset The offset in bytes of the first component in the vertex attribute array. Must be a multiple of the byte length of type.
     */
    constructor(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        this._size = size;
        this._type = type;
        this._index = index;
        this._stride = stride;
        this._offset = offset;
        this._normalized = normalized;
    }

    /** The index of the vertex attribute. */
    get index() {
        return this._index;
    }

    /** The number of components per vertex attribute */
    get size() {
        return this._size;
    }

    /** The data type of each components */
    get type() {
        return this._type;
    }

    /**
     * The offset in bytes between the beginning of consecutive 
     * vertex attributes. Cannot be larger than 255. If stride 
     * is 0, the attribute is assumed to be tightly packed, that 
     * is, the attributes are not interleaved but each attribute 
     * is in a separate block, and the next vertex' attribute 
     * follows immediately after the current vertex.
     */
    get stride() {
        return this._stride;
    }

    /**
     * The offset in bytes of the first component in the vertex 
     * attribute array. Must be a multiple of the byte length of 
     * type.
     */
    get offset() {
        return this._offset;
    }

    /** Indicate if the data must be normalized */
    get normalized() {
        return this._normalized;
    }
}

export class Vertex implements ISized {
    /** The vertex vectors. */
    private _vectors: Vector[];

    /** The vertex size *(in bytes)* */
    private _size: number = 0;

    constructor(vectors: Vector[]) {
        this._vectors = vectors;
        this.recalculateSize();
    }

    /**
     * The size of the vertex *(in byte)*
     */
    get size() {
        return this._size;
    }

    /**
     * The vector array.
     */
    public get vectors() { 
        return this._vectors; 
    }
    
    /**
     * @param value The new vector array.
     */
    public set vectors(value) {
        this._vectors = value;
        this.recalculateSize();
    }

    /**
     * Recalculate the size of the current `Vertex`.
     */
    private recalculateSize() {
        this._size = 0;

        for(let i = 0; i < this._vectors.length; i++)
           this._size += this._vectors[i].size;
    }

    /**
     * Create an array vertex attributes from a vertex.
     * @param vertex The vertex.
     * @returns An array of `VertexAttribute`
     */
    public static CreateVertexAttributes<T extends Vertex>(vertex: T) {
        let offset = 0;
        const attributes: VertexAttribute[] = [];

        for(let i = 0; i < vertex.vectors.length; i++) {
            const attribute = new VertexAttribute(
                i, 
                vertex.vectors[i].data.length, 
                vertex.vectors[i].type,
                false,
                vertex.size, 
                offset
            );

            offset += vertex.vectors[i].size;
            attributes.push(attribute);
        }

        return attributes;
    }
}