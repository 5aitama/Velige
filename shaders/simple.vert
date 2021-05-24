
attribute vec2 vpos; // Vertex position
attribute vec4 vcol; // Vertex color

varying vec4 col;

uniform vec2 position;

void main(void) {
    col = vcol;
    gl_Position = vec4(vpos + position, 0, 1);
}