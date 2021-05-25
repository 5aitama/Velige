import { DataType } from "../Core/types";

/**
 * GPU buffer target.
 */
export enum BufferTarget {
    Array = WebGLRenderingContext['ARRAY_BUFFER'],
    Element = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'],
}

/**
 * GPU buffer usage.
 */
export enum BufferUsage {
    Static = WebGLRenderingContext['STATIC_DRAW'],
    Dynamic = WebGLRenderingContext['DYNAMIC_DRAW'],
}

/**
 * This class is a abstraction of `WebGLBuffer` and
 * allow us to easly manage a `WebGLBuffer`.
 */
export default class Buffer {

    /** The raw `WebGLBuffer`. */
    private _rawBuffer: WebGLBuffer | null = null;

    /** The current buffer target */
    private _target: BufferTarget;

    /** The current buffer usage */
    private _usage: BufferUsage;

    /** The current buffer size *(in bytes)* */
    private _size: number = 0;

    /** Indicate if the buffer was created */
    private _isCreated: boolean = false;

    /**
     * Create new instance of `Buffer`.
     * @param target The buffer target.
     * @param usage The buffer usage.
     */
    constructor(target: BufferTarget, usage: BufferUsage) {
        this._target = target;
        this._usage = usage;
    }

    /** The current buffer size *(in bytes)* */
    get size() {
        return this._size;
    }

    /** The current buffer target */
    get target() {
        return this._target;
    }

    /** The current buffer usage */
    get usage() {
        return this._usage;
    }

    /** Indicate if the buffer was created */
    get isCreated() {
        return this._isCreated;
    }

    /**
     * Delete the buffer properly.
     * @param gl The context.
     */
    deleteBuffer(gl: WebGLRenderingContext) {
        if(this._isCreated)
            gl.deleteBuffer(this._rawBuffer);
    }

    /**
     * Initialize the buffer with some data. if the buffer is
     * already initialized, this function destroy
     * the old buffer and create new one.
     * @param gl The context.
     * @param data The buffer data.
     */
    initBuffer(gl: WebGLRenderingContext, data: BufferSource) : void;

    /**
     * Initialize the buffer with specified size. if the buffer is
     * already initialized, this function destroy
     * the old buffer and create new one.
     * @param gl The context.
     * @param size The buffer size *(in bytes)*
     */
    initBuffer(gl: WebGLRenderingContext, size: number): void;

    /**
     * Initialize the buffer with specified size. if the buffer is
     * already initialized, this function destroy
     * the old buffer and create new one.
     * @param gl The context.
     * @param type The type of each data element.
     * @param count The amount of element.
     */
    initBuffer(gl: WebGLRenderingContext, type: DataType, count: number): void;

    /**
     * Initialize the buffer. if the buffer is
     * already initialized, this function destroy
     * the old buffer and create new one.
     * @param gl The context.
     * @param data The buffer data.
     * @param count The buffer data amount.
     */
    initBuffer(gl: WebGLRenderingContext, data: BufferSource | number | DataType, count?: number) {
        if(this._isCreated)
            this.deleteBuffer(gl);
        
        const buffer = gl.createBuffer();

        if(buffer === null) {
            console.warn("Failed to create buffer !");
            return;
        }

        gl.bindBuffer(this._target, buffer);

        if(typeof data === 'number') {
            if(count != undefined) {
                gl.bufferData(this._target, data * count, this._usage);
                this._size = data * count;
            } else {
                gl.bufferData(this._target, data, this._usage);
                this._size = data;
            }
        } else {
            gl.bufferData(this._target, data, this._usage);
            this._size = data.byteLength;
        }

        this._rawBuffer = buffer;
        this._isCreated = true;
    }
    
    /**
     * Update the buffer data.
     * @param gl The context.
     * @param offset The position *(in bytes)* in the buffer where to start to update data.
     * @param data The new data.
     */
    updateBufferData(gl: WebGLRenderingContext, offset: number, data: BufferSource) {
        if(!this._isCreated) {
            console.warn("Can't update the buffer: You must need to initialize it before do that.")
            return;
        }

        if(data.byteLength > this._size - offset) {
            console.warn(`Can't update the buffer: The data is too long for this buffer.`)
            return;
        }

        gl.bindBuffer(this._target, this._rawBuffer);
        gl.bufferSubData(this._target, offset, data);
    }

    /**
     * Bind the buffer.
     * @param gl The context.
     * @param target The buffer target.
     */
    bindBuffer(gl: WebGLRenderingContext, target: BufferTarget) {
        gl.bindBuffer(target, this._rawBuffer);
    }
}