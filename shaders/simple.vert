
attribute vec2 vpos; // Vertex position
attribute vec4 vcol; // Vertex color

varying vec4 col;

uniform mat3 projection;    // The projection matrix
uniform mat3 view;          // The view matrix.
uniform mat3 model;         // The model matrix.

void main(void) {
    col = vcol;
    vec3 pos = projection * view * model * vec3(vpos, 1);
    gl_Position = vec4(pos.xy, 0, 1);
}