
import SceneRenderer from "./Core/SceneRenderer.js";
import { Indices } from "./Graphics/Indices.js";
import { Mesh } from "./Graphics/Mesh.js";
import Shader from "./Graphics/Shader.js";
import { Vertex } from "./Graphics/Vertex.js";
import { Vector2, Vector3, Vector4 } from "./Math/Vector.js";
import { DataType } from "./Core/types.js";
import Material from "./Graphics/Material.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new SceneRenderer(canvas);

let material: Material | null = null;

async function setup() {
    const vertices: Vertex[] = [];
    const indices: Indices[] = [];

    const radius = 0.5;
    const resolution = 60;
    const steps = 360 / resolution;
    const deg2rad = Math.PI / 180;

    // Push the origin vertex of our circle.
    vertices.push(new Vertex([
        new Vector2(0, 0, DataType.f32),        // The position.
        new Vector4(1, 1, 1, 1, DataType.f32),  // The color.
    ]));
    
    for(let i = 0, j = 0; i <= 360; i += steps, j++) {
        const x = Math.sin(i * deg2rad) * radius;
        const y = Math.cos(i * deg2rad) * radius;

        vertices.push(new Vertex([
            new Vector2(x, y, DataType.f32),        // The position.
            new Vector4(x, y, 1, 1, DataType.f32),  // The color.
        ]));

        if(j === 0) continue;

        indices.push(
            new Indices(new Vector3(0, j - 1, j, DataType.u8))
        );
    }

    indices.push(
        new Indices(new Vector3(0, resolution, 1, DataType.u8))
    );

    const shader = await Shader.loadFrom("shaders/simple.vert", "shaders/simple.frag");
    material = new Material(shader);
    const mesh = new Mesh(vertices, indices, material);
    renderer.addMesh(mesh);

    window.onkeydown = (ev: KeyboardEvent) => {
        if(ev.key === 'r') {
            console.log("remove mesh");
            renderer.removeMesh(mesh);
        }

        if(ev.key === 'a') {
            console.log("add mesh");
            renderer.addMesh(mesh);
        }
    }
}

function render(time = 0) {
    let x = Math.sin(time / 1000.0) / 2.0;
    let y = Math.cos(time / 1000.0) / 2.0;

    material!.setUniform("position", new Vector2(x, y, DataType.f32));

    renderer.render();
    requestAnimationFrame(render);
}

setup();
requestAnimationFrame(render);
