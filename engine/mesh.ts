import { VertexBase } from "./VertexBase";
import { Vector3 } from "./vectors";
import Material from "./Material";

export class MeshBase {
    /** The mesh vertices */
    private _vertices: VertexBase[];

    /** The mesh indices */
    private _indices: Vector3[];

    /** Indicate if the vertices can be update frequently (`true`) otherwise (`false`) */
    private _is_vertices_dynamic: boolean;

    /** Indicate if the indices can be update frequently (`true`) otherwise (`false`) */
    private _is_indices_dymamic: boolean;

    /** The mesh material */
    private _material: Material | null = null;

    /**
     * Create new instance of `MeshBase` class.
     * @param vertices The mesh vertices
     * @param vDynamic Indicate if the vertices can be update frequently (`true`) otherwise (`false`)
     * @param indices The mesh indices
     * @param iDynamic Indicate if the indices can be update frequently (`true`) otherwise (`false`)
     */
    constructor(vertices: VertexBase[], vDynamic: boolean, indices: Vector3[], iDynamic: boolean, material?: Material) {
        this._vertices = vertices;
        this._indices = indices;
        this._is_vertices_dynamic = vDynamic;
        this._is_indices_dymamic = iDynamic;
        this.material = material ?? null;
    }

    get vertices() {
        return this._vertices;
    }

    set vertices(vertices) {
        this._vertices = vertices;
    }

    get indices() {
        return this._indices;
    }

    set indices(indices) {
        this._indices = indices;
    }

    get isVerticesDynamic() {
        return this._is_vertices_dynamic;
    }

    get isIndicesDynamic() {
        return this._is_indices_dymamic;
    }

    get material() {
        return this._material;
    }

    set material(material) {
        this._material = material;
    }
}

export default class Mesh2D extends MeshBase {

    constructor(vertices: VertexBase[], vDynamic: boolean, indices: Vector3[], iDynamic: boolean, material?: Material) {
        super(vertices, vDynamic, indices, iDynamic, material);
    }
}