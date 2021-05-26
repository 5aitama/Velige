import { setTypedData } from "../Core/DataViewUtils";
import { BufferTarget, BufferUsage } from "./Buffer";
import Buffer from "./Buffer";
import { Vertex } from "./Vertex";
// import { IMeshBuffer } from "./IMeshBuffer";

/**
 * Class that help us to transform
 * a `Vertex` to a `Buffer`.
 */
export default class VertexBuffer<T extends Vertex> implements IMeshBuffer {
    /** The vertices. */
    private _vertices: T[];

    /** The context. */
    private _gl: WebGLRenderingContext;

    /** The buffer. */
    private _buffer: Buffer;

    constructor(gl: WebGLRenderingContext, vertices: T[], usage: BufferUsage) {
        this._gl = gl;
        this._vertices = vertices;
        this._buffer = new Buffer(BufferTarget.Array, usage);

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
     updateBufferData(index: number, length: number): void;

    /**
     * Updates several parts of the buffer according 
     * to the vertices that have been modified.
     * @param indices The index of the vertices that was modified.
     */
    updateBufferData(indices: number[], lengths: number[]): void;

    /**
     * Update the buffer data.
     */
    updateBufferData(index?: number | number[], length?: number | number[]) {
        if(index !== undefined) {
            if(Array.isArray(index)) {
                for(let i = 0; i < index.length; i++) {
                    this.updateBufferData(index[i], (length as number[])[i]);
                }
            } else {
                const size = this._vertices[0].size;
                const offset = size * index;

                const bufferArray = new ArrayBuffer(size);
                const view = new DataView(bufferArray);

                let dataOffset = offset;
                
                for(let k = 0; k < (length as number); k++) {
                    for(let i = 0; i < this._vertices[index + k].vectors.length; i++) {
                        for(let j = 0; j < this._vertices[index + k].vectors[i].data.length; j++) {
                            dataOffset += setTypedData(dataOffset, this._vertices[index + k].vectors[i].data[j], view);
                        }
                    }
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
        const bufferArray = new ArrayBuffer(this._vertices[0].size * this._vertices.length);
        const view = new DataView(bufferArray);

        let offset = 0;
        
        for(let i = 0; i < this._vertices.length; i++) {
            for(let j = 0; j < this._vertices[i].vectors.length; j++) {
                for(let k = 0; k < this._vertices[i].vectors[j].data.length; k++) {
                    setTypedData(offset, this._vertices[i].vectors[j].data[k], view);
                    offset += this._vertices[i].vectors[j].data[k].size;
                }
            }
        }

        return bufferArray;
    }

    /**
     * Simply bind the buffer.
     */
    bindBuffer() {
        this._buffer.bindBuffer(this._gl, BufferTarget.Array);
    }

    /**
     * Safely delete the buffer.
     */
    deleteBuffer() {
        this._buffer.deleteBuffer(this._gl);
    }

}