import { Indices } from "./Indices";
import Material from "./Material";
import Shader from "./Shader";
import { Vertex } from "./Vertex";

export enum DrawMode {
    Triangle = WebGLRenderingContext['TRIANGLES'],
    TriangleFan = WebGLRenderingContext['TRIANGLE_FAN'],
    TriangleStrip = WebGLRenderingContext['TRIANGLE_STRIP'],

    Lines = WebGLRenderingContext['LINES'],
    LineStrip = WebGLRenderingContext['LINE_STRIP'],
    LineLoop = WebGLRenderingContext['LINE_LOOP'],
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

}