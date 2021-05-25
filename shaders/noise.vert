
attribute vec2 vpos; // Vertex position
attribute vec2 vuv; // Vertex uv

varying vec2 uv_coord;

void main(void) {
    uv_coord = vuv;
    gl_Position = vec4(vpos.xy, 0, 1);
}