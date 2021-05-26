var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("Core/ISized", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sizeOfMany = exports.sizeOfSingle = void 0;
    /**
     * Get the size *(in byte)* of an object that implement the `ISized` interface.
     * @param single The object we want to retrieve size.
     * @returns The size of the object *(in bytes)*.
     */
    function sizeOfSingle(single) {
        return single.size;
    }
    exports.sizeOfSingle = sizeOfSingle;
    /**
     * Get the size *(in byte)* of an array of object that implement the `ISized` interface.
     * @param many The array of object we want to retrieve size.
     * @returns The size of the object array *(in bytes)*.
     */
    function sizeOfMany(many) {
        let size = 0;
        for (let i = 0; i < many.length; i++)
            size += sizeOfSingle(many[i]);
        return size;
    }
    exports.sizeOfMany = sizeOfMany;
});
define("Core/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.typeWithSize = exports.sizeOfDataType = exports.DataType = void 0;
    var DataType;
    (function (DataType) {
        DataType[DataType["u8"] = WebGLRenderingContext['UNSIGNED_BYTE']] = "u8";
        DataType[DataType["u16"] = WebGLRenderingContext['UNSIGNED_SHORT']] = "u16";
        DataType[DataType["u32"] = WebGLRenderingContext['UNSIGNED_INT']] = "u32";
        DataType[DataType["i8"] = WebGLRenderingContext['BYTE']] = "i8";
        DataType[DataType["i16"] = WebGLRenderingContext['SHORT']] = "i16";
        DataType[DataType["i32"] = WebGLRenderingContext['INT']] = "i32";
        DataType[DataType["f32"] = WebGLRenderingContext['FLOAT']] = "f32";
        DataType[DataType["ArrayBuffer"] = WebGLRenderingContext['ARRAY_BUFFER']] = "ArrayBuffer";
        DataType[DataType["ElementArrayBuffer"] = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER']] = "ElementArrayBuffer";
    })(DataType = exports.DataType || (exports.DataType = {}));
    /**
     * Get the size *(in byte)* of a `DataType`
     * @param type The `DataType`
     */
    function sizeOfDataType(type) {
        switch (type) {
            case DataType.u8: return Uint8Array.BYTES_PER_ELEMENT;
            case DataType.u16: return Uint16Array.BYTES_PER_ELEMENT;
            case DataType.u32: return Uint32Array.BYTES_PER_ELEMENT;
            case DataType.i8: return Int8Array.BYTES_PER_ELEMENT;
            case DataType.i16: return Int16Array.BYTES_PER_ELEMENT;
            case DataType.i32: return Int32Array.BYTES_PER_ELEMENT;
            case DataType.f32: return Float32Array.BYTES_PER_ELEMENT;
        }
    }
    exports.sizeOfDataType = sizeOfDataType;
    /**
     * Get the corresponding `DataType` from a size *(in byte)*
     * @param size The data size *(in byte)*
     * @returns The data type of the size.
     */
    function typeWithSize(size) {
        switch (size) {
            case Uint8Array.BYTES_PER_ELEMENT: return DataType.u8;
            case Uint16Array.BYTES_PER_ELEMENT: return DataType.u16;
            case Uint32Array.BYTES_PER_ELEMENT: return DataType.u32;
            case Int8Array.BYTES_PER_ELEMENT: return DataType.i8;
            case Int16Array.BYTES_PER_ELEMENT: return DataType.i16;
            case Int32Array.BYTES_PER_ELEMENT: return DataType.i32;
            case Float32Array.BYTES_PER_ELEMENT: return DataType.f32;
            default: throw new Error(`There is no data type matched with size of ${size}byte(s)`);
        }
    }
    exports.typeWithSize = typeWithSize;
});
define("Core/TypedData", ["require", "exports", "Core/types"], function (require, exports, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represent a typed data. I don't know if it
     * is good to do that but it's very usefull
     * especially to do GPU things.
     */
    class TypedData {
        /**
         * Create new instance of `TypedData`.
         * @param value The value.
         * @param type The type
         * @param size The size *(in bytes)*
         */
        constructor(value, type) {
            this._value = value;
            this._type = type;
            this._size = types_1.sizeOfDataType(type);
        }
        /** The `TypedData` value. */
        get value() {
            return this._value;
        }
        /** The `TypedData` type. */
        get type() {
            return this._type;
        }
        /** The `TypedData` size *(in bytes)* */
        get size() {
            return this._size;
        }
        /**
         * The `TypedData` value.
         * @param value The new `TypedData` value.
         */
        set value(value) {
            this._value = value;
        }
    }
    exports.default = TypedData;
});
define("Math/Vector", ["require", "exports", "Core/TypedData", "Core/types"], function (require, exports, TypedData_1, types_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.int4 = exports.short4 = exports.byte4 = exports.uint4 = exports.ushort4 = exports.ubyte4 = exports.float4 = exports.int3 = exports.short3 = exports.byte3 = exports.uint3 = exports.ushort3 = exports.ubyte3 = exports.float3 = exports.int2 = exports.short2 = exports.byte2 = exports.uint2 = exports.ushort2 = exports.ubyte2 = exports.float2 = exports.Vector4 = exports.Vector3 = exports.Vector2 = exports.Vector = void 0;
    TypedData_1 = __importDefault(TypedData_1);
    /**
     * The base class of all `Vector` classes.
     * All `Vector` classes need to extends this
     * class.
     */
    class Vector {
        /**
         * Create new instance of `Vector` class.
         * @param data The vector data.
         */
        constructor(data) {
            /** The size of the current `Vector` *(in bytes)* */
            this._size = 0;
            /** The data type in this `Vector`. */
            this._type = 0;
            this._data = data;
            this.recalculateSize();
        }
        /** Recalculate the size *(in bytes)* of the current `Vector`. */
        recalculateSize() {
            let size = 0;
            let dataType = null;
            for (let i = 0; i < this._data.length; i++) {
                size += this._data[i].size;
                if (dataType === null)
                    dataType = this._data[i].type;
                else if (this._data[i].type !== dataType)
                    throw new Error("Vector error: The vector data must be the same the same data type");
            }
            this._size = size;
            this._type = dataType;
        }
        /** The vector data. */
        get data() {
            return this._data;
        }
        /** The vector size *(in bytes)* */
        get size() {
            return this._size;
        }
        /** The type of each element in this `Vector`. */
        get type() {
            return this._type;
        }
        /** @param data The new vector data. */
        set data(data) {
            this._data = data;
        }
        /**
         * Replace a data element by a new `TypedData`.
         * @param index The index of the data element to be replaced.
         * @param newData The new data element.
         */
        setDataItem(index, newData) {
            this._data[index] = newData;
            // We recalculate the size because
            // the `newData` type may not be the
            // same as the old `TypedData`.
            this.recalculateSize();
        }
        /**
         * Update the value of a data element.
         * @param index The index of the data element to be updated.
         * @param value The new data element value.
         */
        updateDataItem(index, value) {
            this._data[index].value = value;
        }
        /**
         * Perform a dot product between two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a • b.
         */
        static dot(a, b) {
            let result = new TypedData_1.default(0, a.type);
            for (let i = 0; i < a.data.length; i++) {
                result.value += a.data[i].value * b.data[i].value;
            }
            return result;
        }
        /**
         * Perform an addition of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a + b.
         */
        static add(a, b) {
            const data = new Array(a.data.length);
            for (let i = 0; i < a.data.length; i++) {
                data[i] = new TypedData_1.default(a.data[i].value + b.data[i].value, a.data[i].type);
            }
            return new Vector(data);
        }
        /**
         * Perform a substraction of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a - b.
         */
        static sub(a, b) {
            const data = new Array(a.data.length);
            for (let i = 0; i < a.data.length; i++) {
                data[i] = new TypedData_1.default(a.data[i].value - b.data[i].value, a.data[i].type);
            }
            return new Vector(data);
        }
        /**
         * Perform a multiplication of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a * b.
         */
        static mul(a, b) {
            const data = new Array(a.data.length);
            for (let i = 0; i < a.data.length; i++) {
                data[i] = new TypedData_1.default(a.data[i].value * b.data[i].value, a.data[i].type);
            }
            return new Vector(data);
        }
        /**
         * Perform a division of two vector.
         * @param a The right hand side vector.
         * @param b The left hand size vector.
         * @returns The result of a / b.
         */
        static div(a, b) {
            const data = new Array(a.data.length);
            for (let i = 0; i < a.data.length; i++) {
                data[i] = new TypedData_1.default(a.data[i].value / b.data[i].value, a.data[i].type);
            }
            return new Vector(data);
        }
    }
    exports.Vector = Vector;
    /**
     * A two dimensional vector representation.
     */
    class Vector2 extends Vector {
        /**
         * Create new instance of `Vector2` class.
         * @param x The `x` component value of the vector.
         * @param y The `y` component value of the vector.
         * @param type The type of each components value of the vector.
         */
        constructor(x, y, type) {
            if (Array.isArray(x)) {
                super(x);
            }
            else {
                if (y === undefined || type === undefined) {
                    throw new Error("You need to provide the Y value and the type!");
                }
                super([
                    new TypedData_1.default(x, type),
                    new TypedData_1.default(y, type),
                ]);
            }
        }
        /** The `x` component of the vector */
        get x() { return this.data[0].value; }
        /** The `y` component of the vector */
        get y() { return this.data[1].value; }
        /**
         * @param x The new `x` component value.
         */
        set x(x) { this.updateDataItem(0, x); }
        /**
         * @param y The new `y` component value.
         */
        set y(y) { this.updateDataItem(1, y); }
    }
    exports.Vector2 = Vector2;
    /**
     * A three dimensional vector representation.
     */
    class Vector3 extends Vector {
        /**
         * Create new instance of `Vector2` class.
         * @param x The `x` component value of the vector.
         * @param y The `y` component value of the vector.
         * @param z The `z` component value of the vector.
         * @param type The type of each components value of the vector.
         */
        constructor(x, y, z, type) {
            if (Array.isArray(x)) {
                super(x);
            }
            else {
                if (y === undefined || z === undefined || type === undefined) {
                    throw new Error("You need to provide the Y value, Z value and the type!");
                }
                super([
                    new TypedData_1.default(x, type),
                    new TypedData_1.default(y, type),
                    new TypedData_1.default(z, type),
                ]);
            }
        }
        /** The `x` component of the vector */
        get x() { return this.data[0].value; }
        /** The `y` component of the vector */
        get y() { return this.data[1].value; }
        /** The `z` component of the vector */
        get z() { return this.data[2].value; }
        /**
         * @param x The new `x` component value.
         */
        set x(x) { this.updateDataItem(0, x); }
        /**
         * @param y The new `y` component value.
         */
        set y(y) { this.updateDataItem(1, y); }
        /**
         * @param z The new `z` component value.
         */
        set z(z) { this.updateDataItem(2, z); }
    }
    exports.Vector3 = Vector3;
    /**
     * A four dimensional vector representation.
     */
    class Vector4 extends Vector {
        /**
         * Create new instance of `Vector2` class.
         * @param x The `x` component value of the vector.
         * @param y The `y` component value of the vector.
         * @param z The `z` component value of the vector.
         * @param w The `w` component value of the vector.
         * @param type The type of each components value of the vector.
         */
        constructor(x, y, z, w, type) {
            if (Array.isArray(x)) {
                super(x);
            }
            else {
                if (y === undefined || z === undefined || w === undefined || type === undefined) {
                    throw new Error("You need to provide the Y value, Z value, W value and the type!");
                }
                super([
                    new TypedData_1.default(x, type),
                    new TypedData_1.default(y, type),
                    new TypedData_1.default(z, type),
                    new TypedData_1.default(w, type),
                ]);
            }
        }
        /** The `x` component of the vector */
        get x() { return this.data[0].value; }
        /** The `y` component of the vector */
        get y() { return this.data[1].value; }
        /** The `z` component of the vector */
        get z() { return this.data[2].value; }
        /** The `w` component of the vector */
        get w() { return this.data[3].value; }
        /**
         * @param x The new `x` component value.
         */
        set x(x) { this.updateDataItem(0, x); }
        /**
         * @param y The new `y` component value.
         */
        set y(y) { this.updateDataItem(1, y); }
        /**
         * @param z The new `z` component value.
         */
        set z(z) { this.updateDataItem(2, z); }
        /**
         * @param w The new `w` component value.
         */
        set w(w) { this.updateDataItem(3, w); }
    }
    exports.Vector4 = Vector4;
    /**
     * Represent a vector with two `f32` component.
     */
    class float2 extends Vector2 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.f32);
        }
    }
    exports.float2 = float2;
    /**
     * Represent a vector with two `u8` component.
     */
    class ubyte2 extends Vector2 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.u8);
        }
    }
    exports.ubyte2 = ubyte2;
    /**
     * Represent a vector with two `u16` component.
     */
    class ushort2 extends Vector2 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.u16);
        }
    }
    exports.ushort2 = ushort2;
    /**
     * Represent a vector with two `u32` component.
     */
    class uint2 extends Vector2 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.u32);
        }
    }
    exports.uint2 = uint2;
    /**
     * Represent a vector with two `i8` component.
     */
    class byte2 extends Vector2 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.i8);
        }
    }
    exports.byte2 = byte2;
    /**
     * Represent a vector with two `i16` component.
     */
    class short2 extends Vector2 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.i16);
        }
    }
    exports.short2 = short2;
    /**
     * Represent a vector with two `i32` component.
     */
    class int2 extends Vector2 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         */
        constructor(x, y) {
            super(x, y, types_2.DataType.i32);
        }
    }
    exports.int2 = int2;
    /**
     * Represent a vector with three `f32` component.
     */
    class float3 extends Vector3 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.f32);
        }
    }
    exports.float3 = float3;
    /**
     * Represent a vector with three `u8` component.
     */
    class ubyte3 extends Vector3 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.u8);
        }
    }
    exports.ubyte3 = ubyte3;
    /**
     * Represent a vector with three `u16` component.
     */
    class ushort3 extends Vector3 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.u16);
        }
    }
    exports.ushort3 = ushort3;
    /**
     * Represent a vector with three `u32` component.
     */
    class uint3 extends Vector3 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.u32);
        }
    }
    exports.uint3 = uint3;
    /**
     * Represent a vector with three `i8` component.
     */
    class byte3 extends Vector3 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.i8);
        }
    }
    exports.byte3 = byte3;
    /**
     * Represent a vector with three `i16` component.
     */
    class short3 extends Vector3 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.i16);
        }
    }
    exports.short3 = short3;
    /**
     * Represent a vector with three `i32` component.
     */
    class int3 extends Vector3 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
        */
        constructor(x, y, z) {
            super(x, y, z, types_2.DataType.i32);
        }
    }
    exports.int3 = int3;
    /**
     * Represent a vector with four `f32` component.
     */
    class float4 extends Vector4 {
        /**
         * Create new instance of `float2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.f32);
        }
    }
    exports.float4 = float4;
    /**
     * Represent a vector with four `u8` component.
     */
    class ubyte4 extends Vector4 {
        /**
         * Create new instance of `ubyte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.u8);
        }
    }
    exports.ubyte4 = ubyte4;
    /**
     * Represent a vector with four `u16` component.
     */
    class ushort4 extends Vector4 {
        /**
         * Create new instance of `ushort2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.u16);
        }
    }
    exports.ushort4 = ushort4;
    /**
     * Represent a vector with four `u32` component.
     */
    class uint4 extends Vector4 {
        /**
         * Create new instance of `uint2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.u32);
        }
    }
    exports.uint4 = uint4;
    /**
     * Represent a vector with four `i8` component.
     */
    class byte4 extends Vector4 {
        /**
         * Create new instance of `byte2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.i8);
        }
    }
    exports.byte4 = byte4;
    /**
     * Represent a vector with four `i16` component.
     */
    class short4 extends Vector4 {
        /**
         * Create new instance of `short2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.i16);
        }
    }
    exports.short4 = short4;
    /**
     * Represent a vector with four `i32` component.
     */
    class int4 extends Vector4 {
        /**
         * Create new instance of `int2`.
         * @param x The x value.
         * @param y The y value.
         * @param z The z value.
         * @param w The w value.
        */
        constructor(x, y, z, w) {
            super(x, y, z, w, types_2.DataType.i32);
        }
    }
    exports.int4 = int4;
});
define("Math/Matrix", ["require", "exports", "Core/TypedData", "Core/types", "Math/Vector"], function (require, exports, TypedData_2, types_3, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Matrix3x3 = exports.Matrix4x4 = exports.Matrix = void 0;
    TypedData_2 = __importDefault(TypedData_2);
    /**
     * The base class of all `Matrix` classes.
     * All `Matrix` classes need to extends this
     * class.
     */
    class Matrix {
        constructor(data, width, height) {
            /** The matrix size *(in bytes)* */
            this._size = 0;
            /** The matrix data type */
            this._type = 0;
            this._data = data;
            this._width = width;
            this._height = height;
            this.recalculateSize();
        }
        /** Recalculate the size *(in bytes)* of the current `Matrix`. */
        recalculateSize() {
            let size = 0;
            let dataType = null;
            for (let i = 0; i < this._data.length; i++) {
                size += this._data[i].size;
                if (dataType === null)
                    dataType = this._data[i].type;
                else if (this._data[i].type !== dataType)
                    throw new Error("Vector error: The vector data must be the same the same data type");
            }
            this._size = size;
            this._type = dataType;
        }
        /** The matrix data. */
        get data() {
            return this._data;
        }
        /** The matrix size *(in bytes)* */
        get size() {
            return this._size;
        }
        /** The type of each element in this `Matrix`. */
        get type() {
            return this._type;
        }
        /** The matrix with */
        get width() {
            return this._width;
        }
        /** The matrix height */
        get height() {
            return this._height;
        }
        /** @param data The new matrix data. */
        set data(data) {
            this._data = data;
        }
        /**
         * Replace a data element by a new `TypedData`.
         * @param index The index of the data element to be replaced.
         * @param newData The new data element.
         */
        setDataItem(index, newData) {
            this._data[index] = newData;
            // We recalculate the size because
            // the `newData` type may not be the
            // same as the old `TypedData`.
            this.recalculateSize();
        }
        /**
         * Update the value of a data element.
         * @param index The index of the data element to be updated.
         * @param value The new data element value.
         */
        updateDataItem(index, value) {
            this._data[index].value = value;
        }
        /**
         * Multiply two `Matrix`.
         * @param a Left hand side matrix.
         * @param b Right hand side matrix.
         */
        static mul(a, b) {
            const result = new Array(a.width * a.height);
            for (let r = 0; r < a.width; r++) {
                const row = a.row(r);
                for (let c = 0; c < a.height; c++) {
                    result[r * a.width + c] = Vector_1.Vector.dot(row, b.column(c));
                }
            }
            return new Matrix(result, a.width, a.height);
        }
        row(index, data) {
            const _index = index * this._width;
            if (data !== undefined) {
                for (let i = 0; i < this._width; i++)
                    this.data[i + _index] = new TypedData_2.default(data[i], this.type);
                return;
            }
            else {
                const row = new Array(this._width);
                for (let i = 0; i < this._width; i++)
                    row[i] = this.data[i + _index];
                return new Vector_1.Vector(row);
            }
        }
        column(index, data) {
            const _index = index;
            if (data !== undefined) {
                for (let i = 0; i < this._height; i++)
                    this.data[i * this._width + _index] = new TypedData_2.default(data[i], this._type);
                return;
            }
            else {
                const col = new Array(this._height);
                for (let i = 0; i < this._height; i++)
                    col[i] = this.data[i * this._width + _index];
                return new Vector_1.Vector(col);
            }
        }
    }
    exports.Matrix = Matrix;
    /**
     * A 4x4 matrix.
     */
    class Matrix4x4 extends Matrix {
        /**
         * Create new instance of `Matrix4x4`.
         * @param data The matrix data.
         * @param type The type of each matrix data.
         */
        constructor(data, type) {
            const typedData = [];
            for (let i = 0; i < data.length; i++) {
                typedData[i] = new TypedData_2.default(data[i], type);
            }
            super(typedData, 4, 4);
        }
        /**
         * Create a identity matrix.
         * @param type The type of each matrix data.
         * @returns A 4x4 identity matrix.
         */
        static identity(type) {
            return new Matrix4x4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ], type);
        }
    }
    exports.Matrix4x4 = Matrix4x4;
    /**
     * A 3x3 matrix.
     */
    class Matrix3x3 extends Matrix {
        /**
         * Create new instance of `Matrix3x3`.
         * @param data The matrix data.
         * @param type The type of each matrix data.
         */
        constructor(data, type) {
            const typedData = [];
            for (let i = 0; i < data.length; i++) {
                typedData[i] = new TypedData_2.default(data[i], type);
            }
            super(typedData, 3, 3);
        }
        /**
         * Create a identity matrix.
         * @param type The type of each matrix data.
         * @returns A 3x3 identity matrix.
         */
        static identity(type) {
            return new Matrix3x3([
                1, 0, 0,
                0, 1, 0,
                0, 0, 1,
            ], type);
        }
        /**
         * Create a `Matrix3x3` that store a rotation.
         * @param angle The angle (in radians)
         * @returns The rotation matrix.
         */
        static rotation(angle) {
            const c = Math.cos(angle);
            const s = Math.sin(angle);
            return new Matrix3x3([
                c, -s, 0,
                s, c, 0,
                0, 0, 1,
            ], types_3.DataType.f32);
        }
        /**
         * Create a `Matrix3x3` that store a translation.
         * @param t The translation.
         * @returns The translation matrix.
         */
        static translation(t) {
            return new Matrix3x3([
                1, 0, 0,
                0, 1, 0,
                t.x, t.y, 1,
            ], t.type);
        }
        /**
         * Create a `Matrix3x3` that store a scale.
         * @param s The scale.
         * @returns The scale matrix.
         */
        static scaling(s) {
            return new Matrix3x3([
                s.x, 0, 0,
                0, s.y, 0,
                0, 0, 1,
            ], s.type);
        }
        /**
         * Create a `Matrix3x3` that store a projection.
         * @param width The screen width
         * @param height The screen height
         * @returns The projection matrix.
         */
        static projection(width, height) {
            return new Matrix3x3([
                2 / width, 0, 0,
                0, 2 / height, 0,
                1, 1, 1,
            ], types_3.DataType.f32);
        }
    }
    exports.Matrix3x3 = Matrix3x3;
});
define("Graphics/Buffer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferUsage = exports.BufferTarget = void 0;
    /**
     * GPU buffer target.
     */
    var BufferTarget;
    (function (BufferTarget) {
        BufferTarget[BufferTarget["Array"] = WebGLRenderingContext['ARRAY_BUFFER']] = "Array";
        BufferTarget[BufferTarget["Element"] = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER']] = "Element";
    })(BufferTarget = exports.BufferTarget || (exports.BufferTarget = {}));
    /**
     * GPU buffer usage.
     */
    var BufferUsage;
    (function (BufferUsage) {
        BufferUsage[BufferUsage["Static"] = WebGLRenderingContext['STATIC_DRAW']] = "Static";
        BufferUsage[BufferUsage["Dynamic"] = WebGLRenderingContext['DYNAMIC_DRAW']] = "Dynamic";
    })(BufferUsage = exports.BufferUsage || (exports.BufferUsage = {}));
    /**
     * This class is a abstraction of `WebGLBuffer` and
     * allow us to easly manage a `WebGLBuffer`.
     */
    class Buffer {
        /**
         * Create new instance of `Buffer`.
         * @param target The buffer target.
         * @param usage The buffer usage.
         */
        constructor(target, usage) {
            /** The raw `WebGLBuffer`. */
            this._rawBuffer = null;
            /** The current buffer size *(in bytes)* */
            this._size = 0;
            /** Indicate if the buffer was created */
            this._isCreated = false;
            this._target = target;
            this._usage = usage;
        }
        /** The current buffer size *(in bytes)* */
        get size() {
            return this._size;
        }
        /** The current buffer target */
        get target() {
            return this._target;
        }
        /** The current buffer usage */
        get usage() {
            return this._usage;
        }
        /** Indicate if the buffer was created */
        get isCreated() {
            return this._isCreated;
        }
        /**
         * Delete the buffer properly.
         * @param gl The context.
         */
        deleteBuffer(gl) {
            if (this._isCreated)
                gl.deleteBuffer(this._rawBuffer);
        }
        /**
         * Initialize the buffer. if the buffer is
         * already initialized, this function destroy
         * the old buffer and create new one.
         * @param gl The context.
         * @param data The buffer data.
         * @param count The buffer data amount.
         */
        initBuffer(gl, data, count) {
            if (this._isCreated)
                this.deleteBuffer(gl);
            const buffer = gl.createBuffer();
            if (buffer === null) {
                console.warn("Failed to create buffer !");
                return;
            }
            gl.bindBuffer(this._target, buffer);
            if (typeof data === 'number') {
                if (count != undefined) {
                    gl.bufferData(this._target, data * count, this._usage);
                    this._size = data * count;
                }
                else {
                    gl.bufferData(this._target, data, this._usage);
                    this._size = data;
                }
            }
            else {
                gl.bufferData(this._target, data, this._usage);
                this._size = data.byteLength;
            }
            this._rawBuffer = buffer;
            this._isCreated = true;
        }
        /**
         * Update the buffer data.
         * @param gl The context.
         * @param offset The position *(in bytes)* in the buffer where to start to update data.
         * @param data The new data.
         */
        updateBufferData(gl, offset, data) {
            if (!this._isCreated) {
                console.warn("Can't update the buffer: You must need to initialize it before do that.");
                return;
            }
            if (data.byteLength > this._size - offset) {
                console.warn(`Can't update the buffer: The data is too long for this buffer.`);
                return;
            }
            gl.bindBuffer(this._target, this._rawBuffer);
            gl.bufferSubData(this._target, offset, data);
        }
        /**
         * Bind the buffer.
         * @param gl The context.
         * @param target The buffer target.
         */
        bindBuffer(gl, target) {
            gl.bindBuffer(target, this._rawBuffer);
        }
    }
    exports.default = Buffer;
});
define("Graphics/IMeshBuffer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Graphics/Indices", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Indices = void 0;
    /**
     * A triangle indices representation.
     */
    class Indices {
        constructor(indices) {
            /** The triangle indices size *(in bytes)* */
            this._size = 0;
            this._indices = indices;
            this.recalculateSize();
        }
        /**
         * The size of the triangle indices *(in byte)*
         */
        get size() {
            return this._size;
        }
        /**
         * The indices.
         */
        get indices() {
            return this._indices;
        }
        /**
         * @param value The new indices.
         */
        set indices(value) {
            this._indices = value;
            this.recalculateSize();
        }
        /**
         * Recalculate the size of the current `Indices`.
         */
        recalculateSize() {
            this._size = this._indices.size;
        }
    }
    exports.Indices = Indices;
});
define("Core/DataViewUtils", ["require", "exports", "Core/types"], function (require, exports, types_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setTypedData = void 0;
    /**
     * Set a `TypedData` into a `DataView`.
     * @param offset The data offset *(in bytes)*
     * @param data The data to set.
     * @param view The `DataView`.
     * @returns The new offset *(in bytes)* according to the data size.
     */
    function setTypedData(offset, data, view) {
        switch (data.type) {
            case types_4.DataType.u8:
                view.setUint8(offset, data.value);
                break;
            case types_4.DataType.u16:
                view.setUint16(offset, data.value, true);
                break;
            case types_4.DataType.u32:
                view.setUint32(offset, data.value, true);
                break;
            case types_4.DataType.i8:
                view.setInt8(offset, data.value);
                break;
            case types_4.DataType.i16:
                view.setInt16(offset, data.value, true);
                break;
            case types_4.DataType.i32:
                view.setInt32(offset, data.value, true);
                break;
            case types_4.DataType.f32:
                view.setFloat32(offset, data.value, true);
                break;
        }
        return data.size;
    }
    exports.setTypedData = setTypedData;
});
define("Graphics/IndicesBuffer", ["require", "exports", "Graphics/Buffer", "Graphics/Buffer", "Core/DataViewUtils"], function (require, exports, Buffer_1, Buffer_2, DataViewUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Buffer_1 = __importDefault(Buffer_1);
    /**
     * Class that help us to transform
     * a `Indices` to a `Buffer`.
     */
    class IndicesBuffer {
        constructor(gl, indices, usage) {
            this._gl = gl;
            this._indices = indices;
            this._buffer = new Buffer_1.default(Buffer_2.BufferTarget.Element, usage);
            this._buffer.initBuffer(this._gl, this.inlineData());
        }
        /**
         * Update the buffer data.
         */
        updateBufferData(index, length) {
            if (index !== undefined) {
                if (Array.isArray(index)) {
                    for (let i = 0; i < index.length; i++) {
                        this.updateBufferData(index[i], length[i]);
                    }
                }
                else {
                    const size = this._indices[0].size;
                    const offset = size * index;
                    const bufferArray = new ArrayBuffer(size);
                    const view = new DataView(bufferArray);
                    let dataOffset = offset;
                    for (let k = 0; k < length; k++) {
                        for (let i = 0; i < this._indices[index + k].indices.data.length; i++) {
                            dataOffset += DataViewUtils_1.setTypedData(dataOffset, this._indices[index + k].indices.data[i], view);
                        }
                    }
                    this._buffer.updateBufferData(this._gl, offset, bufferArray);
                }
            }
            else {
                this._buffer.updateBufferData(this._gl, 0, this.inlineData());
            }
        }
        /**
         * Put all vertex data together into a single array.
         * It keep the vertex order.
         * @returns An array that contains all vertex data.
         */
        inlineData() {
            const bufferArray = new ArrayBuffer(this._indices[0].size * this._indices.length);
            const view = new DataView(bufferArray);
            let offset = 0;
            for (let i = 0; i < this._indices.length; i++) {
                for (let j = 0; j < this._indices[i].indices.data.length; j++) {
                    offset += DataViewUtils_1.setTypedData(offset, this._indices[i].indices.data[j], view);
                }
            }
            return bufferArray;
        }
        /**
         * Simply bind the buffer.
         */
        bindBuffer() {
            this._buffer.bindBuffer(this._gl, Buffer_2.BufferTarget.Element);
        }
        /**
         * Safely delete the buffer.
         */
        deleteBuffer() {
            this._buffer.deleteBuffer(this._gl);
        }
    }
    exports.default = IndicesBuffer;
});
define("Graphics/Shader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShaderType = void 0;
    /**
     * The shader type.
     */
    var ShaderType;
    (function (ShaderType) {
        /** A vertex shader */
        ShaderType[ShaderType["Vert"] = WebGLRenderingContext['VERTEX_SHADER']] = "Vert";
        /** A fragment shader */
        ShaderType[ShaderType["Frag"] = WebGLRenderingContext['FRAGMENT_SHADER']] = "Frag";
    })(ShaderType = exports.ShaderType || (exports.ShaderType = {}));
    /**
     * A Shader.
     */
    class Shader {
        /**
         * Create new Shader.
         * @param vertexSource Vertex shader source code.
         * @param fragmentSource Fragment shader source code.
         */
        constructor(vertexSource, fragmentSource) {
            /** The shader program. */
            this.program = null;
            /** Indicate if the shader was compiled */
            this.isCompiled = false;
            this.vertexSource = vertexSource;
            this.fragmentSource = fragmentSource;
        }
        /**
         * Compile and link vertex and fragment shader.
         * @param gl The context.
         */
        compileAndLink(gl) {
            const vShader = this.compile(gl, ShaderType.Vert, this.vertexSource);
            const fShader = this.compile(gl, ShaderType.Frag, this.fragmentSource);
            const program = gl.createProgram();
            if (program == null)
                throw new Error('Failed to create program.');
            // Attach & link shaders to the program...
            gl.attachShader(program, vShader);
            gl.attachShader(program, fShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
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
        compile(gl, type, source) {
            // Create shader
            const shader = gl.createShader(type);
            if (!shader)
                throw new Error('Failed to create shader');
            // Send source to the shader
            gl.shaderSource(shader, source);
            // Compile the shader
            gl.compileShader(shader);
            // Check if shader is not compiled successfully
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                let msg = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error('An error occurred when compiling the shaders: ' + msg);
            }
            return shader;
        }
        /**
         * Load shader from an url or path.
         * @param vs The vertex shader file url or path.
         * @param fs The fragment shader file url or path.
         */
        static loadFrom(vs, fs) {
            return __awaiter(this, void 0, void 0, function* () {
                const vSrc = fetch(vs instanceof URL ? vs.href : vs).then(res => res.text());
                const fSrc = fetch(fs instanceof URL ? fs.href : fs).then(res => res.text());
                const sources = yield Promise.all([vSrc, fSrc]);
                return new Shader(sources[0], sources[1]);
            });
        }
        /**
         * Use the current shader.
         * @param gl The context.
         */
        use(gl) {
            gl.useProgram(this.program);
        }
    }
    exports.default = Shader;
});
define("Graphics/Material", ["require", "exports", "Core/TypedData", "Core/types", "Math/Matrix"], function (require, exports, TypedData_3, types_5, Matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TypedData_3 = __importDefault(TypedData_3);
    class Material {
        /**
         * Create new instance of `Material`.
         * @param shader The shader.
         */
        constructor(shader) {
            /** The shader uniforms data */
            this._uniforms = {};
            this._shader = shader;
        }
        /** The shader. */
        get shader() {
            return this._shader;
        }
        /** The material uniforms data. */
        get uniforms() {
            return this._uniforms;
        }
        /**
         * Set an uniform data that would be a float.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        setUniformFloats(gl, location, size, data) {
            switch (size) {
                case 1:
                    gl.uniform1fv(location, new Float32Array(data.map(x => x.value)));
                    break;
                case 2:
                    gl.uniform2fv(location, new Float32Array(data.map(x => x.value)));
                    break;
                case 3:
                    gl.uniform3fv(location, new Float32Array(data.map(x => x.value)));
                    break;
                case 4:
                    gl.uniform4fv(location, new Float32Array(data.map(x => x.value)));
                    break;
            }
        }
        /**
         * Set an uniform data that would be a integer.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        setUniformSignedIntegers(gl, location, size, data) {
            switch (size) {
                case 1:
                    gl.uniform1iv(location, new Int32Array(data.map(x => x.value)));
                    break;
                case 2:
                    gl.uniform2iv(location, new Int32Array(data.map(x => x.value)));
                    break;
                case 3:
                    gl.uniform3iv(location, new Int32Array(data.map(x => x.value)));
                    break;
                case 4:
                    gl.uniform4iv(location, new Int32Array(data.map(x => x.value)));
                    break;
            }
        }
        /**
         * Set an uniform data that would be a matrix.
         * @param gl The context.
         * @param location The uniform location.
         * @param size The amount of components.
         * @param data The uniform data.
         */
        setUniformMatrix(gl, location, size, data) {
            switch (size) {
                case 2:
                    gl.uniformMatrix2fv(location, false, new Float32Array(data.map(x => x.value)));
                    break;
                case 3:
                    gl.uniformMatrix3fv(location, false, new Float32Array(data.map(x => x.value)));
                    break;
                case 4:
                    gl.uniformMatrix4fv(location, false, new Float32Array(data.map(x => x.value)));
                    break;
            }
        }
        /**
         * Use the material shader.
         * @param gl The context.
         */
        use(gl) {
            this._shader.use(gl);
            for (const key in this._uniforms) {
                if (this._uniforms[key].needUpdate) {
                    this._uniforms[key].needUpdate = false;
                    if (this._uniforms[key].location === undefined) {
                        const location = gl.getUniformLocation(this._shader.program, key);
                        if (location !== null) {
                            this._uniforms[key].location = location;
                        }
                        else {
                            console.warn(`Failed to set uniform data: the location ${location} not found!`);
                            // Remove the uniform from the dictionary
                            delete this._uniforms[key];
                            continue;
                        }
                    }
                    const { location, size, value, isMatrix } = this._uniforms[key];
                    if (!isMatrix) {
                        switch (this._uniforms[key].type) {
                            case types_5.DataType.i8:
                            case types_5.DataType.i16:
                            case types_5.DataType.i32:
                                this.setUniformSignedIntegers(gl, location, size, value);
                                break;
                            case types_5.DataType.u8:
                            case types_5.DataType.u16:
                            case types_5.DataType.u32:
                                console.warn(`Unsigned integer was not supported !`);
                                break;
                            case types_5.DataType.f32:
                                this.setUniformFloats(gl, location, size, value);
                                break;
                        }
                    }
                    else {
                        this.setUniformMatrix(gl, location, size, value);
                    }
                }
            }
        }
        /**
         * Set an uniform vector or matrix value.
         * @param name The name of the uniform vector or matrix.
         * @param v The value.
         */
        setUniform(name, v) {
            if (this._uniforms[name]) {
                this._uniforms[name].value = (v instanceof TypedData_3.default) ? [v] : v.data;
                this._uniforms[name].needUpdate = true;
            }
            else {
                this._uniforms[name] = {
                    size: v instanceof Matrix_1.Matrix ? v.width : v instanceof TypedData_3.default ? 1 : v.data.length,
                    value: (v instanceof TypedData_3.default) ? [v] : v.data,
                    needUpdate: true,
                    location: undefined,
                    type: v.type,
                    isMatrix: v instanceof Matrix_1.Matrix,
                };
            }
        }
    }
    exports.default = Material;
});
define("Graphics/Vertex", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vertex = exports.VertexAttribute = void 0;
    /**
     * Little wrapper of WebGL `VertexAttribute`. It contain
     * the same data as a regular `VertexAttribute`. Is just
     * an "Objectify" version of the WebGL `VertexAttribute`.
     */
    class VertexAttribute {
        /**
         * Create new instance of `VertexAttribute` class.
         * @param index The index of the vertex attribute.
         * @param size The number of components per vertex attribute
         * @param type The data type of each components
         * @param normalized If the data must be normalized
         * @param stride Specifying the offset in bytes between the beginning of consecutive vertex attributes. Cannot be larger than 255. If stride is 0, the attribute is assumed to be tightly packed, that is, the attributes are not interleaved but each attribute is in a separate block, and the next vertex' attribute follows immediately after the current vertex.
         * @param offset The offset in bytes of the first component in the vertex attribute array. Must be a multiple of the byte length of type.
         */
        constructor(index, size, type, normalized, stride, offset) {
            this._size = size;
            this._type = type;
            this._index = index;
            this._stride = stride;
            this._offset = offset;
            this._normalized = normalized;
        }
        /** The index of the vertex attribute. */
        get index() {
            return this._index;
        }
        /** The number of components per vertex attribute */
        get size() {
            return this._size;
        }
        /** The data type of each components */
        get type() {
            return this._type;
        }
        /**
         * The offset in bytes between the beginning of consecutive
         * vertex attributes. Cannot be larger than 255. If stride
         * is 0, the attribute is assumed to be tightly packed, that
         * is, the attributes are not interleaved but each attribute
         * is in a separate block, and the next vertex' attribute
         * follows immediately after the current vertex.
         */
        get stride() {
            return this._stride;
        }
        /**
         * The offset in bytes of the first component in the vertex
         * attribute array. Must be a multiple of the byte length of
         * type.
         */
        get offset() {
            return this._offset;
        }
        /** Indicate if the data must be normalized */
        get normalized() {
            return this._normalized;
        }
        /**
         * Enable the current vertex attributes.
         */
        enable(gl) {
            gl.vertexAttribPointer(this._index, this._size, this._type, this._normalized, this._stride, this._offset);
            gl.enableVertexAttribArray(this._index);
        }
    }
    exports.VertexAttribute = VertexAttribute;
    /**
     * A vertex representation.
     */
    class Vertex {
        constructor(vectors) {
            /** The vertex size *(in bytes)* */
            this._size = 0;
            this._vectors = vectors;
            this.recalculateSize();
        }
        /**
         * The size of the vertex *(in byte)*
         */
        get size() {
            return this._size;
        }
        /**
         * The vector array.
         */
        get vectors() {
            return this._vectors;
        }
        /**
         * @param value The new vector array.
         */
        set vectors(value) {
            this._vectors = value;
            this.recalculateSize();
        }
        /**
         * Recalculate the size of the current `Vertex`.
         */
        recalculateSize() {
            this._size = 0;
            for (let i = 0; i < this._vectors.length; i++)
                this._size += this._vectors[i].size;
        }
        /**
         * Build an array of `VertexAttribute` from the current `Vertex`.
         * @returns The vertex attributes.
         */
        buildVertexAttributes() {
            let offset = 0;
            const attributes = [];
            for (let i = 0; i < this.vectors.length; i++) {
                const attribute = new VertexAttribute(i, this.vectors[i].data.length, this.vectors[i].type, false, this.size, offset);
                offset += this.vectors[i].size;
                attributes.push(attribute);
            }
            return attributes;
        }
    }
    exports.Vertex = Vertex;
});
define("Graphics/Mesh", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mesh = exports.BufferUpdateMode = exports.DrawMode = void 0;
    var DrawMode;
    (function (DrawMode) {
        DrawMode[DrawMode["Triangle"] = WebGLRenderingContext['TRIANGLES']] = "Triangle";
        DrawMode[DrawMode["TriangleFan"] = WebGLRenderingContext['TRIANGLE_FAN']] = "TriangleFan";
        DrawMode[DrawMode["TriangleStrip"] = WebGLRenderingContext['TRIANGLE_STRIP']] = "TriangleStrip";
        DrawMode[DrawMode["Lines"] = WebGLRenderingContext['LINES']] = "Lines";
        DrawMode[DrawMode["LineStrip"] = WebGLRenderingContext['LINE_STRIP']] = "LineStrip";
        DrawMode[DrawMode["LineLoop"] = WebGLRenderingContext['LINE_LOOP']] = "LineLoop";
    })(DrawMode = exports.DrawMode || (exports.DrawMode = {}));
    var BufferUpdateMode;
    (function (BufferUpdateMode) {
        BufferUpdateMode[BufferUpdateMode["None"] = 0] = "None";
        BufferUpdateMode[BufferUpdateMode["All"] = 1] = "All";
        BufferUpdateMode[BufferUpdateMode["Keep"] = 2] = "Keep";
    })(BufferUpdateMode = exports.BufferUpdateMode || (exports.BufferUpdateMode = {}));
    ;
    /**
     * Represent a Mesh.
     */
    class Mesh {
        /**
         * Create new instance of `Mesh`.
         * @param vertices The mesh vertices
         * @param indices The mesh indices
         * @param material The mesh material
         * @param renderMode How to draw the mesh geometry from the indices.
         */
        constructor(vertices, indices, material, renderMode = DrawMode.Triangle) {
            /** How to draw the geometry from the indices. */
            this._drawMode = DrawMode.Triangle;
            this._vertexBufferUpdateInfos = [];
            this._indexBufferUpdateInfos = [];
            this._vertices = vertices;
            this._indices = indices;
            this._material = material;
            this._drawMode = renderMode;
        }
        /** The mesh vertices */
        get vertices() {
            return this._vertices;
        }
        /** The mesh indices */
        get indices() {
            return this._indices;
        }
        /** The mesh material */
        get material() {
            return this._material;
        }
        /** The draw mode */
        get drawMode() {
            return this._drawMode;
        }
        /** The vertex buffer update infos. */
        get vertexBufferUpdateInfos() {
            return this._vertexBufferUpdateInfos;
        }
        /** The index buffer update infos. */
        get indexBufferUpdateInfos() {
            return this._indexBufferUpdateInfos;
        }
        /** @param vertices The new vertices */
        set vertices(vertices) {
            this._vertices = vertices;
            this._vertexBufferUpdateInfos.push({
                mode: BufferUpdateMode.All,
                offset: 0,
                length: vertices.length,
            });
        }
        /** @param indices The new indices */
        set indices(indices) {
            this._indices = indices;
            this._indexBufferUpdateInfos.push({
                mode: BufferUpdateMode.All,
                offset: 0,
                length: indices.length,
            });
        }
        /**
         * Update the mesh vertices. *The new vertices must be have
         * the same type as the old vertices.*
         * @param vertices The new vertices.
         * @param offset Where we need to put the new vertices
         */
        updateVertices(vertices, offset = 0) {
            this._vertices.splice(offset, vertices.length, ...vertices);
            this._vertexBufferUpdateInfos.push({
                mode: BufferUpdateMode.Keep,
                offset: offset,
                length: vertices.length,
            });
        }
        /**
         * Update the mesh indices. *The new indices must be have
         * the same type as the old indices!*
         * @param indices The new indices.
         * @param offset Where we need to put the new indices
         */
        updateIndices(indices, offset = 0) {
            this._indices.splice(offset, indices.length, ...indices);
            this._indexBufferUpdateInfos.push({
                mode: BufferUpdateMode.All,
                offset: offset,
                length: indices.length,
            });
        }
    }
    exports.Mesh = Mesh;
});
define("Graphics/VertexBuffer", ["require", "exports", "Core/DataViewUtils", "Graphics/Buffer", "Graphics/Buffer"], function (require, exports, DataViewUtils_2, Buffer_3, Buffer_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Buffer_4 = __importDefault(Buffer_4);
    /**
     * Class that help us to transform
     * a `Vertex` to a `Buffer`.
     */
    class VertexBuffer {
        constructor(gl, vertices, usage) {
            this._gl = gl;
            this._vertices = vertices;
            this._buffer = new Buffer_4.default(Buffer_3.BufferTarget.Array, usage);
            this._buffer.initBuffer(this._gl, this.inlineData());
        }
        /**
         * Update the buffer data.
         */
        updateBufferData(index, length) {
            if (index !== undefined) {
                if (Array.isArray(index)) {
                    for (let i = 0; i < index.length; i++) {
                        this.updateBufferData(index[i], length[i]);
                    }
                }
                else {
                    const size = this._vertices[0].size;
                    const offset = size * index;
                    const bufferArray = new ArrayBuffer(size);
                    const view = new DataView(bufferArray);
                    let dataOffset = offset;
                    for (let k = 0; k < length; k++) {
                        for (let i = 0; i < this._vertices[index + k].vectors.length; i++) {
                            for (let j = 0; j < this._vertices[index + k].vectors[i].data.length; j++) {
                                dataOffset += DataViewUtils_2.setTypedData(dataOffset, this._vertices[index + k].vectors[i].data[j], view);
                            }
                        }
                    }
                    this._buffer.updateBufferData(this._gl, offset, bufferArray);
                }
            }
            else {
                this._buffer.updateBufferData(this._gl, 0, this.inlineData());
            }
        }
        /**
         * Put all vertex data together into a single array.
         * It keep the vertex order.
         * @returns An array that contains all vertex data.
         */
        inlineData() {
            const bufferArray = new ArrayBuffer(this._vertices[0].size * this._vertices.length);
            const view = new DataView(bufferArray);
            let offset = 0;
            for (let i = 0; i < this._vertices.length; i++) {
                for (let j = 0; j < this._vertices[i].vectors.length; j++) {
                    for (let k = 0; k < this._vertices[i].vectors[j].data.length; k++) {
                        DataViewUtils_2.setTypedData(offset, this._vertices[i].vectors[j].data[k], view);
                        offset += this._vertices[i].vectors[j].data[k].size;
                    }
                }
            }
            return bufferArray;
        }
        /**
         * Simply bind the buffer.
         */
        bindBuffer() {
            this._buffer.bindBuffer(this._gl, Buffer_3.BufferTarget.Array);
        }
        /**
         * Safely delete the buffer.
         */
        deleteBuffer() {
            this._buffer.deleteBuffer(this._gl);
        }
    }
    exports.default = VertexBuffer;
});
define("Core/SceneRenderer", ["require", "exports", "Graphics/Buffer", "Graphics/IndicesBuffer", "Graphics/Mesh", "Graphics/VertexBuffer", "Math/Vector", "Core/types"], function (require, exports, Buffer_5, IndicesBuffer_1, Mesh_1, VertexBuffer_1, Vector_2, types_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    IndicesBuffer_1 = __importDefault(IndicesBuffer_1);
    VertexBuffer_1 = __importDefault(VertexBuffer_1);
    /**
     * The scene renderer.
     */
    class SceneRenderer {
        /**
         * Create new instance of `SceneRenderer`.
         * @param canvas The canvas where we want to render.
         */
        constructor(canvas) {
            /** The meshes to be render */
            this.meshes = [];
            /** The render data of each meshes */
            this.meshesRenderData = [];
            this._canvas = canvas;
            const gl = canvas.getContext('webgl');
            if (gl === null) {
                throw new Error("WebGL is not supported");
            }
            this._gl = gl;
            window.onresize = () => this.onResize();
            this.onResize();
        }
        /**
         * Called when we need to resize the
         * canvas and the viewport of the context.
         */
        onResize() {
            const dpr = window.devicePixelRatio;
            const w = Math.round(this._canvas.clientWidth * dpr);
            const h = Math.round(this._canvas.clientHeight * dpr);
            const needResize = this._canvas.width != w || this._canvas.height != h;
            if (needResize) {
                this._canvas.width = w;
                this._canvas.height = h;
                this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        }
        /**
         * Add a `Mesh` into the scene.
         * @param mesh The mesh to be added.
         */
        addMesh(mesh) {
            // Verify if the mesh not already exist
            if (this.meshes.find((m) => m === mesh)) {
                console.warn("Can't add the mesh: The mesh already exist!");
                return;
            }
            // Check if the mesh shader was compiled
            if (!mesh.material.shader.isCompiled) {
                mesh.material.shader.compileAndLink(this._gl);
            }
            // Create the index buffer from the mesh indices.
            const iBuffer = new IndicesBuffer_1.default(this._gl, mesh.indices, Buffer_5.BufferUsage.Static);
            // Create the vertex buffer from the mesh vertices.
            const vBuffer = new VertexBuffer_1.default(this._gl, mesh.vertices, Buffer_5.BufferUsage.Dynamic);
            // Create the vertex attributes from the mesh vertices.
            const vAttribs = mesh.vertices[0].buildVertexAttributes();
            // Bind the vertex buffer and set the vertex attributes
            // on it!
            vBuffer.bindBuffer();
            for (let i = 0; i < vAttribs.length; i++) {
                vAttribs[i].enable(this._gl);
            }
            const meshRenderData = {
                indexBuffer: iBuffer,
                vertexBuffer: vBuffer,
                vertexAttributes: vAttribs,
            };
            this.meshes.push(mesh);
            this.meshesRenderData.push(meshRenderData);
        }
        /**
         * Remove a `Mesh` from the scene.
         * @param mesh The mesh to remove
         */
        removeMesh(mesh) {
            const index = this.meshes.findIndex((m) => mesh);
            if (index === -1) {
                console.warn("Can't remoe the mesh: The mesh not exist!");
                return;
            }
            // Safely delete the mesh buffers...
            this.meshesRenderData[index].vertexBuffer.deleteBuffer();
            this.meshesRenderData[index].indexBuffer.deleteBuffer();
            this.meshes.splice(index, 1);
            this.meshesRenderData.splice(index, 1);
        }
        /**
         * Check if we need to reallocate the mesh buffers.
         * @param meshIndex The index of the mesh that we want to check.
         */
        checkMeshBuffers(meshIndex) {
            for (let i = 0; i < this.meshes[meshIndex].vertexBufferUpdateInfos.length; i++) {
                switch (this.meshes[meshIndex].vertexBufferUpdateInfos[i].mode) {
                    case Mesh_1.BufferUpdateMode.None: continue;
                    case Mesh_1.BufferUpdateMode.All:
                        this.meshesRenderData[meshIndex].vertexBuffer.updateBufferData();
                        break;
                    case Mesh_1.BufferUpdateMode.Keep:
                        const offset = this.meshes[meshIndex].vertexBufferUpdateInfos[i].offset;
                        const length = this.meshes[meshIndex].vertexBufferUpdateInfos[i].length;
                        this.meshesRenderData[meshIndex].vertexBuffer.updateBufferData(offset, length);
                        break;
                }
            }
            for (let i = 0; i < this.meshes[meshIndex].indexBufferUpdateInfos.length; i++) {
                switch (this.meshes[meshIndex].indexBufferUpdateInfos[i].mode) {
                    case Mesh_1.BufferUpdateMode.None: continue;
                    case Mesh_1.BufferUpdateMode.All:
                        this.meshesRenderData[meshIndex].indexBuffer.updateBufferData();
                        break;
                    case Mesh_1.BufferUpdateMode.Keep:
                        const offset = this.meshes[meshIndex].indexBufferUpdateInfos[i].offset;
                        const length = this.meshes[meshIndex].indexBufferUpdateInfos[i].length;
                        this.meshesRenderData[meshIndex].indexBuffer.updateBufferData(offset, length);
                        break;
                }
            }
        }
        render() {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT);
            this._gl.clearColor(0.1, 0.1, 0.1, 1);
            for (let i = 0; i < this.meshes.length; i++) {
                this.checkMeshBuffers(i);
                this.meshes[i].material.use(this._gl);
                this.meshesRenderData[i].indexBuffer.bindBuffer();
                this._gl.drawElements(this.meshes[i].drawMode, this.meshes[i].indices.length * 3, this.meshes[i].indices[0].indices.type, 0);
            }
        }
        /** The renderer canvas width */
        get width() {
            return this._canvas.width;
        }
        /** The renderer canvas height */
        get height() {
            return this._canvas.height;
        }
        /** The renderer canvas width and height */
        get size() {
            return new Vector_2.Vector2(this.width, this.height, types_6.DataType.u32);
        }
    }
    exports.default = SceneRenderer;
});
define("Core/Transform", ["require", "exports", "Math/Matrix"], function (require, exports, Matrix_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Transform {
        /**
         * Create new instance of `Transform`.
         * @param position The position
         * @param rotation The rotation (in radians)
         * @param scale The scale
         */
        constructor(position, rotation, scale) {
            this._position = position;
            this._rotation = rotation;
            this._scale = scale;
            this._trs = this.calculateModelMatrix();
        }
        /** The position. */
        get position() {
            return this._position;
        }
        /** The rotation (in radians) */
        get rotation() {
            return this._rotation;
        }
        /** The scale */
        get scale() {
            return this._scale;
        }
        /** The transform matrix */
        get TRS() {
            return this._trs;
        }
        /** @param p The new position */
        set position(p) {
            this._position = p;
            this._trs = this.calculateModelMatrix();
        }
        /** @param r The new rotation (in radians) */
        set rotation(r) {
            this._rotation = r;
            this._trs = this.calculateModelMatrix();
        }
        /** @param s The new scale */
        set scale(s) {
            this._scale = s;
            this._trs = this.calculateModelMatrix();
        }
        /**
         * Calculate the model matrix from Translation, Rotation and Scale.
         * @returns The model matrix (TRS)
         */
        calculateModelMatrix() {
            return Matrix_2.Matrix3x3.mul(Matrix_2.Matrix3x3.mul(Matrix_2.Matrix3x3.translation(this.position), Matrix_2.Matrix3x3.rotation(this.rotation)), Matrix_2.Matrix3x3.scaling(this.scale));
        }
    }
    exports.default = Transform;
});
define("index", ["require", "exports", "Math/Vector", "Math/Matrix", "Graphics/Buffer", "Graphics/IMeshBuffer", "Graphics/Indices", "Graphics/IndicesBuffer", "Graphics/Material", "Graphics/Mesh", "Graphics/Shader", "Graphics/Vertex", "Graphics/VertexBuffer", "Core/DataViewUtils", "Core/ISized", "Core/SceneRenderer", "Core/Transform", "Core/TypedData", "Core/types"], function (require, exports, Vector_3, Matrix_3, Buffer_6, IMeshBuffer_1, Indices_1, IndicesBuffer_2, Material_1, Mesh_2, Shader_1, Vertex_1, VertexBuffer_2, DataViewUtils_3, ISized_1, SceneRenderer_1, Transform_1, TypedData_4, types_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Math
    __exportStar(Vector_3, exports);
    __exportStar(Matrix_3, exports);
    // Graphics
    __exportStar(Buffer_6, exports);
    __exportStar(IMeshBuffer_1, exports);
    __exportStar(Indices_1, exports);
    __exportStar(IndicesBuffer_2, exports);
    __exportStar(Material_1, exports);
    __exportStar(Mesh_2, exports);
    __exportStar(Shader_1, exports);
    __exportStar(Vertex_1, exports);
    __exportStar(VertexBuffer_2, exports);
    // Core
    __exportStar(DataViewUtils_3, exports);
    __exportStar(ISized_1, exports);
    __exportStar(SceneRenderer_1, exports);
    __exportStar(Transform_1, exports);
    __exportStar(TypedData_4, exports);
    __exportStar(types_7, exports);
});
define("ECS/World", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestComponentB = exports.TestComponentA = exports.Component = void 0;
    class Component {
    }
    exports.Component = Component;
    class TestComponentA extends Component {
    }
    exports.TestComponentA = TestComponentA;
    class TestComponentB extends Component {
    }
    exports.TestComponentB = TestComponentB;
    class World {
        /**
         * Create new instance of `World`.
         * @param max_entities The maximum amount of entities in the world.
         */
        constructor(max_entities) {
            /** All entities components. */
            this._components = {};
            this._available_entities = new Array(max_entities);
            this._living_entities = new Array(max_entities);
            for (let i = 0; i < this._available_entities.length; i++) {
                this._available_entities[i] = i;
            }
        }
        /**
         * Create new `Entity`.
         * @returns The new entity
         */
        createEntity() {
            if (this._available_entities.length === 0)
                throw new Error("Maximum entities amount is reached!");
            const entity = this._available_entities.pop();
            this._living_entities.push(entity);
            return entity;
        }
        /**
         * Destroy an `Entity`
         * @param entity The entity to destroy
         * @returns
         */
        destroyEntity(entity) {
            const id = this._living_entities.indexOf(entity);
            if (id === -1)
                return;
            this._available_entities.push(this._living_entities.splice(id, 1)[0]);
        }
        /**
         * Add a component to an `Entity`.
         * @param entity The entity.
         * @param component The component to add,
         */
        addComponent(entity, component) {
            if (!this._components[component.constructor.name]) {
                this._components[component.constructor.name] = {};
            }
            this._components[component.constructor.name][entity] = component;
        }
        /**
         * Remove a component on `Entity`.
         * @param entity The entity.
         * @param component The component type to remove.
         */
        removeComponent(entity, component) {
            delete this._components[component.name][entity];
        }
        /**
         * Search all entities that have a specific component(s).
         * @param components The component(s) to find
         * @returns All entities that have the given component(s).
         */
        entityWithAll(components) {
            // let entities: Entity[] = [];
            // for(const k in this._components) {
            //     const _entities = [];
            //     for(let i = 0; i < components.length; i++){
            //         if(this._components[components[i].name]) {
            //             _entities.push(...Object.keys(this._components[components[i].name])
            //                 .map(key => parseInt(key)));
            //         }
            //     }
            // }
            // return entities;
        }
    }
    exports.default = World;
});
define("../exemples/colorCircle", ["require", "exports", "Core/SceneRenderer", "Graphics/Indices", "Graphics/Mesh", "Graphics/Shader", "Graphics/Vertex", "Math/Vector", "Graphics/Material", "Math/Matrix", "Core/Transform", "ECS/World"], function (require, exports, SceneRenderer_js_1, Indices_js_1, Mesh_js_1, Shader_js_1, Vertex_js_1, Vector_js_1, Material_js_1, Matrix_js_1, Transform_js_1, World_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SceneRenderer_js_1 = __importDefault(SceneRenderer_js_1);
    Shader_js_1 = __importDefault(Shader_js_1);
    Material_js_1 = __importDefault(Material_js_1);
    Transform_js_1 = __importDefault(Transform_js_1);
    World_js_1 = __importStar(World_js_1);
    const canvas = document.querySelector("#canvas");
    const renderer = new SceneRenderer_js_1.default(canvas);
    let material = null;
    let mesh = null;
    function setup() {
        return __awaiter(this, void 0, void 0, function* () {
            /** The circle mesh vertices. */
            const vertices = [];
            /** The circle mesh indices. */
            const indices = [];
            /** The circle radius. */
            const radius = 1;
            /** The circle resolution. */
            const resolution = 24;
            /** The angle offset between two vertex. */
            const steps = 360 / resolution;
            /** Constant to convert degrees to radians. */
            const deg2rad = Math.PI / 180;
            /** The different vertex color of the circle. */
            const colors = [
                new Vector_js_1.float4(1, 0, 0, 1),
                new Vector_js_1.float4(0, 1, 0, 1),
                new Vector_js_1.float4(0, 0, 1, 1), // Blue
            ];
            // Push the origin vertex of our circle.
            vertices.push(new Vertex_js_1.Vertex([
                new Vector_js_1.float2(0, 0),
                new Vector_js_1.float4(1, 1, 1, 1), // The color.
            ]));
            for (let i = 0, j = 0; i <= 360; i += steps, j++) {
                const x = Math.sin(i * deg2rad) * radius;
                const y = Math.cos(i * deg2rad) * radius;
                vertices.push(new Vertex_js_1.Vertex([
                    new Vector_js_1.float2(x, y),
                    colors[Math.floor(j / 8) % colors.length], // The color.
                ]));
                if (j === 0)
                    continue;
                indices.push(new Indices_js_1.Indices(new Vector_js_1.ubyte3(0, j - 1, j)));
            }
            indices.push(new Indices_js_1.Indices(new Vector_js_1.ubyte3(0, resolution, 1)));
            const shader = yield Shader_js_1.default.loadFrom("shaders/simple.vert", "shaders/simple.frag");
            material = new Material_js_1.default(shader);
            mesh = new Mesh_js_1.Mesh(vertices, indices, material, Mesh_js_1.DrawMode.Triangle);
            renderer.addMesh(mesh);
            window.onkeydown = (ev) => {
                if (ev.key === 'r')
                    renderer.removeMesh(mesh);
                if (ev.key === 'a')
                    renderer.addMesh(mesh);
            };
            const world = new World_js_1.default(2);
            const entityA = world.createEntity();
            const entityB = world.createEntity();
            world.addComponent(entityB, new World_js_1.TestComponentB());
            world.addComponent(entityA, new World_js_1.TestComponentA());
            // console.log(world.entityWithAll([TestComponentA, TestComponentB]));
        });
    }
    function render(t = 0) {
        // The circle rotation angle (in radians)
        const angle = t / 250;
        const size = renderer.size;
        const v = [new Vertex_js_1.Vertex([
                new Vector_js_1.float2(Math.sin(t / 100) * .5, Math.cos(t / 100) * .5),
                new Vector_js_1.float4(1, 0, 0, 1),
            ])];
        // Update the vertex at index 0 (the center of the circle...)
        mesh === null || mesh === void 0 ? void 0 : mesh.updateVertices(v, 0);
        // The camera projection matrix.
        const projection = Matrix_js_1.Matrix3x3.projection(size.x, size.y);
        const sphereTransform = new Transform_js_1.default(new Vector_js_1.float2(0, 0), angle, new Vector_js_1.float2(50, 50));
        const cameraTransform = new Transform_js_1.default(new Vector_js_1.float2(-size.x / 2, -size.y / 2), 0, new Vector_js_1.float2(1, 1));
        // Send the uniform data to the circle shader.
        material === null || material === void 0 ? void 0 : material.setUniform("projection", projection);
        material === null || material === void 0 ? void 0 : material.setUniform("view", cameraTransform.TRS);
        material === null || material === void 0 ? void 0 : material.setUniform("model", sphereTransform.TRS);
        // Render the current frame.
        renderer.render();
        requestAnimationFrame(render);
    }
    setup().then(() => requestAnimationFrame(render));
});
define("../exemples/noise", ["require", "exports", "Core/SceneRenderer", "Core/TypedData", "Core/types", "Graphics/Indices", "Graphics/Material", "Graphics/Mesh", "Graphics/Shader", "Graphics/Vertex", "Math/Vector"], function (require, exports, SceneRenderer_2, TypedData_5, types_8, Indices_2, Material_2, Mesh_3, Shader_2, Vertex_2, Vector_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SceneRenderer_2 = __importDefault(SceneRenderer_2);
    TypedData_5 = __importDefault(TypedData_5);
    Material_2 = __importDefault(Material_2);
    Shader_2 = __importDefault(Shader_2);
    const canvas = document.querySelector("#canvas");
    const renderer = new SceneRenderer_2.default(canvas);
    let material;
    let current_pos = new Vector_4.float2(0, 0);
    let current_zoom = 0;
    let deltaTime = 0;
    let lastTime = 0;
    let key_l = false;
    let key_r = false;
    let key_u = false;
    let key_d = false;
    let key_zz = false;
    let key_dz = false;
    function setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const shader = yield Shader_2.default.loadFrom("shaders/noise.vert", "shaders/noise.frag");
            material = new Material_2.default(shader);
            const vertices = [
                new Vertex_2.Vertex([new Vector_4.float2(-1, -1), new Vector_4.float2(0, 0)]),
                new Vertex_2.Vertex([new Vector_4.float2(-1, 1), new Vector_4.float2(0, 1)]),
                new Vertex_2.Vertex([new Vector_4.float2(1, 1), new Vector_4.float2(1, 1)]),
                new Vertex_2.Vertex([new Vector_4.float2(1, -1), new Vector_4.float2(1, 0)]),
            ];
            const indices = [
                new Indices_2.Indices(new Vector_4.ubyte3(0, 1, 2)),
                new Indices_2.Indices(new Vector_4.ubyte3(0, 2, 3)),
            ];
            const mesh = new Mesh_3.Mesh(vertices, indices, material, Mesh_3.DrawMode.Triangle);
            renderer.addMesh(mesh);
            window.addEventListener("keydown", (e) => {
                if (e.key === 'a')
                    key_l = true;
                if (e.key === 'd')
                    key_r = true;
                if (e.key === 'w')
                    key_u = true;
                if (e.key === 's')
                    key_d = true;
                if (e.key === 'e')
                    key_zz = true;
                if (e.key === 'q')
                    key_dz = true;
            });
            window.addEventListener("keyup", (e) => {
                if (e.key === 'a')
                    key_l = false;
                if (e.key === 'd')
                    key_r = false;
                if (e.key === 'w')
                    key_u = false;
                if (e.key === 's')
                    key_d = false;
                if (e.key === 'e')
                    key_zz = false;
                if (e.key === 'q')
                    key_dz = false;
            });
        });
    }
    function render(t = 0) {
        deltaTime = (t - lastTime) / 1000;
        lastTime = t;
        if (key_l) {
            current_pos.x -= 0.5 * deltaTime;
        }
        if (key_r) {
            current_pos.x += 0.5 * deltaTime;
        }
        if (key_u) {
            current_pos.y += 0.5 * deltaTime;
        }
        if (key_d) {
            current_pos.y -= 0.5 * deltaTime;
        }
        if (key_zz) {
            current_zoom += 1.5 * deltaTime;
        }
        if (key_dz) {
            current_zoom -= 1.5 * deltaTime;
        }
        // material?.setUniform("time", new TypedData(t / 800, DataType.f32));
        material === null || material === void 0 ? void 0 : material.setUniform("zoom", new TypedData_5.default(current_zoom, types_8.DataType.f32));
        material === null || material === void 0 ? void 0 : material.setUniform("position", current_pos);
        material === null || material === void 0 ? void 0 : material.setUniform("screen_size", new Vector_4.float2(renderer.size.x, renderer.size.y));
        renderer.render();
        requestAnimationFrame(render);
    }
    setup().then(() => requestAnimationFrame(render));
});
