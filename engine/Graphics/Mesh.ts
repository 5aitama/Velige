import { Indices } from "./Indices";
import Shader from "./Shader";
import { Vertex } from "./Vertex";

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

    /**
     * Create new instance of `Mesh`.
     * @param vertices The mesh vertices
     * @param indices The mesh indices
     * @param shader The mesh shader
     */
    constructor(vertices: Vertex[], indices: Indices[], shader: Shader) {
        this._vertices = vertices;
        this._indices = indices;
        this._shader = shader;
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

}