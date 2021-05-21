import { VertexBase } from "./VertexBase";
import { Vector2, Vector4 } from "./vectors";

export class Vertex2DColor extends VertexBase {
    constructor(vertex: Vector2, color: Vector4) {
        super([vertex, color]);
    }
}