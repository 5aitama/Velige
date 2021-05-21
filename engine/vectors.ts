import ComponentBase from "./component_base";
import { DataType, sizeOfDataType } from "./types";

export class Vector2 extends ComponentBase {
    constructor(x: number, y: number, type: DataType) {
        super(type, [x, y]);
    }

    get x() { return this.data[0]; }
    get y() { return this.data[1]; }

    set x(value) { this.data[0] = value; }
    set y(value) { this.data[1] = value; }
}

export class Vector3 extends ComponentBase {
    constructor(x: number, y: number, z: number, type: DataType) {
        super(type, [x, y, z]);
    }

    get x() { return this.data[0]; }
    get y() { return this.data[1]; }
    get z() { return this.data[2]; }

    set x(value) { this.data[0] = value; }
    set y(value) { this.data[1] = value; }
    set z(value) { this.data[2] = value; }
}

export class Vector4 extends ComponentBase {
    constructor(x: number, y: number, z: number, w: number, type: DataType) {
        super(type, [x, y, z, w]);
    }

    get x() { return this.data[0]; }
    get y() { return this.data[1]; }
    get z() { return this.data[2]; }
    get w() { return this.data[3]; }

    set x(value) { this.data[0] = value; }
    set y(value) { this.data[1] = value; }
    set z(value) { this.data[2] = value; }
    set w(value) { this.data[3] = value; }
}