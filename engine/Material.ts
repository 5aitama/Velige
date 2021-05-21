import Shader from "./Shader";

export default class Material {
    private _shader: Shader;

    constructor(shader: Shader) {
        this._shader = shader;
    }

    public use(gl: WebGLRenderingContext) {
        if(!this._shader.isCompiled) this._shader.compile(gl)

        gl.useProgram(this._shader.program);
    }

    public get program() {
        return this._shader.program;
    }

    public get shader() {
        return this._shader;
    }
}