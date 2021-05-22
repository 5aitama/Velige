import { Indices } from "./Indices";
import Shader from "./Shader";
import { Vertex } from "./Vertex";

/**
 * Represent a Mesh.
 */
export class Mesh<V extends Vertex, I extends Indices, S extends Shader> {
    /** The mesh vertices */
    private _vertices: V[];

    /** The mesh indices */
    private _indices: I[];

    /** The mesh shader */
    private _shader: S;

    /**
     * Create new instance of `Mesh`.
     * @param vertices The mesh vertices
     * @param indices The mesh indices
     * @param shader The mesh shader
     */
    constructor(vertices: V[], indices: I[], shader: S) {
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