import { Matrix3x3 } from "../Math/Matrix";
import { Vector2 } from "../Math/Vector";

export class Transform {

    /** The transform position */
    private _position: Vector2;
    /** The transfrom rotation (in radians) */
    private _rotation: number;
    /** The transform scale */
    private _scale: Vector2;
    /** The transform matrix */
    private _trs: Matrix3x3;

    /**
     * Create new instance of `Transform`.
     * @param position The position
     * @param rotation The rotation (in radians)
     * @param scale The scale
     */
    constructor(position: Vector2, rotation: number, scale: Vector2) {
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        this._trs = this.calculateModelMatrix();
    }

    /** The position. */
    public get position() {
        return this._position;
    }

    /** The rotation (in radians) */
    public get rotation() {
        return this._rotation;
    }

    /** The scale */
    public get scale() {
        return this._scale;
    }

    /** The transform matrix */
    public get TRS() {
        return this._trs;
    }

    /** @param p The new position */
    public set position(p) {
        this._position = p;
        this._trs = this.calculateModelMatrix();
    }

    /** @param r The new rotation (in radians) */
    public set rotation(r) {
        this._rotation = r;
        this._trs = this.calculateModelMatrix();
    }

    /** @param s The new scale */
    public set scale(s) {
        this._scale = s;
        this._trs = this.calculateModelMatrix();
    }

    /**
     * Calculate the model matrix from Translation, Rotation and Scale.
     * @returns The model matrix (TRS)
     */
    private calculateModelMatrix() {
        return Matrix3x3.mul(
            Matrix3x3.mul(
                Matrix3x3.translation(this.position), 
                Matrix3x3.rotation(this.rotation)
            ), 
            Matrix3x3.scaling(this.scale)
        );
    }

}