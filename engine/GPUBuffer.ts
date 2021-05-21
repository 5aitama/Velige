import ComponentBase from "./component_base";
import { VertexBase } from "./VertexBase";
import { DataType } from "./types";

export enum BufferTarget {
    Array   = WebGLRenderingContext['ARRAY_BUFFER'],
    Element = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'],
}

export enum BufferUsage {
    Static  = WebGLRenderingContext['STATIC_DRAW'],
    Dynamic = WebGLRenderingContext['DYNAMIC_DRAW'],
}

export class GPUBuffer {
    /** The buffer */
    private _buffer: WebGLBuffer;

    /** The buffer target */
    private _target: BufferTarget;

    /** The buffer usage */
    private _usage: BufferUsage;

    /** The buffer size (in byte) */
    private _size: number;

    /** The amount of elements in the buffer */
    private _length: number;

    /** Indicate if the buffer data was initialized */
    private _is_initialized = false;

    /** The rendering context. */
    private _gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext, target: BufferTarget, usage: BufferUsage) {
        this._target = target;
        this._usage  = usage;
        this._gl     = gl;
        this._size   = 0;
        this._length = 0;

        const buff = gl.createBuffer();

        if(!buff) {
            throw new Error("Failed to create new GPUBuffer");
        }

        this._buffer = buff;
    }

    /**
     * Initialize the current GPUBuffer with some data or 
     * with an initial size *(in bytes)*.
     * @param data The buffer data or the buffer size *(in bytes)*.
     * @param length The amount of elements in the buffer.
     */
    public initBuffer(data: ArrayBuffer | number, length: number) {
        this.gl.bindBuffer(this._target, this._buffer);
        this._length = length;
        
        if(data instanceof ArrayBuffer) {
            this.gl.bufferData(this._target, data, this._usage);
            this._size = data.byteLength;
        } else {
            this.gl.bufferData(this._target, data, this._usage);
            this._size = data;
        }

        this._is_initialized = true;
    }

    /**
     * Delete the current buffer from the GPU.
     */
    public deleteBuffer() {
        if(this.isInitialized)
            this.gl.deleteBuffer(this._buffer);
        
        this._size = 0;
        this._is_initialized = false;
    }

    public bind() {
        this.gl.bindBuffer(this._target, this._buffer);
    }

    /**
     * Update the buffer data in the GPU.
     * @param offset The offset *(in bytes)* on where we start update the buffer data.
     * @param data The new data.
     */
    public updateData(offset: number, data: ArrayBuffer) {
        if(!this.isInitialized) {
            console.warn("Can't update the buffer data: You must initialize the buffer first before do that.");
            return;
        }

        this.gl.bindBuffer(this._target, this._buffer);
        this.gl.bufferSubData(this._target, offset, data);
    }

    public get isInitialized() {
        return this._is_initialized;
    }

    public get gl() {
        return this._gl;
    }

    public get size() {
        return this._size;
    }

    public get length() {
        return this._length;
    }

    public static createFromComponents<T extends ComponentBase>(gl: WebGLRenderingContext, usage: BufferUsage, target: BufferTarget, components: T[]) {
        
        if(components.length === 0) {
            return null;
        }

        const gpuBuffer = new GPUBuffer(gl, target, usage);

        // The size of the buffer in bytes.
        let bufferSize = components.length * components[0].size;

        gpuBuffer.initBuffer(bufferSize, components.length);

        const bufferData = new ArrayBuffer(bufferSize);
        const bufferDataView = new DataView(bufferData);

        let offset = 0;

        for(let i = 0; i < components.length; i++) {

            const dataType = components[i].singleDataType;

            for(let j = 0; j < components[i].data.length; j++) {
                
                switch(dataType) {
                    case DataType.u8: 
                        bufferDataView.setUint8(offset, components[i].data[j]);
                    break;
                    case DataType.u16: 
                        bufferDataView.setUint16(offset, components[i].data[j], true); 
                    break;
                    case DataType.u32: 
                        bufferDataView.setUint32(offset, components[i].data[j], true); 
                    break;

                    case DataType.i8: 
                        bufferDataView.setInt8(offset, components[i].data[j]); 
                    break;
                    case DataType.i16: 
                        bufferDataView.setInt16(offset, components[i].data[j], true); 
                    break;
                    case DataType.i32: 
                        bufferDataView.setInt32(offset, components[i].data[j], true); 
                    break;

                    case DataType.f32: 
                        bufferDataView.setFloat32(offset, components[i].data[j], true); 
                    break;
                }

                offset += components[i].singleDataSize;
            }
        }

        gpuBuffer.updateData(0, bufferData);

        return gpuBuffer;
    }

    public static createFromVertices<T extends VertexBase>(gl: WebGLRenderingContext, usage: BufferUsage, vertices: T[]) {
        
        if(vertices.length === 0) {
            return null;
        }

        const gpuBuffer = new GPUBuffer(gl, BufferTarget.Array, usage);

        // The size of the buffer in bytes.
        let bufferSize = vertices.length * vertices[0].size;

        gpuBuffer.initBuffer(bufferSize, vertices.length);

        const bufferData = new ArrayBuffer(bufferSize);
        const bufferDataView = new DataView(bufferData);

        let offset = 0;

        for(let i = 0; i < vertices.length; i++) {
            for(let j = 0; j < vertices[i].components.length; j++) {

                const dataType = vertices[i].components[j].singleDataType;

                for(let k = 0; k < vertices[i].components[j].data.length; k++) {
                    
                    switch(dataType) {
                        case DataType.u8: 
                            bufferDataView.setUint8(offset, vertices[i].components[j].data[k]); 
                        break;
                        case DataType.u16: 
                            bufferDataView.setUint16(offset, vertices[i].components[j].data[k], true); 
                        break;
                        case DataType.u32: 
                            bufferDataView.setUint32(offset, vertices[i].components[j].data[k], true); 
                        break;

                        case DataType.i8: 
                            bufferDataView.setInt8(offset, vertices[i].components[j].data[k]); 
                        break;
                        case DataType.i16: 
                            bufferDataView.setInt16(offset, vertices[i].components[j].data[k], true); 
                        break;
                        case DataType.i32: 
                            bufferDataView.setInt32(offset, vertices[i].components[j].data[k], true); 
                        break;

                        case DataType.f32: 
                            bufferDataView.setFloat32(offset, vertices[i].components[j].data[k], true); 
                        break;
                    }

                    offset += vertices[i].components[j].singleDataSize;
                }
            }
        }

        gpuBuffer.updateData(0, bufferData);

        return gpuBuffer;
    }
}