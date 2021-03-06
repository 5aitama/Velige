import { BufferUsage } from "../Graphics/Buffer";
import IndicesBuffer from "../Graphics/IndicesBuffer";
import { BufferUpdateMode, Mesh } from "../Graphics/Mesh";
import { VertexAttribute } from "../Graphics/Vertex";
import VertexBuffer from "../Graphics/VertexBuffer";
import { float4, Vector2 } from "../Math/Vector";
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
export class SceneRenderer {
    /** The canvas where we render things */
    private _canvas: HTMLCanvasElement;

    /** The context. */
    private _gl: WebGLRenderingContext;

    /** The meshes to be render */
    private meshes: Mesh[] = [];

    /** The render data of each meshes */
    private meshesRenderData: IMeshRenderData[] = [];

    /** The render clear color */
    private _clearColor: float4 = new float4(0.1, 0.1, 0.1, 1);

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

    /** The render clear color */
    get clearColor() {
        return this._clearColor;
    }

    /** @param color The new render clear color */
    set clearColor(color) {
        this._clearColor = color;
    }

    /**
     * Called when we need to resize the
     * canvas and the viewport of the context.
     */
    onResize() {

        const dpr = window.devicePixelRatio;
        const w = Math.round(this._canvas.clientWidth * dpr);
        const h = Math.round(this._canvas.clientHeight * dpr);

        const needResize = this._canvas.width  != w || this._canvas.height != h;
 
        if (needResize) {
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

        // Check if the mesh shader was compiled
        if(!mesh.material.shader.isCompiled) {
            mesh.material.shader.compileAndLink(this._gl);
        }

        // Create the index buffer from the mesh indices.
        const iBuffer = new IndicesBuffer(this._gl, mesh.indices, BufferUsage.Static);

        // Create the vertex buffer from the mesh vertices.
        const vBuffer = new VertexBuffer(this._gl, mesh.vertices, BufferUsage.Dynamic);

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

    /**
     * Check if we need to reallocate the mesh buffers.
     * @param meshIndex The index of the mesh that we want to check.
     */
    private checkMeshBuffers(meshIndex: number) {
        for(let i = 0; i < this.meshes[meshIndex].vertexBufferUpdateInfos.length; i++) {
            switch(this.meshes[meshIndex].vertexBufferUpdateInfos[i].mode) {
                case BufferUpdateMode.None: continue;
                case BufferUpdateMode.All:
                    this.meshesRenderData[meshIndex].vertexBuffer.updateBufferData();
                    break;
                case BufferUpdateMode.Keep:
                    const offset = this.meshes[meshIndex].vertexBufferUpdateInfos[i].offset;
                    const length = this.meshes[meshIndex].vertexBufferUpdateInfos[i].length;

                    this.meshesRenderData[meshIndex].vertexBuffer.updateBufferData(offset, length);
                    break;
            }
        }

        for(let i = 0; i < this.meshes[meshIndex].indexBufferUpdateInfos.length; i++) {
            switch(this.meshes[meshIndex].indexBufferUpdateInfos[i].mode) {
                case BufferUpdateMode.None: continue;
                case BufferUpdateMode.All:
                    this.meshesRenderData[meshIndex].indexBuffer.updateBufferData();
                    break;
                case BufferUpdateMode.Keep:
                    const offset = this.meshes[meshIndex].indexBufferUpdateInfos[i].offset;
                    const length = this.meshes[meshIndex].indexBufferUpdateInfos[i].length;

                    this.meshesRenderData[meshIndex].indexBuffer.updateBufferData(offset, length);
                    break;
            }
        }

    }

    render() {
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);

        this._gl.clearColor(
            this._clearColor.x, 
            this._clearColor.y, 
            this._clearColor.z, 
            this._clearColor.w
        );

        for(let i = 0; i < this.meshes.length; i++) {
            this.checkMeshBuffers(i);
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