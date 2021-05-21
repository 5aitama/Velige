
import Material from "./Material.js";
import Mesh2D from "./mesh.js";
import { Renderer } from "./Renderer.js";
import Shader from "./Shader.js";
import { DataType } from "./types.js";
import { Vector2, Vector3, Vector4 } from "./vectors.js";
import { Vertex2DColor } from "./Vertex";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new Renderer(canvas);

async function setup() {
    const vertices = [
        new Vertex2DColor(
            new Vector2(-0.5, -0.5, DataType.f32), 
            new Vector4(1, 0, 0, 1, DataType.f32)
        ),

        new Vertex2DColor(
            new Vector2(-0.5, 0.5, DataType.f32), 
            new Vector4(0, 1, 0, 1, DataType.f32)
        ),

        new Vertex2DColor(
            new Vector2(0.5, 0.5, DataType.f32), 
            new Vector4(0, 0, 1, 1, DataType.f32)
        ),

        new Vertex2DColor(
            new Vector2(0.5, -0.5, DataType.f32), 
            new Vector4(1, 1, 1, 1, DataType.f32)
        ),
    ];

    const indices = [ 
        new Vector3(0, 1, 2, DataType.u8),
        new Vector3(0, 2, 3, DataType.u8),
    ]

    const material = new Material(await Shader.LoadFrom("shaders/simple.vert", "shaders/simple.frag"));
    const mesh = new Mesh2D(vertices, false, indices, false, material);

    renderer.createMeshRendererFrom(mesh);
}

function render() {
    renderer.render();
    requestAnimationFrame(render);
}

setup();
requestAnimationFrame(render);
