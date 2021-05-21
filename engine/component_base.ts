import ISized from "./ISized";
import { DataType, sizeOfDataType, typeWithSize } from "./types";

export default class ComponentBase implements ISized {
    /** The component data type. */
    public type: DataType;

    /** 
     * The component size *(in byte)* 
     */
    public size: number;

    /** The component data */
    protected _data: number[];

    /**
     * Create new instance of `ComponentBase` class.
     * @param size The component size *(in byte)*
     */
    constructor(type: DataType, data: number[]) {
        this.type = type;
        this.size = sizeOfDataType(type)! * data.length;
        this._data = data;
    }

    /**
     * Get the size *(in byte)* of a single data in this component.
     */
    public get singleDataSize() {
        return this.size / this.data.length;
    }

    /**
     * Get the type of a single data in this component.
     */
    public get singleDataType() {
        return this.type;
    }

    public get data() {
        return this._data;
    }

    /**
     * Get the size *(in byte)* of a `ComponentBase`.
     * @param component The component.
     * @returns The size *(in byte)* of the `component`.
     */
    public static sizeOfComponentBase<T extends ComponentBase>(component: T) {
        return component.size;
    }

    /**
     * Get the size *(in byte)* of a `ComponentBase` array.
     * @param components The component array.
     * @returns The size *(in byte)* of the `components`.
     */
    public static sizeOfComponentBaseArray<T extends ComponentBase>(components: T[]) {
        let size = 0;

        for(let i = 0; i < components.length; i++)
            size += components[i].size;

        return size;
    }
}