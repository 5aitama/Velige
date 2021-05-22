import { Indices } from "./Indices";
import Buffer from "./Buffer";
import { BufferTarget, BufferUsage } from "../GPUBuffer";
import { setTypedData } from "../Core/DataViewUtils";

/**
 * Class that help us to transform
 * a `Indices` to a `Buffer`.
 */
 export default class IndicesBuffer<T extends Indices> {
    /** The indices. */
    private _indices: T[];

    /** The context. */
    private _gl: WebGLRenderingContext;

    /** The buffer. */
    private _buffer: Buffer;

    constructor(gl: WebGLRenderingContext, indices: T[], usage: BufferUsage) {
        this._gl = gl;
        this._indices = indices;
        this._buffer = new Buffer(BufferTarget.Element, usage);

        this._buffer.initBuffer(this._gl, this.inlineData());
    }

    /**
     * Update the buffer data. **This function
     * update the entire buffer so be carefull
     * when you call this.**
     */
    updateBufferData(): void;

    /**
     * Updates a part of the buffer according to 
     * the vertex that was modified.
     * @param index The index of the vertex that was modified.
     */
    updateBufferData(index: number): void;

    /**
     * Updates several parts of the buffer according 
     * to the indices that have been modified.
     * @param indices The index of the indices that was modified.
     */
    updateBufferData(indices: number[]): void;

    /**
     * Update the buffer data.
     */
    updateBufferData(index?: number | number[]) {
        if(index !== undefined) {
            if(Array.isArray(index)) {
                for(let i = 0; i < index.length; i++) {
                    this.updateBufferData(index[i]);
                }
            } else {
                const size = this._indices[0].size;
                const offset = size * index;

                const bufferArray = new ArrayBuffer(size);
                const view = new DataView(bufferArray);

                let dataOffset = offset;

                for(let i = 0; i < this._indices[index].indices.data.length; i++) {
                    dataOffset += setTypedData(dataOffset, this._indices[index].indices.data[i], view);
                }

                this._buffer.updateBufferData(this._gl, offset, bufferArray);
            }
        } else {
            this._buffer.updateBufferData(this._gl, 0, this.inlineData());
        }
    }

    /**
     * Put all vertex data together into a single array. 
     * It keep the vertex order.
     * @returns An array that contains all vertex data.
     */
    inlineData() {
        const bufferArray = new ArrayBuffer(this._indices[0].size * this._indices.length);
        const view = new DataView(bufferArray);

        let offset = 0;
        
        for(let i = 0; i < this._indices.length; i++) {
            for(let j = 0; j < this._indices[i].indices.data.length; j++) {
                offset += setTypedData(offset, this._indices[i].indices.data[j], view);
            }
        }

        return bufferArray;
    }

}