import { Mesh } from "../Graphics/Mesh";

/**
 * The scene renderer.
 */
export default class SceneRenderer {
    /** The canvas where we render things */
    private _canvas: HTMLCanvasElement;

    /** The context. */
    private _gl: WebGLRenderingContext;

    /** The meshes to be render */
    private meshes: Mesh[] = [];

    /**
     * Create new instance of `SceneRenderer`.
     * @param canvas The canvas where we want to render.
     */
    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        const gl = canvas.getContext('webgl');

        if(gl === null) {
            throw new Error("WebGL is not supported");
        }

        this._gl = gl;

        window.onresize = () => this.onResize();
        this.onResize();
    }

    /**
     * Called when we need to resize the
     * canvas and the viewport of the context.
     */
    onResize() {
        const w = this._canvas.clientWidth;
        const h = this._canvas.clientHeight;

        if(this._canvas.width !== w || this._canvas.height !== h) {
            this._canvas.width = w;
            this._canvas.height = h;

            this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        }
    }

    /**
     * Add a `Mesh` into the scene.
     * @param mesh The mesh to be added.
     */
    addMesh(mesh: Mesh) {
        // Verify if the mesh not already exist
        if(this.meshes.find((m) => m === mesh)) {
            console.warn("Can't add the mesh: The mesh already exist!");
            return;
        }

        this.meshes.push(mesh);
    }

    /**
     * Remove a `Mesh` from the scene.
     * @param mesh The mesh to remove
     */
    removeMesh(mesh: Mesh) {
        const index = this.meshes.findIndex((m) => mesh);
        if(index === -1) {
            console.warn("Can't remoe the mesh: The mesh not exist!");
            return;
        }

        this.meshes.splice(index, 1);
    }

    render() {

    }
}