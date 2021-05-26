import { BufferUsage } from "../Graphics/Buffer";
import IndicesBuffer from "../Graphics/IndicesBuffer";
import { Mesh } from "../Graphics/Mesh";
import { VertexAttribute } from "../Graphics/Vertex";
import VertexBuffer from "../Graphics/VertexBuffer";
import { Vector2 } from "../Math/Vector";
import { DataType } from "./types";

/**
 * Data that we need to render a mesh.
 */
export interface IMeshRenderData {
    /** The vertex buffer */
    vertexBuffer: IMeshBuffer,

    /** The index buffer */
    indexBuffer: IMeshBuffer,

    /** The vertex attributes */
    vertexAttributes: VertexAttribute[],
}

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

    /** The render data of each meshes */
    private meshesRenderData: IMeshRenderData[] = [];

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

        const dpr = window.devicePixelRatio;
        const displayWidth  = Math.round(this._canvas.clientWidth * dpr);
        const displayHeight = Math.round(this._canvas.clientHeight * dpr);

        const needResize = this._canvas.width  != displayWidth || this._canvas.height != displayHeight;
 
        if (needResize) {
            this._canvas.width  = displayWidth;
            this._canvas.height = displayHeight;
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

        // Check if the mesh shader was compiled
        if(!mesh.material.shader.isCompiled) {
            mesh.material.shader.compileAndLink(this._gl);
        }

        // Create the index buffer from the mesh indices.
        const iBuffer = new IndicesBuffer(this._gl, mesh.indices, BufferUsage.Static);

        // Create the vertex buffer from the mesh vertices.
        const vBuffer = new VertexBuffer(this._gl, mesh.vertices, BufferUsage.Static);

        // Create the vertex attributes from the mesh vertices.
        const vAttribs = mesh.vertices[0].buildVertexAttributes();

        // Bind the vertex buffer and set the vertex attributes
        // on it!
        vBuffer.bindBuffer();

        for(let i = 0; i < vAttribs.length; i++) {
            vAttribs[i].enable(this._gl);
        }

        const meshRenderData: IMeshRenderData = {
            indexBuffer: iBuffer,
            vertexBuffer: vBuffer,
            vertexAttributes: vAttribs,
        }

        this.meshes.push(mesh);
        this.meshesRenderData.push(meshRenderData);
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

        // Safely delete the mesh buffers...
        this.meshesRenderData[index].vertexBuffer.deleteBuffer();
        this.meshesRenderData[index].indexBuffer.deleteBuffer();

        this.meshes.splice(index, 1);
        this.meshesRenderData.splice(index, 1);
    }

    render() {
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.clearColor(0.1, 0.1, 0.1, 1);

        for(let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].material.use(this._gl);
            this.meshesRenderData[i].indexBuffer.bindBuffer();
            this._gl.drawElements(
                this.meshes[i].drawMode, 
                this.meshes[i].indices.length * 3, 
                this.meshes[i].indices[0].indices.type, 
                0
            );
        }
    }

    /** The renderer canvas width */
    get width() {
        return this._canvas.width;
    }

    /** The renderer canvas height */
    get height() {
        return this._canvas.height;
    }

    /** The renderer canvas width and height */
    get size() {
        return new Vector2(this.width, this.height, DataType.u32);
    }
}