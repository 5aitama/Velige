import ComponentBase from "./component_base";
import ISized from "./ISized";

export class VertexBase implements ISized {
    private _components: ComponentBase[];
    private _size: number = 0;

    constructor(components: ComponentBase[] = []) {
        this._components = components;
        this.recalculateSize();
    }

    /**
     * The size of the vertex *(in byte)*
     */
    get size() {
        return this._size;
    }

    /**
     * The vertex components.
     */
    public get components() { 
        return this._components; 
    }
    
    public set components(value) {
        this.recalculateSize();
        this._components = value;
    }

    /**
     * Recalculate the size of the vertex.
     */
    private recalculateSize() {
        this._size = 0;

        for(let i = 0; i < this._components.length; i++)
           this._size += this._components[i].size;
    }

    /**
     * Create an array vertex attributes from a vertex.
     * @param vertex The vertex.
     * @returns An array of `VertexAttribute`
     */
    public static CreateVertexAttribs<T extends VertexBase>(vertex: T) {
        let offset = 0;
        const attributes: VertexAttribute[] = [];

        for(let i = 0; i < vertex.components.length; i++) {
            const attribute = new VertexAttribute(
                i, 
                vertex.components[i].data.length, 
                vertex.components[i].singleDataType, 
                false,
                vertex.size, 
                offset
            );

            offset += vertex.components[i].size;
            attributes.push(attribute);
        }

        console.log(attributes);

        return attributes;
    }
}

export class VertexAttribute {
    private _size: number;
    private _type: number;
    private _index: number;
    private _stride: number;
    private _offset: number;
    private _normalized: boolean;
    
    /**
     * Create new instance of `VertexAttribute` class.
     * @param index The index of the vertex attribute.
     * @param size The number of components per vertex attribute
     * @param type The data type of each components
     * @param normalized if the data must be normalized
     * @param stride specifying the offset in bytes between the beginning of consecutive vertex attributes. Cannot be larger than 255. If stride is 0, the attribute is assumed to be tightly packed, that is, the attributes are not interleaved but each attribute is in a separate block, and the next vertex' attribute follows immediately after the current vertex.
     * @param offset specifying an offset in bytes of the first component in the vertex attribute array. Must be a multiple of the byte length of type.
     */
    constructor(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        this._size = size;
        this._type = type;
        this._index = index;
        this._stride = stride;
        this._offset = offset;
        this._normalized = normalized;
    }

    get index() {
        return this._index;
    }

    get size() {
        return this._size;
    }

    get type() {
        return this._type;
    }

    get stride() {
        return this._stride;
    }

    get offset() {
        return this._offset;
    }

    get normalized() {
        return this._normalized;
    }

    public static setVertexAttributes(gl: WebGLRenderingContext, attributes: VertexAttribute[]) {
        for(let i = 0; i < attributes.length; i++) {
            gl.vertexAttribPointer(
                attributes[i].index, 
                attributes[i].size, 
                attributes[i].type, 
                attributes[i].normalized, 
                attributes[i].stride, 
                attributes[i].offset
            );
            
            gl.enableVertexAttribArray(attributes[i].index);
        }
    }
}