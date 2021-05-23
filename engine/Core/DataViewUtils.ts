import { DataType } from "./types";
import TypedData from "./TypedData";

/**
 * Set a `TypedData` into a `DataView`.
 * @param offset The data offset *(in bytes)*
 * @param data The data to set.
 * @param view The `DataView`.
 * @returns The new offset *(in bytes)* according to the data size.
 */
export function setTypedData(offset: number, data: TypedData, view: DataView) {
    switch(data.type) {
        case DataType.u8: 
            view.setUint8(offset, data.value); 
            break;
        case DataType.u16: 
            view.setUint16(offset, data.value, true); 
            break;
        case DataType.u32: 
            view.setUint32(offset, data.value, true); 
            break;

        case DataType.i8: 
            view.setInt8(offset, data.value); 
            break;
        case DataType.i16: 
            view.setInt16(offset, data.value, true); 
            break;
        case DataType.i32: 
            view.setInt32(offset, data.value, true);
            break;

        case DataType.f32: 
            view.setFloat32(offset, data.value, true); 
            break;
    }

    return data.size;
}