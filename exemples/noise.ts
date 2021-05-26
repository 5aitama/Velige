import SceneRenderer from "../engine/Core/SceneRenderer";
import TypedData from "../engine/Core/TypedData";
import { DataType } from "../engine/Core/types";
import { Indices } from "../engine/Graphics/Indices";
import Material from "../engine/Graphics/Material";
import { DrawMode, Mesh } from "../engine/Graphics/Mesh";
import Shader from "../engine/Graphics/Shader";
import { Vertex } from "../engine/Graphics/Vertex";
import { float2, ubyte3 } from "../engine/Math/Vector";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const renderer = new SceneRenderer(canvas);

let material : Material | undefined;
let current_pos = new float2(0, 0);
let current_zoom = 0;
let deltaTime = 0;
let lastTime = 0;

let key_l = false;
let key_r = false;
let key_u = false;
let key_d = false;
let key_zz = false;
let key_dz = false;

async function setup() {
    const shader = await Shader.loadFrom("shaders/noise.vert", "shaders/noise.frag");
    material = new Material(shader);

    const vertices = [
        new Vertex([ new float2(-1, -1), new float2(0, 0) ]),
        new Vertex([ new float2(-1,  1), new float2(0, 1) ]),
        new Vertex([ new float2( 1,  1), new float2(1, 1) ]),
        new Vertex([ new float2( 1, -1), new float2(1, 0) ]),
    ];

    const indices = [
        new Indices(new ubyte3(0, 1, 2)),
        new Indices(new ubyte3(0, 2, 3)),
    ];

    const mesh = new Mesh(vertices, indices, material, DrawMode.Triangle);
    renderer.addMesh(mesh);

    window.addEventListener("keydown", (e) => {
        if(e.key === 'a') key_l = true;
        if(e.key === 'd') key_r = true;
        if(e.key === 'w') key_u = true;
        if(e.key === 's') key_d = true;
        if(e.key === 'e') key_zz = true;
        if(e.key === 'q') key_dz = true;
    });

    window.addEventListener("keyup", (e) => {
        if(e.key === 'a') key_l = false;
        if(e.key === 'd') key_r = false;
        if(e.key === 'w') key_u = false;
        if(e.key === 's') key_d = false;
        if(e.key === 'e') key_zz = false;
        if(e.key === 'q') key_dz = false;
    });
}

function render(t = 0) {
    deltaTime = (t - lastTime) / 1000;
    lastTime = t;

    if(key_l) { current_pos.x -= 0.5 * deltaTime }
    if(key_r) { current_pos.x += 0.5 * deltaTime }
    if(key_u) { current_pos.y += 0.5 * deltaTime }
    if(key_d) { current_pos.y -= 0.5 * deltaTime }
    if(key_zz) { current_zoom += 1.5 * deltaTime }
    if(key_dz) { current_zoom -= 1.5 * deltaTime }
    
    // material?.setUniform("time", new TypedData(t / 800, DataType.f32));
    material?.setUniform("zoom", new TypedData(current_zoom, DataType.f32));
    material?.setUniform("position", current_pos);
    material?.setUniform("screen_size", new float2(renderer.size.x, renderer.size.y));
    
    renderer.render();
    requestAnimationFrame(render);
}

setup().then(() => requestAnimationFrame(render));