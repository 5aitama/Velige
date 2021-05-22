import { Indices } from "./Indices";
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

    /** The mesh shader */
    private _shader: Shader;

    /** How to draw the geometry from the indices. */
    private _drawMode: DrawMode = DrawMode.Triangle;

    /**
     * Create new instance of `Mesh`.
     * @param vertices The mesh vertices
     * @param indices The mesh indices
     * @param shader The mesh shader
     * @param renderMode How to draw the mesh geometry from the indices.
     */
    constructor(vertices: Vertex[], indices: Indices[], shader: Shader, renderMode = DrawMode.Triangle) {
        this._vertices = vertices;
        this._indices = indices;
        this._shader = shader;
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

    /** The mesh shader */
    get shader() {
        return this._shader;
    }

    /** The draw mode */
    get drawMode() {
        return this._drawMode;
    }

}