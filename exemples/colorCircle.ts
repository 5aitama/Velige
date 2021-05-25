
import SceneRenderer from "../engine/Core/SceneRenderer.js";
import { Indices } from "../engine/Graphics/Indices.js";
import { Mesh } from "../engine/Graphics/Mesh.js";
import Shader from "../engine/Graphics/Shader.js";
import { Vertex } from "../engine/Graphics/Vertex.js";
import { float2, float4, ubyte3 } from "../engine/Math/Vector.js";
import Material from "../engine/Graphics/Material.js";
import { Matrix3x3 } from "../engine/Math/Matrix.js";
import Transform from "../engine/Core/Transform.js";
import World, { Entity, TestComponentA, TestComponentB } from "../engine/ECS/World.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new SceneRenderer(canvas);

let material: Material | null = null;

async function setup() {
    /** The circle mesh vertices. */
    const vertices: Vertex[] = [];
    
    /** The circle mesh indices. */
    const indices: Indices[] = [];

    /** The circle radius. */
    const radius     = 1;

    /** The circle resolution. */
    const resolution = 40;

    /** The angle offset between two vertex. */
    const steps      = 360 / resolution;

    /** Constant to convert degrees to radians. */
    const deg2rad    = Math.PI / 180;

    /** The different vertex color of the circle. */
    const colors = [
        new float4(1, 0, 0, 1), // Red
        new float4(0, 1, 0, 1), // Green
        new float4(0, 0, 1, 1), // Blue
    ];

    // Push the origin vertex of our circle.
    vertices.push(new Vertex([
        new float2(0, 0),        // The position.
        new float4(1, 1, 1, 1),  // The color.
    ]));
    
    for(let i = 0, j = 0; i <= 360; i += steps, j++) {

        const x = Math.sin(i * deg2rad) * radius;
        const y = Math.cos(i * deg2rad) * radius;

        vertices.push(new Vertex([
            new float2(x, y), // The position.
            colors[Math.floor(j / 13) % colors.length], // The color.
        ]));

        if(j === 0) continue;

        indices.push(new Indices(new ubyte3(0, j - 1, j)));
    }

    indices.push(new Indices(new ubyte3(0, resolution, 1)));

    const shader = await Shader.loadFrom("shaders/simple.vert", "shaders/simple.frag");
    material = new Material(shader);
    
    const mesh = new Mesh(vertices, indices, material);
    renderer.addMesh(mesh);

    window.onkeydown = (ev: KeyboardEvent) => {
        if(ev.key === 'r') renderer.removeMesh(mesh);
        if(ev.key === 'a') renderer.addMesh(mesh);
    }

    const world = new World(2);
    const entityA = world.createEntity();
    const entityB = world.createEntity();

    world.addComponent(entityB, new TestComponentB());
    world.addComponent(entityA, new TestComponentA());

    // console.log(world.entityWithAll([TestComponentA, TestComponentB]));
}

function render(t = 0) {
    // The circle rotation angle (in radians)
    const angle = t / 250;

    const size = renderer.size;
    
    // The camera projection matrix.
    const projection = Matrix3x3.projection(size.x, size.y);

    const sphereTransform = new Transform(new float2(0, 0), angle, new float2(50, 50));
    const cameraTransform = new Transform(new float2(-size.x / 2, -size.y / 2), 0, new float2(1, 1));
    
    // Send the uniform data to the circle shader.
    material?.setUniform("projection", projection);
    material?.setUniform("view", cameraTransform.TRS);
    material?.setUniform("model", sphereTransform.TRS);

    // Render the current frame.
    renderer.render();

    requestAnimationFrame(render);
}

setup().then(() => requestAnimationFrame(render));