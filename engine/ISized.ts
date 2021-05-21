export default interface ISized {
    readonly size: number;
}

/**
 * Get the size *(in byte)* of a `ISized` element.
 * @param single The element that we want to retrieve the size
 * @returns The size *(in byte)* of the element.
 */
export function sizeOfSingle<T extends ISized>(single: T) {
    return single.size;
}

/**
 * Get the size *(in byte)* of a `ISized` array.
 * @param single The array that we want to retrieve the size
 * @returns The size *(in byte)* of the array.
 */
export function sizeOfMany<T extends ISized>(many: T[]) {
    let size = 0;

    for(let i = 0; i < many.length; i++)
        size += sizeOfSingle(many[i]);
    
    return size;
}