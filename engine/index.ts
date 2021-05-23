
import SceneRenderer from "./Core/SceneRenderer.js";
import { Indices } from "./Graphics/Indices.js";
import { Mesh } from "./Graphics/Mesh.js";
import Shader from "./Graphics/Shader.js";
import { Vertex } from "./Graphics/Vertex.js";
import { Vector2, Vector3, Vector4 } from "./Math/Vector.js";
import { DataType } from "./Core/types.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new SceneRenderer(canvas);

async function setup() {
    const vertices = [
        new Vertex([
            new Vector2(-0.5, -0.5, DataType.f32), 
            new Vector4(1, 0, 0, 1, DataType.f32)
        ]),

        new Vertex([
            new Vector2(-0.5, 0.5, DataType.f32), 
            new Vector4(0, 1, 0, 1, DataType.f32)
        ]),

        new Vertex([
            new Vector2(0.5, 0.5, DataType.f32), 
            new Vector4(0, 0, 1, 1, DataType.f32)
        ]),

        new Vertex([
            new Vector2(0.5, -0.5, DataType.f32), 
            new Vector4(1, 1, 1, 1, DataType.f32)
        ]),
    ];

    const indices = [
        new Indices(new Vector3(0, 1, 2, DataType.u8)),
        new Indices(new Vector3(0, 2, 3, DataType.u8)),
    ]

    const shader = await Shader.loadFrom("shaders/simple.vert", "shaders/simple.frag");
    const mesh = new Mesh(vertices, indices, shader);
    renderer.addMesh(mesh);
}

function render() {
    renderer.render();
    requestAnimationFrame(render);
}

setup();
requestAnimationFrame(render);
