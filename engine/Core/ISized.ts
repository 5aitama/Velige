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
export function sizeOfSingle<T extends ISized>(single: T) {
    return single.size;
}

/**
 * Get the size *(in byte)* of an array of object that implement the `ISized` interface.
 * @param many The array of object we want to retrieve size.
 * @returns The size of the object array *(in bytes)*.
 */
export function sizeOfMany<T extends ISized>(many: T[]) {
    let size = 0;

    for(let i = 0; i < many.length; i++)
        size += sizeOfSingle(many[i]);
    
    return size;
}