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
     * Compile and link the shader.
     * @param gl The context.
     */
    compile(gl: WebGLRenderingContext) {
        const vShader = this.loadShader(gl, gl.VERTEX_SHADER, this.vertexSource);
        const fShader = this.loadShader(gl, gl.FRAGMENT_SHADER, this.fragmentSource);

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
    loadShader(gl: WebGLRenderingContext, type: number , source: string)
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
     * Load shader from url.
     * @param vs The vertex shader file url.
     * @param fs The fragment shader file url.
     */
    static async LoadFrom(vs: URL | string, fs: URL | string) {
        const vSrc = fetch(vs instanceof URL ? vs.href : vs).then(res => res.text());
        const fSrc = fetch(fs instanceof URL ? fs.href : fs).then(res => res.text());

        const sources = await Promise.all([vSrc, fSrc]);

        return new Shader(sources[0], sources[1]);
    }
 }