precision mediump float;

varying vec2 uv_coord;
uniform vec2 screen_size;
uniform vec2 position;
uniform float zoom;
uniform float time;

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float sumOctave(vec2 pos, float persistence) {
    float maxAmp = 0.0;
    float amp = 1.0;
    float freq = 1.0;
    float noise = 0.0;

    for(int i = 0; i < 8; i++) {
        noise += snoise(pos * freq) * amp;
        maxAmp += amp;
        amp *= persistence;
        freq *= 2.0;
    }

    noise /= maxAmp;
    return noise;
}

void main(void) {
    float mm = min(screen_size.x, screen_size.y);
    vec2 puv = (uv_coord.xy * screen_size.xy) / mm;
    vec3 col = 0.5 + 0.5 * cos(time + puv.xyx + vec3(0, 2, 4));
    float n = (sumOctave(puv + position, 0.5) * 0.5 + 0.5) * (20. + zoom);//snoise(uv_coord * 2.0) * 0.5 + 0.5;
    n = fract(n);
    n = 1.0 - smoothstep(0.1, 0.1, n);
    vec3 colored = vec3(n, n, n) * col;
    gl_FragColor = vec4(colored, 1);
}