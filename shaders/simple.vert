
attribute vec2 vpos; // Vertex position
attribute vec4 vcol; // Vertex color

varying vec4 col;

void main(void) {
    col = vcol;
    gl_Position = vec4(vpos, 0, 1);
}