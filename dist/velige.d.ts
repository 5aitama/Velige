declare module "Core/ISized" {
    /**
     * Simple interface designed to know
     * the size *(in bytes)* of all classes
     * that implement it.
     */
    export default interface ISized {
        /** The object size *(in bytes) */
        readonly size: number;
    }
    /**
     * Get the size *(in byte)* of an object that implement the `ISized` interface.
     * @param single The object we want to retrieve size.
     * @returns The size of the object *(in bytes)*.
     */
    export function sizeOfSingle<T extends ISized>(single: T): number;
    /**
     * Get the size *(in byte)* of an array of object that implement the `ISized` interface.
     * @param many The array of object we want to retrieve size.
     * @returns The size of the object array *(in bytes)*.
     */
    export function sizeOfMany<T extends ISized>(many: T[]): number;
}
declare module "Core/types" {
    export enum DataType {
        u8,
        u16,
        u32,
        i8,
        i16,
        i32,
        f32,
        ArrayBuffer,
        ElementArrayBuffer
    }
    /**
     * Get the size *(in byte)* of a `DataType`
     * @param type The `DataType`
     */
    export function sizeOfDataType(type: DataType): number | undefined;
    /**
     * Get the corresponding `DataType` from a size *(in byte)*
     * @param size The data size *(in byte)*
     * @returns The data type of the size.
     */
    export function typeWithSize(size: number): DataType;
}
declare module "Core/TypedData" {
    import { DataType } from "Core/types";
    /**
     * Represent a typed data. I don't know if it
     * is good to do that but it's very usefull
     * especially to do GPU things.
     */
    export default class TypedData {
        /** The `TypedData` value. */
        private _value;
        /** The `TypedData` type. */
        private _type;
        /** The `TypedData` size *(in bytes)* */
        private _size;
        /**
         * Create new instance of `TypedData`.
         * @param value The value.
         * @param type The type
         * @param size The size *(in bytes)*
         */
        constructor(value: number, type: DataType);
        /** The `TypedData` value. */
        get value(): number;
        /** The `TypedData` type. */
        get type(): DataType;
        /** The `TypedData` size *(in bytes)* */
        get size(): number;
        /**
         * The `TypedData` value.
         * @param value The new `TypedData` value.
         */
        set value(value: number);
    }
}
declare module "Math/Vector" {
    import ISized from "Core/ISized";
    import TypedData from "Core/TypedData";
    import { DataType } from "Core/types";
    /**
     * The base class of all `Vector` classes.
     * All `Vector` classes need to extends this
     * class.
     */
    export class Vector implements ISized {
        /** The vector data. */
        private _data;
        /** The size of the current `Vector` *(in bytes)* */
        private _size;
        /** The data type in this `Vector`. */
        private _type;
        /**
         * Create new instance of `Vector` class.
         * @param data The vector data.
         */
        constructor(data: TypedData[]);
        /** Recalculate the size *(in bytes)* of the current `Vector`. */
        private recalculateSize;
        /** The vector data. */
        get data(): TypedData[];
        /** The vector size *(in bytes)* */
        get size(): number;
        /** The type of each element in this `Vector`. */
        get type(): DataType;
        /** @param data The new vector data. */
        set data(data: TypedData[]);
        /**
         * Replace a data element by a new `TypedData`.
         * @param index The index of the data element to be replaced.
         * @param newData The new data element.
         */
        protected setDataItem(index: number, newData: TypedData): void;
        /**
         * Update the value of a data element.
         * @param index The index of the data element to be updated.
         * @param value The new data element value.
         */
        protected updateDataItem(index: number, value: number): void;
        /**
         * Perform a dot product between two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a • b.
         */
        static dot<T extends Vector>(a: T, b: T): TypedData;
        /**
         * Perform an addition of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a + b.
         */
        static add<T extends Vector>(a: T, b: T): T;
        /**
         * Perform a substraction of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a - b.
         */
        static sub<T extends Vector>(a: T, b: T): T;
        /**
         * Perform a multiplication of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a * b.
         */
        static mul<T extends Vector>(a: T, b: T): T;
        /**
         * Perform a division of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a / b.
         */
        static div<T extends Vector>(a: T, b: T): T;
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
        constructor(x: number | TypedData[], y?: number, type?: DataType);
        /** The `x` component of the vector */
        get x(): number;
        /** The `y` component of the vector */
        get y(): number;
        /**
         * @param x The new `x` component value.
         */
        set x(x: number);
        /**
         * @param y The new `y` component value.
         */
        set y(y: number);
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
        constructor(x: number | TypedData[], y?: number, z?: number, type?: DataType);
        /** The `x` component of the vector */
        get x(): number;
        /** The `y` component of the vector */
        get y(): number;
        /** The `z` component of the vector */
        get z(): number;
        /**
         * @param x The new `x` component value.
         */
        set x(x: number);
        /**
         * @param y The new `y` component value.
         */
        set y(y: number);
        /**
         * @param z The new `z` component value.
         */
        set z(z: number);
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
        constructor(x: number | TypedData[], y?: number, z?: number, w?: number, type?: DataType);
        /** The `x` component of the vector */
        get x(): number;
        /** The `y` component of the vector */
        get y(): number;
        /** The `z` component of the vector */
        get z(): number;
        /** The `w` component of the vector */
        get w(): number;
        /**
         * @param x The new `x` component value.
         */
        set x(x: number);
        /**
         * @param y The new `y` component value.
         */
        set y(y: number);
        /**
         * @param z The new `z` component value.
         */
        set z(z: number);
        /**
         * @param w The new `w` component value.
         */
        set w(w: number);
    }
    /**
     * Represent a vector with two `f32` component.
     */
    export class float2 extends Vector2 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `u8` component.
     */
    export class ubyte2 extends Vector2 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `u16` component.
     */
    export class ushort2 extends Vector2 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `u32` component.
     */
    export class uint2 extends Vector2 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `i8` component.
     */
    export class byte2 extends Vector2 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `i16` component.
     */
    export class short2 extends Vector2 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with two `i32` component.
     */
    export class int2 extends Vector2 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x: number, y: number);
    }
    /**
     * Represent a vector with three `f32` component.
     */
    export class float3 extends Vector3 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `u8` component.
     */
    export class ubyte3 extends Vector3 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `u16` component.
     */
    export class ushort3 extends Vector3 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `u32` component.
     */
    export class uint3 extends Vector3 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `i8` component.
     */
    export class byte3 extends Vector3 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `i16` component.
     */
    export class short3 extends Vector3 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with three `i32` component.
     */
    export class int3 extends Vector3 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x: number, y: number, z: number);
    }
    /**
     * Represent a vector with four `f32` component.
     */
    export class float4 extends Vector4 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `u8` component.
     */
    export class ubyte4 extends Vector4 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `u16` component.
     */
    export class ushort4 extends Vector4 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `u32` component.
     */
    export class uint4 extends Vector4 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `i8` component.
     */
    export class byte4 extends Vector4 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `i16` component.
     */
    export class short4 extends Vector4 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
    /**
     * Represent a vector with four `i32` component.
     */
    export class int4 extends Vector4 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x: number, y: number, z: number, w: number);
    }
}
declare module "Math/Matrix" {
    import ISized from "Core/ISized";
    import TypedData from "Core/TypedData";
    import { DataType } from "Core/types";
    import { Vector, Vector2, Vector3, Vector4 } from "Math/Vector";
    /**
     * The base class of all `Matrix` classes.
     * All `Matrix` classes need to extends this
     * class.
     */
    export class Matrix<V extends Vector> implements ISized {
        /** The matrix data */
        private _data;
        /** The matrix size *(in bytes)* */
        private _size;
        /** The matrix data type */
        private _type;
        /** The matrix width */
        private _width;
        /** The matrix height */
        private _height;
        constructor(data: TypedData[], width: number, height: number);
        /** Recalculate the size *(in bytes)* of the current `Matrix`. */
        private recalculateSize;
        /** The matrix data. */
        get data(): TypedData[];
        /** The matrix size *(in bytes)* */
        get size(): number;
        /** The type of each element in this `Matrix`. */
        get type(): DataType;
        /** The matrix with */
        get width(): number;
        /** The matrix height */
        get height(): number;
        /** @param data The new matrix data. */
        set data(data: TypedData[]);
        /**
         * Replace a data element by a new `TypedData`.
         * @param index The index of the data element to be replaced.
         * @param newData The new data element.
         */
        protected setDataItem(index: number, newData: TypedData): void;
        /**
         * Update the value of a data element.
         * @param index The index of the data element to be updated.
         * @param value The new data element value.
         */
        protected updateDataItem(index: number, value: number): void;
        /**
         * Multiply two `Matrix`.
         * @param a Left hand side matrix.
         * @param b Right hand side matrix.
         */
        static mul<T extends Matrix<Vector>>(a: T, b: T): T;
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
        constructor(data: number[], type: DataType);
        /**
         * Create a identity matrix.
         * @param type The type of each matrix data.
         * @returns A 4x4 identity matrix.
         */
        static identity(type: DataType): Matrix4x4;
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
        constructor(data: number[], type: DataType);
        /**
         * Create a identity matrix.
         * @param type The type of each matrix data.
         * @returns A 3x3 identity matrix.
         */
        static identity(type: DataType): Matrix3x3;
        /**
         * Create a `Matrix3x3` that store a rotation.
         * @param angle The angle (in radians)
         * @returns The rotation matrix.
         */
        static rotation(angle: number): Matrix3x3;
        /**
         * Create a `Matrix3x3` that store a translation.
         * @param t The translation.
         * @returns The translation matrix.
         */
        static translation(t: Vector2): Matrix3x3;
        /**
         * Create a `Matrix3x3` that store a scale.
         * @param s The scale.
         * @returns The scale matrix.
         */
        static scaling(s: Vector2): Matrix3x3;
        /**
         * Create a `Matrix3x3` that store a projection.
         * @param width The screen width
         * @param height The screen height
         * @returns The projection matrix.
         */
        static projection(width: number, height: number): Matrix3x3;
    }
}
declare module "Graphics/Buffer" {
    import { DataType } from "Core/types";
    /**
     * GPU buffer target.
     */
    export enum BufferTarget {
        Array,
        Element
    }
    /**
     * GPU buffer usage.
     */
    export enum BufferUsage {
        Static,
        Dynamic
    }
    /**
     * This class is a abstraction of `WebGLBuffer` and
     * allow us to easly manage a `WebGLBuffer`.
     */
    export default class Buffer {
        /** The raw `WebGLBuffer`. */
        private _rawBuffer;
        /** The current buffer target */
        private _target;
        /** The current buffer usage */
        private _usage;
        /** The current buffer size *(in bytes)* */
        private _size;
        /** Indicate if the buffer was created */
        private _isCreated;
        /**
         * Create new instance of `Buffer`.
         * @param target The buffer target.
         * @param usage The buffer usage.
         */
        constructor(target: BufferTarget, usage: BufferUsage);
        /** The current buffer size *(in bytes)* */
        get size(): number;
        /** The current buffer target */
        get target(): BufferTarget;
        /** The current buffer usage */
        get usage(): BufferUsage;
        /** Indicate if the buffer was created */
        get isCreated(): boolean;
        /**
         * Delete the buffer properly.
         * @param gl The context.
         */
        deleteBuffer(gl: WebGLRenderingContext): void;
        /**
         * Initialize the buffer with some data. if the buffer is
         * already initialized, this function destroy
         * the old buffer and create new one.
         * @param gl The context.
         * @param data The buffer data.
         */
        initBuffer(gl: WebGLRenderingContext, data: BufferSource): void;
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
         * Update the buffer data.
         * @param gl The context.
         * @param offset The position *(in bytes)* in the buffer where to start to update data.
         * @param data The new data.
         */
        updateBufferData(gl: WebGLRenderingContext, offset: number, data: BufferSource): void;
        /**
         * Bind the buffer.
         * @param gl The context.
         * @param target The buffer target.
         */
        bindBuffer(gl: WebGLRenderingContext, target: BufferTarget): void;
    }
}
declare module "Graphics/IMeshBuffer" {
    export interface IMeshBuffer {
        /**
         * Update the buffer data. **This function
         * update the entire buffer so be carefull
         * when you call this.**
         */
        updateBufferData(): void;
        /**
         * Updates a part of the buffer according to
         * the data that was modified.
         * @param index The index of the data that was modified.
         */
        updateBufferData(index: number, length: number): void;
        /**
         * Updates several parts of the buffer according
         * to the data array that have been modified.
         * @param data The array of index of the data that was modified.
         */
        updateBufferData(data: number[], lengths: number[]): void;
        /**
         * Put all data together into a single array.
         * It keep the vertex order.
         * @returns An array that contains all data packed.
         */
        inlineData(): void;
        /**
         * Simply bind the buffer.
         */
        bindBuffer(): void;
        /**
         * Safely delete the buffer.
         */
        deleteBuffer(): void;
    }
}
declare module "Graphics/Indices" {
    import ISized from "Core/ISized";
    import { Vector3 } from "Math/Vector";
    /**
     * A triangle indices representation.
     */
    export class Indices implements ISized {
        /** The triangle indices. */
        private _indices;
        /** The triangle indices size *(in bytes)* */
        private _size;
        constructor(indices: Vector3);
        /**
         * The size of the triangle indices *(in byte)*
         */
        get size(): number;
        /**
         * The indices.
         */
        get indices(): Vector3;
        /**
         * @param value The new indices.
         */
        set indices(value: Vector3);
        /**
         * Recalculate the size of the current `Indices`.
         */
        private recalculateSize;
    }
}
declare module "Core/DataViewUtils" {
    import TypedData from "Core/TypedData";
    /**
     * Set a `TypedData` into a `DataView`.
     * @param offset The data offset *(in bytes)*
     * @param data The data to set.
     * @param view The `DataView`.
     * @returns The new offset *(in bytes)* according to the data size.
     */
    export function setTypedData(offset: number, data: TypedData, view: DataView): number;
}
declare module "Graphics/IndicesBuffer" {
    import { Indices } from "Graphics/Indices";
    import { BufferUsage } from "Graphics/Buffer";
    import { IMeshBuffer } from "Graphics/IMeshBuffer";
    /**
     * Class that help us to transform
     * a `Indices` to a `Buffer`.
     */
    export default class IndicesBuffer<T extends Indices> implements IMeshBuffer {
        /** The indices. */
        private _indices;
        /** The context. */
        private _gl;
        /** The buffer. */
        private _buffer;
        constructor(gl: WebGLRenderingContext, indices: T[], usage: BufferUsage);
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
         * to the indices that have been modified.
         * @param indices The index of the indices that was modified.
         */
        updateBufferData(indices: number[], lengths: number[]): void;
        /**
         * Put all vertex data together into a single array.
         * It keep the vertex order.
         * @returns An array that contains all vertex data.
         */
        inlineData(): ArrayBuffer;
        /**
         * Simply bind the buffer.
         */
        bindBuffer(): void;
        /**
         * Safely delete the buffer.
         */
        deleteBuffer(): void;
    }
}
declare module "Graphics/Shader" {
    /**
     * The shader type.
     */
    export enum ShaderType {
        /** A vertex shader */
        Vert,
        /** A fragment shader */
        Frag
    }
    /**
     * A Shader.
     */
    export default class Shader {
        /** Vertex shader source code. */
        vertexSource: string;
        /** Fragment shader source code. */
        fragmentSource: string;
        /** The shader program. */
        program: WebGLProgram | null;
        /** Indicate if the shader was compiled */
        isCompiled: boolean;
        /**
         * Create new Shader.
         * @param vertexSource Vertex shader source code.
         * @param fragmentSource Fragment shader source code.
         */
        constructor(vertexSource: string, fragmentSource: string);
        /**
         * Compile and link vertex and fragment shader.
         * @param gl The context.
         */
        compileAndLink(gl: WebGLRenderingContext): void;
        /**
         * Compile a shader from source code.
         * @param gl The context.
         * @param type The shader type.
         * @param source The shader source code.
         * @returns The shader compiled.
         */
        compile(gl: WebGLRenderingContext, type: ShaderType, source: string): WebGLShader;
        /**
         * Load shader from an url or path.
         * @param vs The vertex shader file url or path.
         * @param fs The fragment shader file url or path.
         */
        static loadFrom(vs: URL | string, fs: URL | string): Promise<Shader>;
        /**
         * Use the current shader.
         * @param gl The context.
         */
        use(gl: WebGLRenderingContext): void;
    }
}
declare module "Graphics/Material" {
    import TypedData from "Core/TypedData";
    import { DataType } from "Core/types";
    import { Matrix } from "Math/Matrix";
    import { Vector } from "Math/Vector";
    import Shader from "Graphics/Shader";
    /**
     * Represent a shader uniform data.
     */
    export interface IUniformData {
        /** Indicate if the uniform need to be update */
        needUpdate: boolean;
        /** The uniform value */
        value: TypedData[];
        /** The amount of components per value data. */
        size: number;
        /** The uniform location */
        location: WebGLUniformLocation | undefined;
        /** The type of each uniform data value(s) */
        type: DataType;
        /** Indicate if the data is a matrix data. */
        isMatrix: boolean;
    }
    export default class Material {
        /** The material shader. */
        private _shader;
        /** The shader uniforms data */
        private _uniforms;
        /**
         * Create new instance of `Material`.
         * @param shader The shader.
         */
        constructor(shader: Shader);
        /** The shader. */
        get shader(): Shader;
        /** The material uniforms data. */
        get uniforms(): {
            [name: string]: IUniformData;
        };
        /**
         * Set an uniform data that would be a float.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        private setUniformFloats;
        /**
         * Set an uniform data that would be a integer.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        private setUniformSignedIntegers;
        /**
         * Set an uniform data that would be a matrix.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        private setUniformMatrix;
        /**
         * Use the material shader.
         * @param gl The context.
         */
        use(gl: WebGLRenderingContext): void;
        /**
         * Set an uniform value.
         * @param name The name of the uniform value.
         * @param value The value.
         */
        setUniform(name: string, value: TypedData): void;
        /**
         * Set an uniform matrix value.
         * @param name The name of the uniform matrix.
         * @param matrix The value.
         */
        setUniform<M extends Matrix<Vector>>(name: string, matrix: M): void;
        /**
         * Set an uniform vector value.
         * @param name The name of the uniform vector.
         * @param vector The value.
         */
        setUniform<V extends Vector>(name: string, vector: V): void;
    }
}
declare module "Graphics/Vertex" {
    import ISized from "Core/ISized";
    import { Vector } from "Math/Vector";
    import { DataType } from "Core/types";
    /**
     * Little wrapper of WebGL `VertexAttribute`. It contain
     * the same data as a regular `VertexAttribute`. Is just
     * an "Objectify" version of the WebGL `VertexAttribute`.
     */
    export class VertexAttribute {
        /** The number of components per vertex attribute */
        private _size;
        /** The data type of each components */
        private _type;
        /** The index of the vertex attribute. */
        private _index;
        /**
         * The offset in bytes between the beginning of consecutive
         * vertex attributes. Cannot be larger than 255. If stride
         * is 0, the attribute is assumed to be tightly packed, that
         * is, the attributes are not interleaved but each attribute
         * is in a separate block, and the next vertex' attribute
         * follows immediately after the current vertex.
         */
        private _stride;
        /**
         * The offset in bytes of the first component in the vertex
         * attribute array. Must be a multiple of the byte length of
         * type.
         */
        private _offset;
        /** Indicate if the data must be normalized */
        private _normalized;
        /**
         * Create new instance of `VertexAttribute` class.
         * @param index The index of the vertex attribute.
         * @param size The number of components per vertex attribute
         * @param type The data type of each components
         * @param normalized If the data must be normalized
         * @param stride Specifying the offset in bytes between the beginning of consecutive vertex attributes. Cannot be larger than 255. If stride is 0, the attribute is assumed to be tightly packed, that is, the attributes are not interleaved but each attribute is in a separate block, and the next vertex' attribute follows immediately after the current vertex.
         * @param offset The offset in bytes of the first component in the vertex attribute array. Must be a multiple of the byte length of type.
         */
        constructor(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number);
        /** The index of the vertex attribute. */
        get index(): number;
        /** The number of components per vertex attribute */
        get size(): number;
        /** The data type of each components */
        get type(): DataType;
        /**
         * The offset in bytes between the beginning of consecutive
         * vertex attributes. Cannot be larger than 255. If stride
         * is 0, the attribute is assumed to be tightly packed, that
         * is, the attributes are not interleaved but each attribute
         * is in a separate block, and the next vertex' attribute
         * follows immediately after the current vertex.
         */
        get stride(): number;
        /**
         * The offset in bytes of the first component in the vertex
         * attribute array. Must be a multiple of the byte length of
         * type.
         */
        get offset(): number;
        /** Indicate if the data must be normalized */
        get normalized(): boolean;
        /**
         * Enable the current vertex attributes.
         */
        enable(gl: WebGLRenderingContext): void;
    }
    /**
     * A vertex representation.
     */
    export class Vertex implements ISized {
        /** The vertex vectors (or vertex data). */
        private _vectors;
        /** The vertex size *(in bytes)* */
        private _size;
        constructor(vectors: Vector[]);
        /**
         * The size of the vertex *(in byte)*
         */
        get size(): number;
        /**
         * The vector array.
         */
        get vectors(): Vector[];
        /**
         * @param value The new vector array.
         */
        set vectors(value: Vector[]);
        /**
         * Recalculate the size of the current `Vertex`.
         */
        private recalculateSize;
        /**
         * Build an array of `VertexAttribute` from the current `Vertex`.
         * @returns The vertex attributes.
         */
        buildVertexAttributes(): VertexAttribute[];
    }
}
declare module "Graphics/Mesh" {
    import { Indices } from "Graphics/Indices";
    import Material from "Graphics/Material";
    import { Vertex } from "Graphics/Vertex";
    export enum DrawMode {
        Triangle,
        TriangleFan,
        TriangleStrip,
        Lines,
        LineStrip,
        LineLoop
    }
    export enum BufferUpdateMode {
        None = 0,
        All = 1,
        Keep = 2
    }
    export interface IBufferUpdateInfos {
        mode: BufferUpdateMode;
        offset: number;
        length: number;
    }
    /**
     * Represent a Mesh.
     */
    export class Mesh {
        /** The mesh vertices */
        private _vertices;
        /** The mesh indices */
        private _indices;
        /** The mesh material */
        private _material;
        /** How to draw the geometry from the indices. */
        private _drawMode;
        private _vertexBufferUpdateInfos;
        private _indexBufferUpdateInfos;
        /**
         * Create new instance of `Mesh`.
         * @param vertices The mesh vertices
         * @param indices The mesh indices
         * @param material The mesh material
         * @param renderMode How to draw the mesh geometry from the indices.
         */
        constructor(vertices: Vertex[], indices: Indices[], material: Material, renderMode?: DrawMode);
        /** The mesh vertices */
        get vertices(): Vertex[];
        /** The mesh indices */
        get indices(): Indices[];
        /** The mesh material */
        get material(): Material;
        /** The draw mode */
        get drawMode(): DrawMode;
        /** The vertex buffer update infos. */
        get vertexBufferUpdateInfos(): IBufferUpdateInfos[];
        /** The index buffer update infos. */
        get indexBufferUpdateInfos(): IBufferUpdateInfos[];
        /** @param vertices The new vertices */
        set vertices(vertices: Vertex[]);
        /** @param indices The new indices */
        set indices(indices: Indices[]);
        /**
         * Update the mesh vertices. *The new vertices must be have
         * the same type as the old vertices.*
         * @param vertices The new vertices.
         * @param offset Where we need to put the new vertices
         */
        updateVertices(vertices: Vertex[], offset?: number): void;
        /**
         * Update the mesh indices. *The new indices must be have
         * the same type as the old indices!*
         * @param indices The new indices.
         * @param offset Where we need to put the new indices
         */
        updateIndices(indices: Indices[], offset?: number): void;
    }
}
declare module "Graphics/VertexBuffer" {
    import { BufferUsage } from "Graphics/Buffer";
    import { Vertex } from "Graphics/Vertex";
    import { IMeshBuffer } from "Graphics/IMeshBuffer";
    /**
     * Class that help us to transform
     * a `Vertex` to a `Buffer`.
     */
    export default class VertexBuffer<T extends Vertex> implements IMeshBuffer {
        /** The vertices. */
        private _vertices;
        /** The context. */
        private _gl;
        /** The buffer. */
        private _buffer;
        constructor(gl: WebGLRenderingContext, vertices: T[], usage: BufferUsage);
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
         * Put all vertex data together into a single array.
         * It keep the vertex order.
         * @returns An array that contains all vertex data.
         */
        inlineData(): ArrayBuffer;
        /**
         * Simply bind the buffer.
         */
        bindBuffer(): void;
        /**
         * Safely delete the buffer.
         */
        deleteBuffer(): void;
    }
}
declare module "Core/SceneRenderer" {
    import { IMeshBuffer } from "Graphics/IMeshBuffer";
    import { Mesh } from "Graphics/Mesh";
    import { VertexAttribute } from "Graphics/Vertex";
    import { Vector2 } from "Math/Vector";
    /**
     * Data that we need to render a mesh.
     */
    export interface IMeshRenderData {
        /** The vertex buffer */
        vertexBuffer: IMeshBuffer;
        /** The index buffer */
        indexBuffer: IMeshBuffer;
        /** The vertex attributes */
        vertexAttributes: VertexAttribute[];
    }
    /**
     * The scene renderer.
     */
    export default class SceneRenderer {
        /** The canvas where we render things */
        private _canvas;
        /** The context. */
        private _gl;
        /** The meshes to be render */
        private meshes;
        /** The render data of each meshes */
        private meshesRenderData;
        /**
         * Create new instance of `SceneRenderer`.
         * @param canvas The canvas where we want to render.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Called when we need to resize the
         * canvas and the viewport of the context.
         */
        onResize(): void;
        /**
         * Add a `Mesh` into the scene.
         * @param mesh The mesh to be added.
         */
        addMesh(mesh: Mesh): void;
        /**
         * Remove a `Mesh` from the scene.
         * @param mesh The mesh to remove
         */
        removeMesh(mesh: Mesh): void;
        /**
         * Check if we need to reallocate the mesh buffers.
         * @param meshIndex The index of the mesh that we want to check.
         */
        private checkMeshBuffers;
        render(): void;
        /** The renderer canvas width */
        get width(): number;
        /** The renderer canvas height */
        get height(): number;
        /** The renderer canvas width and height */
        get size(): Vector2;
    }
}
declare module "Core/Transform" {
    import { Matrix3x3 } from "Math/Matrix";
    import { Vector2 } from "Math/Vector";
    export default class Transform {
        /** The transform position */
        private _position;
        /** The transfrom rotation (in radians) */
        private _rotation;
        /** The transform scale */
        private _scale;
        /** The transform matrix */
        private _trs;
        /**
         * Create new instance of `Transform`.
         * @param position The position
         * @param rotation The rotation (in radians)
         * @param scale The scale
         */
        constructor(position: Vector2, rotation: number, scale: Vector2);
        /** The position. */
        get position(): Vector2;
        /** The rotation (in radians) */
        get rotation(): number;
        /** The scale */
        get scale(): Vector2;
        /** The transform matrix */
        get TRS(): Matrix3x3;
        /** @param p The new position */
        set position(p: Vector2);
        /** @param r The new rotation (in radians) */
        set rotation(r: number);
        /** @param s The new scale */
        set scale(s: Vector2);
        /**
         * Calculate the model matrix from Translation, Rotation and Scale.
         * @returns The model matrix (TRS)
         */
        private calculateModelMatrix;
    }
}
declare module "index" {
    export * from "Math/Vector";
    export * from "Math/Matrix";
    export * from "Graphics/Buffer";
    export * from "Graphics/IMeshBuffer";
    export * from "Graphics/Indices";
    export * from "Graphics/IndicesBuffer";
    export * from "Graphics/Material";
    export * from "Graphics/Mesh";
    export * from "Graphics/Shader";
    export * from "Graphics/Vertex";
    export * from "Graphics/VertexBuffer";
    export * from "Core/DataViewUtils";
    export * from "Core/ISized";
    export * from "Core/SceneRenderer";
    export * from "Core/Transform";
    export * from "Core/TypedData";
    export * from "Core/types";
}
declare module "ECS/World" {
    /**
     * Represent an entity.
     */
    export type Entity = number;
    export class Component {
    }
    export class TestComponentA extends Component {
    }
    export class TestComponentB extends Component {
    }
    export default class World {
        /** The list of all available entities. */
        private _available_entities;
        /** The list of all living entities. */
        private _living_entities;
        /** All entities components. */
        private _components;
        /**
         * Create new instance of `World`.
         * @param max_entities The maximum amount of entities in the world.
         */
        constructor(max_entities: number);
        /**
         * Create new `Entity`.
         * @returns The new entity
         */
        createEntity(): Entity;
        /**
         * Destroy an `Entity`
         * @param entity The entity to destroy
         * @returns
         */
        destroyEntity(entity: Entity): void;
        /**
         * Add a component to an `Entity`.
         * @param entity The entity.
         * @param component The component to add,
         */
        addComponent<C extends Component>(entity: Entity, component: C): void;
        /**
         * Remove a component on `Entity`.
         * @param entity The entity.
         * @param component The component type to remove.
         */
        removeComponent<C extends Component>(entity: Entity, component: new () => C): void;
        /**
         * Search all entities that have a specific component(s).
         * @param components The component(s) to find
         * @returns All entities that have the given component(s).
         */
        entityWithAll<C extends Component>(components: (new () => C)[]): void;
    }
}
declare module "../exemples/colorCircle" { }
declare module "../exemples/noise" { }
//# sourceMappingURL=velige.d.ts.map