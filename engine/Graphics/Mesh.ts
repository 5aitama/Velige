import { Indices } from "./Indices";
import { Material } from "./Material";
import { Shader } from "./Shader";
import { Vertex } from "./Vertex";

export enum DrawMode {
    Triangle = WebGLRenderingContext['TRIANGLES'],
    TriangleFan = WebGLRenderingContext['TRIANGLE_FAN'],
    TriangleStrip = WebGLRenderingContext['TRIANGLE_STRIP'],

    Lines = WebGLRenderingContext['LINES'],
    LineStrip = WebGLRenderingContext['LINE_STRIP'],
    LineLoop = WebGLRenderingContext['LINE_LOOP'],
}

export enum BufferUpdateMode {
    None = 0,
    All = 1, 
    Keep = 2,
};

export interface IBufferUpdateInfos {
    mode: BufferUpdateMode,
    offset: number,
    length: number,
}

/**
 * Represent a Mesh.
 */
export class Mesh {
    /** The mesh vertices */
    private _vertices: Vertex[];

    /** The mesh indices */
    private _indices: Indices[];

    /** The mesh material */
    private _material: Material;

    /** How to draw the geometry from the indices. */
    private _drawMode: DrawMode = DrawMode.Triangle;

    private _vertexBufferUpdateInfos: IBufferUpdateInfos[] = [];
    private _indexBufferUpdateInfos: IBufferUpdateInfos[] = [];

    /**
     * Create new instance of `Mesh`.
     * @param vertices The mesh vertices
     * @param indices The mesh indices
     * @param material The mesh material
     * @param renderMode How to draw the mesh geometry from the indices.
     */
    constructor(vertices: Vertex[], indices: Indices[], material: Material, renderMode = DrawMode.Triangle) {
        this._vertices = vertices;
        this._indices = indices;
        this._material = material;
        this._drawMode = renderMode;
    }

    /** The mesh vertices */
    get vertices() {
        return this._vertices;
    }

    /** The mesh indices */
    get indices() {
        return this._indices;
    }

    /** The mesh material */
    get material() {
        return this._material;
    }

    /** The draw mode */
    get drawMode() {
        return this._drawMode;
    }

    /** The vertex buffer update infos. */
    get vertexBufferUpdateInfos() {
        return this._vertexBufferUpdateInfos;
    }

    /** The index buffer update infos. */
    get indexBufferUpdateInfos() {
        return this._indexBufferUpdateInfos;
    }

    /** @param vertices The new vertices */
    set vertices(vertices) {
        this._vertices = vertices;
        this._vertexBufferUpdateInfos.push({
            mode: BufferUpdateMode.All,
            offset: 0,
            length: vertices.length,
        });
    }

    /** @param indices The new indices */
    set indices(indices) {
        this._indices = indices;
        this._indexBufferUpdateInfos.push({
            mode: BufferUpdateMode.All,
            offset: 0,
            length: indices.length,
        });
    }

    /**
     * Update the mesh vertices. *The new vertices must be have
     * the same type as the old vertices.*
     * @param vertices The new vertices.
     * @param offset Where we need to put the new vertices
     */
    updateVertices(vertices: Vertex[], offset: number = 0) {
        this._vertices.splice(offset, vertices.length, ...vertices);
        this._vertexBufferUpdateInfos.push({
            mode: BufferUpdateMode.Keep,
            offset: offset,
            length: vertices.length,
        });
    }

    /**
     * Update the mesh indices. *The new indices must be have
     * the same type as the old indices!*
     * @param indices The new indices.
     * @param offset Where we need to put the new indices
     */
    updateIndices(indices: Indices[], offset: number = 0) {
        this._indices.splice(offset, indices.length, ...indices);
        this._indexBufferUpdateInfos.push({
            mode: BufferUpdateMode.All,
            offset: offset,
            length: indices.length,
        });
    }
}