/**
 * The shader type.
 */
export enum ShaderType {
    /** A vertex shader */
    Vert = WebGLRenderingContext['VERTEX_SHADER'],

    /** A fragment shader */
    Frag = WebGLRenderingContext['FRAGMENT_SHADER'],
}

/**
 * A Shader.
 */
 export default class Shader 
 {
    /** Vertex shader source code. */
    vertexSource: string;

    /** Fragment shader source code. */
    fragmentSource: string;

    /** The shader program. */
    program: WebGLProgram | null = null;

    /** Indicate if the shader was compiled */
    isCompiled: boolean = false;

    /**
     * Create new Shader.
     * @param vertexSource Vertex shader source code.
     * @param fragmentSource Fragment shader source code.
     */
    constructor(vertexSource: string, fragmentSource: string) {
        this.vertexSource   = vertexSource;
        this.fragmentSource = fragmentSource;
    }

    /**
     * Compile and link vertex and fragment shader.
     * @param gl The context.
     */
    compileAndLink(gl: WebGLRenderingContext) {
        const vShader = this.compile(gl, ShaderType.Vert, this.vertexSource);
        const fShader = this.compile(gl, ShaderType.Frag, this.fragmentSource);

        const program = gl.createProgram();

        if(program == null)
            throw new Error('Failed to create program.');
        
        // Attach & link shaders to the program...
        gl.attachShader(program, vShader)
        gl.attachShader(program, fShader)
        gl.linkProgram(program)

        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            gl.deleteProgram(program);
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
            throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        }
        
        this.isCompiled = true;
        this.program = program;
    }

    /**
     * Compile a shader from source code.
     * @param gl The context.
     * @param type The shader type.
     * @param source The shader source code.
     * @returns The shader compiled.
     */
    compile(gl: WebGLRenderingContext, type: ShaderType , source: string)
    {
        // Create shader
        const shader = gl.createShader(type)

        if(!shader) throw new Error('Failed to create shader');
        
        // Send source to the shader
        gl.shaderSource(shader, source)

        // Compile the shader
        gl.compileShader(shader)

        // Check if shader is not compiled successfully
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            gl.deleteShader(shader)
            throw new Error('An error occurred when compiling the shaders: ' + gl.getShaderInfoLog(shader))
        }

        return shader
    }

    /**
     * Load shader from an url or path.
     * @param vs The vertex shader file url or path.
     * @param fs The fragment shader file url or path.
     */
    static async loadFrom(vs: URL | string, fs: URL | string) {
        const vSrc = fetch(vs instanceof URL ? vs.href : vs).then(res => res.text());
        const fSrc = fetch(fs instanceof URL ? fs.href : fs).then(res => res.text());

        const sources = await Promise.all([vSrc, fSrc]);

        return new Shader(sources[0], sources[1]);
    }

    /**
     * Use the current shader.
     * @param gl The context.
     */
    use(gl: WebGLRenderingContext) {
        gl.useProgram(this);
    }
 }