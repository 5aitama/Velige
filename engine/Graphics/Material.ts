import { TypedData } from "../Core/TypedData";
import { DataType } from "../Core/types";
import { Matrix, Matrix4x4 } from "../Math/Matrix";
import { Vector } from "../Math/Vector";
import { Shader } from "./Shader";

/**
 * Represent a shader uniform data.
 */
export interface IUniformData {
    /** Indicate if the uniform need to be update */
    needUpdate: boolean,

    /** The uniform value */
    value: TypedData[],

    /** The amount of components per value data. */
    size: number,

    /** The uniform location */
    location: WebGLUniformLocation | undefined,

    /** The type of each uniform data value(s) */
    type: DataType,

    /** Indicate if the data is a matrix data. */
    isMatrix: boolean,
}

export class Material {

    /** The material shader. */
    private _shader: Shader;

    /** The shader uniforms data */
    private _uniforms: {[name: string] : IUniformData } = {};

    /**
     * Create new instance of `Material`.
     * @param shader The shader.
     */
    constructor(shader: Shader) {
        this._shader = shader;
    }

    /** The shader. */
    public get shader() {
        return this._shader;
    }

    /** The material uniforms data. */
    public get uniforms() {
        return this._uniforms;
    }

    /**
     * Set an uniform data that would be a float.
     * @param gl The context.
     * @param location The uniform location.
     * @param size The amount of components.
     * @param data The uniform data.
     */
    private setUniformFloats(gl: WebGLRenderingContext, location: WebGLUniformLocation, size: number, data: TypedData[]) {
        switch(size) {
            case 1: gl.uniform1fv(location, new Float32Array(data.map(x => x.value))); break;
            case 2: gl.uniform2fv(location, new Float32Array(data.map(x => x.value))); break;
            case 3: gl.uniform3fv(location, new Float32Array(data.map(x => x.value))); break;
            case 4: gl.uniform4fv(location, new Float32Array(data.map(x => x.value))); break;
        }
    }

    /**
     * Set an uniform data that would be a integer.
     * @param gl The context.
     * @param location The uniform location.
     * @param size The amount of components.
     * @param data The uniform data.
     */
    private setUniformSignedIntegers(gl: WebGLRenderingContext, location: WebGLUniformLocation, size: number, data: TypedData[]) {
        switch(size) {
            case 1: gl.uniform1iv(location, new Int32Array(data.map(x => x.value))); break;
            case 2: gl.uniform2iv(location, new Int32Array(data.map(x => x.value))); break;
            case 3: gl.uniform3iv(location, new Int32Array(data.map(x => x.value))); break;
            case 4: gl.uniform4iv(location, new Int32Array(data.map(x => x.value))); break;
        }
    }

    /**
     * Set an uniform data that would be a matrix.
     * @param gl The context.
     * @param location The uniform location.
     * @param size The amount of components.
     * @param data The uniform data.
     */
    private setUniformMatrix(gl: WebGLRenderingContext, location: WebGLUniformLocation, size: number, data: TypedData[]) {
        switch(size) {
            case 2: gl.uniformMatrix2fv(location, false, new Float32Array(data.map(x => x.value))); break;
            case 3: gl.uniformMatrix3fv(location, false, new Float32Array(data.map(x => x.value))); break;
            case 4: gl.uniformMatrix4fv(location, false, new Float32Array(data.map(x => x.value))); break;
        }
    }

    /**
     * Use the material shader.
     * @param gl The context.
     */
    public use(gl: WebGLRenderingContext) {
        this._shader.use(gl);
        for(const key in this._uniforms) {
            if(this._uniforms[key].needUpdate) {
                
                this._uniforms[key].needUpdate = false;

                if(this._uniforms[key].location === undefined) {
                    const location = gl.getUniformLocation(this._shader.program!, key);
                    if(location !== null) {
                        this._uniforms[key].location = location;
                    } else {
                        console.warn(`Failed to set uniform data: the location ${location} not found!`);
                        // Remove the uniform from the dictionary
                        delete this._uniforms[key];
                        continue;
                    }
                }

                const { location, size, value, isMatrix } = this._uniforms[key];

                if(!isMatrix) {
                    switch(this._uniforms[key].type) {
                        case DataType.i8:
                        case DataType.i16:
                        case DataType.i32:
                            this.setUniformSignedIntegers(gl, location!, size, value);
                            break;

                        case DataType.u8:
                        case DataType.u16:
                        case DataType.u32:
                            console.warn(`Unsigned integer was not supported !`);
                            break;
                        
                        case DataType.f32:
                            this.setUniformFloats(gl, location!, size, value);
                            break;
                    }
                } else {
                    this.setUniformMatrix(gl, location!, size, value);
                }
            }
        }
    }

    /**
     * Set an uniform value.
     * @param name The name of the uniform value.
     * @param value The value.
     */
    public setUniform(name: string, value: TypedData): void;

    /**
     * Set an uniform matrix value.
     * @param name The name of the uniform matrix.
     * @param matrix The value.
     */
    public setUniform<M extends Matrix<Vector>>(name: string, matrix: M): void;

    /**
     * Set an uniform vector value.
     * @param name The name of the uniform vector.
     * @param vector The value.
     */
    public setUniform<V extends Vector>(name: string, vector: V): void;

    /**
     * Set an uniform vector or matrix value.
     * @param name The name of the uniform vector or matrix.
     * @param v The value.
     */
    public setUniform<T extends Vector | Matrix<Vector> | TypedData>(name: string, v: T) {
        if(this._uniforms[name]) {
            this._uniforms[name].value      = (v instanceof TypedData) ? [v] : (v as Vector | Matrix<Vector>).data;
            this._uniforms[name].needUpdate = true;
        } else {
            this._uniforms[name] = {
                size        : v instanceof Matrix ? v.width : v instanceof TypedData ? 1 : (v as Vector).data.length,
                value       : (v instanceof TypedData) ? [v] : (v as Vector | Matrix<Vector>).data,
                needUpdate  : true,
                location    : undefined,
                type        : v.type,
                isMatrix    : v instanceof Matrix,
            }
        }
    }
}