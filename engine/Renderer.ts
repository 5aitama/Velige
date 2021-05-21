import ComponentBase from "./component_base";
import { BufferTarget, BufferUsage, GPUBuffer } from "./GPUBuffer";
import Material from "./Material";
import { MeshBase } from "./mesh";
import { DataType } from "./types";
import { VertexAttribute, VertexBase } from "./VertexBase";

export class MeshRenderer {
    private _vBuffer: GPUBuffer;
    private _iBuffer: GPUBuffer;
    private _iBufferDataType: DataType;
    private _attributes: VertexAttribute[];
    private _material: Material | null;
    private _gl: WebGLRenderingContext;
    private _isVertexAttributesSet = false;

    constructor(gl: WebGLRenderingContext, material: Material | null, vertices: VertexBase[], indices: ComponentBase[], vertexBufferUsage: BufferUsage, indexBufferUsage: BufferUsage, indexBufferDataType: DataType) {
        this._gl = gl;
        this._material = material;
        this._iBufferDataType = indexBufferDataType;

        const vertexBuffer = GPUBuffer.createFromVertices(gl, vertexBufferUsage, vertices);

        if(!vertexBuffer)
            throw new Error("Failed to create the vertex buffer!");
        
        const indexBuffer = GPUBuffer.createFromComponents(gl, indexBufferUsage, BufferTarget.Element, indices);

        if(!indexBuffer)
            throw new Error("Failed to create the index buffer!");

        this._vBuffer = vertexBuffer;
        this._iBuffer = indexBuffer;

        this._vBuffer.bind();
        this._attributes = VertexBase.CreateVertexAttribs(vertices[0]);
        
    }

    get vertexBuffer() {
        return this._vBuffer;
    }

    get indexBuffer() {
        return this._iBuffer;
    }

    get vertexAttributes() {
        return this._attributes;
    }

    get gl() {
        return this._gl;
    }

    draw() {
        if(!this._material) return;

        this._material!.use(this.gl);

        if(!this._isVertexAttributesSet) {
            VertexAttribute.setVertexAttributes(this.gl, this._attributes);
            this._isVertexAttributesSet = true;
        }

        this.indexBuffer.bind();
        this.gl.drawElements(this.gl.TRIANGLES, this.indexBuffer.length * 3, this._iBufferDataType, 0);
    }

    destroy() {
        this._vBuffer.deleteBuffer();
        this._iBuffer.deleteBuffer();
    }
}

export class Renderer {
    
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _meshesRenderer: MeshRenderer[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._gl = canvas.getContext('webgl')!;
        
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    public get gl() {
        return this._gl;
    }

    public createMeshRendererFrom(mesh: MeshBase) : number {
        const meshRenderer = new MeshRenderer(
            this.gl, 
            mesh.material,
            mesh.vertices, 
            mesh.indices, 
            mesh.isVerticesDynamic ? BufferUsage.Dynamic : BufferUsage.Static,
            mesh.isIndicesDynamic ? BufferUsage.Dynamic : BufferUsage.Static,
            mesh.indices[0].singleDataType,
        );

        this._meshesRenderer.push(meshRenderer);
        return this._meshesRenderer.length - 1;
    }

    public removeMeshRenderer(index: number) {
        this._meshesRenderer.splice(index, 1)[0].destroy();
    }

    render() {
        this.gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clearColor(0.1, 0.1, 0.1, 1);

        for(let i = 0; i < this._meshesRenderer.length; i++) {
            this._meshesRenderer[i].draw();
        }
    }
}