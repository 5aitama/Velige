
import SceneRenderer from "./Core/SceneRenderer.js";
import { Indices } from "./Graphics/Indices.js";
import { Mesh } from "./Graphics/Mesh.js";
import Shader from "./Graphics/Shader.js";
import { Vertex } from "./Graphics/Vertex.js";
import { Vector2, Vector3, Vector4 } from "./Math/Vector.js";
import { DataType } from "./Core/types.js";
import Material from "./Graphics/Material.js";
import { Matrix3x3, Matrix4x4 } from "./Math/Matrix.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new SceneRenderer(canvas);

let material: Material | null = null;

async function setup() {
    const vertices: Vertex[] = [];
    const indices: Indices[] = [];

    const radius = 100;
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
            new Vector4(1, y / radius, 1, 1, DataType.f32),  // The color.
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

function render(t = 0) {
    t = t / 1000;

    const projection = Matrix3x3.projection(renderer.width, renderer.height);

    const mpos = new Vector2(0, 0, DataType.f32);
    const mscl = new Vector2(1, 1, DataType.f32);
    const mrot = 0;
    const model = Matrix3x3.mul(Matrix3x3.mul(Matrix3x3.translation(mpos), Matrix3x3.rotation(mrot)), Matrix3x3.scaling(mscl));

    const vpos = new Vector2(-renderer.width / 2, -renderer.height / 2, DataType.f32);
    const vscl = new Vector2(1, 1, DataType.f32);
    const vrot = 0;
    const view = Matrix3x3.mul(Matrix3x3.mul(Matrix3x3.translation(vpos), Matrix3x3.rotation(vrot)), Matrix3x3.scaling(vscl));
    
    material?.setUniform("projection", projection);
    material?.setUniform("view", view);
    material?.setUniform("model", model);

    renderer.render();
    requestAnimationFrame(render);
}

setup().then(() => requestAnimationFrame(render));