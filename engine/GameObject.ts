import Material from "./Material";
import { MeshBase } from "./mesh";

export default class GameObject {
    /** The game object mesh */
    private _mesh: MeshBase;

    constructor(mesh: MeshBase) {
        this._mesh = mesh;
    }

    public get mesh() {
        return this._mesh;
    }
}