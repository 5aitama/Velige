
interface IMeshBuffer {
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