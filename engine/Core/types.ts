export enum DataType {
    u8  = WebGLRenderingContext['UNSIGNED_BYTE'],
    u16 = WebGLRenderingContext['UNSIGNED_SHORT'],
    u32 = WebGLRenderingContext['UNSIGNED_INT'],

    i8  = WebGLRenderingContext['BYTE'],
    i16 = WebGLRenderingContext['SHORT'],
    i32 = WebGLRenderingContext['INT'],

    f32 = WebGLRenderingContext['FLOAT'],

    ArrayBuffer = WebGLRenderingContext['ARRAY_BUFFER'],
    ElementArrayBuffer = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'],
}

/**
 * Get the size *(in byte)* of a `DataType`
 * @param type The `DataType`
 */
export function sizeOfDataType(type: DataType) {
    switch(type) {
        case DataType.u8 : return Uint8Array.BYTES_PER_ELEMENT;
        case DataType.u16: return Uint16Array.BYTES_PER_ELEMENT;
        case DataType.u32: return Uint32Array.BYTES_PER_ELEMENT;

        case DataType.i8 : return Int8Array.BYTES_PER_ELEMENT;
        case DataType.i16: return Int16Array.BYTES_PER_ELEMENT;
        case DataType.i32: return Int32Array.BYTES_PER_ELEMENT;

        case DataType.f32: return Float32Array.BYTES_PER_ELEMENT;
    }
}

/**
 * Get the corresponding `DataType` from a size *(in byte)*
 * @param size The data size *(in byte)*
 * @returns The data type of the size.
 */
export function typeWithSize(size: number): DataType {
    switch(size) {
        case Uint8Array.BYTES_PER_ELEMENT: return DataType.u8;
        case Uint16Array.BYTES_PER_ELEMENT: return DataType.u16;
        case Uint32Array.BYTES_PER_ELEMENT: return DataType.u32;

        case Int8Array.BYTES_PER_ELEMENT: return DataType.i8;
        case Int16Array.BYTES_PER_ELEMENT: return DataType.i16;
        case Int32Array.BYTES_PER_ELEMENT: return DataType.i32;

        case Float32Array.BYTES_PER_ELEMENT: return DataType.f32;

        default: throw new Error(`There is no data type matched with size of ${size}byte(s)`);
    }
}