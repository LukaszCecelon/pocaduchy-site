import React, {useEffect, useRef, useState} from 'react';
import styles from './Zebatka3D.module.css';

const TEETH = 18;
const R_OUTER = 208;
const R_ROOT = 176;
const DEPTH = R_OUTER * 2 * 0.15;
const HALF_DEPTH = DEPTH / 2;
const CENTER_HOLE_RADIUS = 54;
const BOLT_RING_RADIUS = 118;
const BOLT_HOLE_RADIUS = 16;
const BOLT_HOLES = Array.from({length: 6}, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return {x: 118 * Math.cos(a), y: 118 * Math.sin(a)};
});
const BOLT_HOLE_UNIFORM = new Float32Array(BOLT_HOLES.flatMap((hole) => [hole.x, hole.y]));
const OUTER_COLOR = [0x2b / 255, 0x2f / 255, 0x4c / 255];
const RUST_COLOR = [0x96 / 255, 0x45 / 255, 0x3b / 255];
const FULL_TURN_MS = 12000;
const PHASE_MS = 900;
const TRIANGLE_COUNT = 672;

const SOLID_VERTEX_SHADER = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute float aCutMask;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vLocalPosition;
varying float vCutMask;

void main() {
  vec4 viewPosition = uModelView * vec4(aPosition, 1.0);
  vNormal = normalize(uNormalMatrix * aNormal);
  vViewPosition = viewPosition.xyz;
  vLocalPosition = aPosition.xy;
  vCutMask = aCutMask;
  gl_Position = uProjection * viewPosition;
}
`;

const SOLID_FRAGMENT_SHADER = `
precision mediump float;

uniform vec3 uBodyColor;
uniform vec3 uRimColor;
uniform vec2 uBoltHoles[6];

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vLocalPosition;
varying float vCutMask;

void main() {
  if (vCutMask > 0.5) {
    if (length(vLocalPosition) < 54.0) {
      discard;
    }

    for (int i = 0; i < 6; i++) {
      if (distance(vLocalPosition, uBoltHoles[i]) < 16.0) {
        discard;
      }
    }
  }

  vec3 n = normalize(vNormal);
  vec3 v = normalize(-vViewPosition);
  vec3 mainLight = normalize(vec3(-0.55, 0.72, 0.42));
  vec3 fillLight = normalize(vec3(0.65, -0.22, 0.48));

  float mainDiffuse = max(dot(n, mainLight), 0.0);
  float fillDiffuse = max(dot(n, fillLight), 0.0);
  float rim = pow(1.0 - max(dot(n, v), 0.0), 2.35);

  vec3 color = uBodyColor * (0.34 + mainDiffuse * 0.78 + fillDiffuse * 0.22);
  color += uRimColor * rim * 0.58;
  color = min(color, vec3(1.0));

  gl_FragColor = vec4(color, 1.0);
}
`;

const LINE_VERTEX_SHADER = `
attribute vec3 aPosition;

uniform mat4 uModelView;
uniform mat4 uProjection;

void main() {
  gl_Position = uProjection * uModelView * vec4(aPosition, 1.0);
}
`;

const LINE_FRAGMENT_SHADER = `
precision mediump float;

uniform vec3 uLineColor;

void main() {
  gl_FragColor = vec4(uLineColor, 0.72);
}
`;

function buildGearPath() {
  const step = (Math.PI * 2) / TEETH;
  const points = [];

  for (let i = 0; i < TEETH; i++) {
    const a = i * step;
    points.push(
      pointOnCircle(R_ROOT, a + step * 0.08),
      pointOnCircle(R_OUTER, a + step * 0.2),
      pointOnCircle(R_OUTER, a + step * 0.38),
      pointOnCircle(R_ROOT, a + step * 0.5),
    );
  }

  return points;
}

function pointOnCircle(radius, angle) {
  return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)};
}

function createGearGeometry() {
  const outline = buildGearPath();
  const positions = [];
  const normals = [];
  const cutMasks = [];
  const indices = [];
  const linePositions = [];

  const addVertex = (x, y, z, nx, ny, nz, cutMask) => {
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    cutMasks.push(cutMask);
    return positions.length / 3 - 1;
  };

  const frontCenter = addVertex(0, 0, HALF_DEPTH, 0, 0, 1, 1);
  const front = outline.map((p) => addVertex(p.x, p.y, HALF_DEPTH, 0, 0, 1, 1));
  const backCenter = addVertex(0, 0, -HALF_DEPTH, 0, 0, -1, 1);
  const back = outline.map((p) => addVertex(p.x, p.y, -HALF_DEPTH, 0, 0, -1, 1));

  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    indices.push(frontCenter, front[i], front[next]);
    indices.push(backCenter, back[next], back[i]);
  }

  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    const p0 = outline[i];
    const p1 = outline[next];
    const edgeX = p1.x - p0.x;
    const edgeY = p1.y - p0.y;
    const normal = normalize2(edgeY, -edgeX);
    const v0 = addVertex(p0.x, p0.y, HALF_DEPTH, normal.x, normal.y, 0, 0);
    const v1 = addVertex(p1.x, p1.y, HALF_DEPTH, normal.x, normal.y, 0, 0);
    const v2 = addVertex(p1.x, p1.y, -HALF_DEPTH, normal.x, normal.y, 0, 0);
    const v3 = addVertex(p0.x, p0.y, -HALF_DEPTH, normal.x, normal.y, 0, 0);
    indices.push(v0, v1, v2, v0, v2, v3);
    addLine(linePositions, p0.x, p0.y, HALF_DEPTH, p1.x, p1.y, HALF_DEPTH);
    addLine(linePositions, p0.x, p0.y, -HALF_DEPTH, p1.x, p1.y, -HALF_DEPTH);
  }

  addHoleWall({
    addVertex,
    addLine: (...args) => addLine(linePositions, ...args),
    indices,
    centerX: 0,
    centerY: 0,
    radius: CENTER_HOLE_RADIUS,
    segments: 48,
  });

  for (const hole of BOLT_HOLES) {
    addHoleWall({
      addVertex,
      addLine: (...args) => addLine(linePositions, ...args),
      indices,
      centerX: hole.x,
      centerY: hole.y,
      radius: BOLT_HOLE_RADIUS,
      segments: 24,
    });
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    cutMasks: new Float32Array(cutMasks),
    indices: new Uint16Array(indices),
    lines: new Float32Array(linePositions),
    triangleCount: indices.length / 3,
  };
}

function addHoleWall({addVertex, addLine, indices, centerX, centerY, radius, segments}) {
  for (let i = 0; i < segments; i++) {
    const a0 = (Math.PI * 2 * i) / segments;
    const a1 = (Math.PI * 2 * (i + 1)) / segments;
    const p0 = pointOnCircle(radius, a0);
    const p1 = pointOnCircle(radius, a1);
    const n0 = normalize2(-p0.x, -p0.y);
    const n1 = normalize2(-p1.x, -p1.y);

    const x0 = centerX + p0.x;
    const y0 = centerY + p0.y;
    const x1 = centerX + p1.x;
    const y1 = centerY + p1.y;
    const v0 = addVertex(x0, y0, HALF_DEPTH, n0.x, n0.y, 0, 0);
    const v1 = addVertex(x0, y0, -HALF_DEPTH, n0.x, n0.y, 0, 0);
    const v2 = addVertex(x1, y1, -HALF_DEPTH, n1.x, n1.y, 0, 0);
    const v3 = addVertex(x1, y1, HALF_DEPTH, n1.x, n1.y, 0, 0);

    indices.push(v0, v2, v1, v0, v3, v2);
    addLine(x0, y0, HALF_DEPTH, x1, y1, HALF_DEPTH);
    addLine(x0, y0, -HALF_DEPTH, x1, y1, -HALF_DEPTH);
  }
}

function addLine(target, x0, y0, z0, x1, y1, z1) {
  target.push(x0, y0, z0, x1, y1, z1);
}

function normalize2(x, y) {
  const length = Math.hypot(x, y) || 1;
  return {x: x / length, y: y / length};
}

function createRenderer(canvas, initialPhase, reducedMotion) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    depth: true,
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  });

  if (!gl) {
    return null;
  }

  const solidProgram = createProgram(gl, SOLID_VERTEX_SHADER, SOLID_FRAGMENT_SHADER);
  const lineProgram = createProgram(gl, LINE_VERTEX_SHADER, LINE_FRAGMENT_SHADER);
  if (!solidProgram || !lineProgram) {
    return null;
  }

  const geometry = createGearGeometry();
  const buffers = {
    position: createArrayBuffer(gl, geometry.positions),
    normal: createArrayBuffer(gl, geometry.normals),
    cutMask: createArrayBuffer(gl, geometry.cutMasks),
    index: createIndexBuffer(gl, geometry.indices),
    line: createArrayBuffer(gl, geometry.lines),
  };

  const state = {
    disposed: false,
    visible: true,
    pageVisible: document.visibilityState !== 'hidden',
    raf: 0,
    width: 0,
    height: 0,
    dpr: 1,
    phase: reducedMotion ? 1 : phaseToTarget(initialPhase),
    phaseFrom: reducedMotion ? 1 : phaseToTarget(initialPhase),
    phaseTarget: reducedMotion ? 1 : phaseToTarget(initialPhase),
    phaseStartedAt: 0,
    lastTime: 0,
    spin: 0,
    pointerTargetX: 0,
    pointerTargetY: 0,
    pointerX: 0,
    pointerY: 0,
  };

  const solidLocations = {
    position: gl.getAttribLocation(solidProgram, 'aPosition'),
    normal: gl.getAttribLocation(solidProgram, 'aNormal'),
    cutMask: gl.getAttribLocation(solidProgram, 'aCutMask'),
    modelView: gl.getUniformLocation(solidProgram, 'uModelView'),
    projection: gl.getUniformLocation(solidProgram, 'uProjection'),
    normalMatrix: gl.getUniformLocation(solidProgram, 'uNormalMatrix'),
    bodyColor: gl.getUniformLocation(solidProgram, 'uBodyColor'),
    rimColor: gl.getUniformLocation(solidProgram, 'uRimColor'),
    boltHoles: gl.getUniformLocation(solidProgram, 'uBoltHoles[0]'),
  };
  const lineLocations = {
    position: gl.getAttribLocation(lineProgram, 'aPosition'),
    modelView: gl.getUniformLocation(lineProgram, 'uModelView'),
    projection: gl.getUniformLocation(lineProgram, 'uProjection'),
    color: gl.getUniformLocation(lineProgram, 'uLineColor'),
  };

  const render = (now) => {
    state.raf = 0;
    if (state.disposed || !state.visible || !state.pageVisible) {
      return;
    }

    if (!state.lastTime) {
      state.lastTime = now;
    }
    const dt = Math.min(now - state.lastTime, 64);
    state.lastTime = now;

    if (!reducedMotion) {
      state.spin = (state.spin + (dt / FULL_TURN_MS) * Math.PI * 2) % (Math.PI * 2);
      state.pointerX += (state.pointerTargetX - state.pointerX) * 0.08;
      state.pointerY += (state.pointerTargetY - state.pointerY) * 0.08;
      updatePhase(state, now);
    }

    drawScene(gl, geometry, buffers, solidProgram, lineProgram, solidLocations, lineLocations, state);

    if (!reducedMotion) {
      requestFrame(state, render);
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(1, Math.floor(rect.width * state.dpr));
    state.height = Math.max(1, Math.floor(rect.height * state.dpr));

    if (canvas.width !== state.width || canvas.height !== state.height) {
      canvas.width = state.width;
      canvas.height = state.height;
    }
    drawOnce();
  };

  const drawOnce = () => {
    if (!state.disposed && state.visible && state.pageVisible) {
      drawScene(gl, geometry, buffers, solidProgram, lineProgram, solidLocations, lineLocations, state);
    }
  };

  const start = () => {
    if (!reducedMotion) {
      requestFrame(state, render);
      return;
    }
    state.phase = 1;
    state.spin = -0.16;
    drawOnce();
  };

  const stop = () => {
    if (state.raf) {
      cancelAnimationFrame(state.raf);
      state.raf = 0;
    }
    state.lastTime = 0;
  };

  return {
    triangleCount: geometry.triangleCount,
    setPhase(nextPhase) {
      if (reducedMotion) {
        state.phase = 1;
        drawOnce();
        return;
      }

      const target = phaseToTarget(nextPhase);
      if (target === state.phaseTarget) {
        return;
      }
      state.phaseFrom = state.phase;
      state.phaseTarget = target;
      state.phaseStartedAt = performance.now();
      requestFrame(state, render);
    },
    setVisible(nextVisible) {
      state.visible = nextVisible;
      if (nextVisible && state.pageVisible) {
        start();
      } else {
        stop();
      }
    },
    setPageVisible(nextVisible) {
      state.pageVisible = nextVisible;
      if (nextVisible && state.visible) {
        start();
      } else {
        stop();
      }
    },
    setPointer(clientX, clientY, rect) {
      if (reducedMotion || !rect.width || !rect.height) {
        return;
      }
      state.pointerTargetX = clamp(((clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      state.pointerTargetY = clamp(((clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    },
    resetPointer() {
      state.pointerTargetX = 0;
      state.pointerTargetY = 0;
    },
    resize,
    start,
    dispose() {
      state.disposed = true;
      stop();
      gl.deleteBuffer(buffers.position);
      gl.deleteBuffer(buffers.normal);
      gl.deleteBuffer(buffers.cutMask);
      gl.deleteBuffer(buffers.index);
      gl.deleteBuffer(buffers.line);
      gl.deleteProgram(solidProgram);
      gl.deleteProgram(lineProgram);
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    },
  };
}

function drawScene(
  gl,
  geometry,
  buffers,
  solidProgram,
  lineProgram,
  solidLocations,
  lineLocations,
  state,
) {
  if (!state.width || !state.height) {
    return;
  }

  const aspect = state.width / state.height;
  const phase = state.phase;
  const model = composeModelMatrix(state.spin, phase, state.pointerX, state.pointerY);
  const view = translationMatrix(0, 0, -680);
  const modelView = multiplyMat4(view, model);
  const orthoSize = aspect >= 1 ? {x: 285 * aspect, y: 285} : {x: 285, y: 285 / aspect};
  const projection = mixMat4(
    orthoMatrix(-orthoSize.x, orthoSize.x, -orthoSize.y, orthoSize.y, 1, 1600),
    perspectiveMatrix(degToRad(34), aspect, 1, 1600),
    phase,
  );
  const normalMatrix = mat3FromMat4(modelView);

  gl.viewport(0, 0, state.width, state.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);

  gl.useProgram(solidProgram);
  bindAttribute(gl, buffers.position, solidLocations.position, 3);
  bindAttribute(gl, buffers.normal, solidLocations.normal, 3);
  bindAttribute(gl, buffers.cutMask, solidLocations.cutMask, 1);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
  gl.uniformMatrix4fv(solidLocations.modelView, false, modelView);
  gl.uniformMatrix4fv(solidLocations.projection, false, projection);
  gl.uniformMatrix3fv(solidLocations.normalMatrix, false, normalMatrix);
  gl.uniform3fv(solidLocations.bodyColor, OUTER_COLOR);
  gl.uniform3fv(solidLocations.rimColor, RUST_COLOR);
  gl.uniform2fv(solidLocations.boltHoles, BOLT_HOLE_UNIFORM);
  gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);

  gl.useProgram(lineProgram);
  bindAttribute(gl, buffers.line, lineLocations.position, 3);
  gl.uniformMatrix4fv(lineLocations.modelView, false, modelView);
  gl.uniformMatrix4fv(lineLocations.projection, false, projection);
  gl.uniform3fv(lineLocations.color, RUST_COLOR);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.LINES, 0, geometry.lines.length / 3);
  gl.disable(gl.BLEND);
}

function composeModelMatrix(spin, phase, pointerX, pointerY) {
  const lifted = easeOutCubic(phase);
  const tiltX = degToRad(58 * lifted + pointerY * 3.2 * lifted);
  const tiltY = degToRad(pointerX * 4.5 * lifted);
  const openingTurn = degToRad(-13 * lifted);
  const scale = 0.94 - lifted * 0.08;

  return multiplyMat4(
    scaleMatrix(scale, scale, scale),
    multiplyMat4(
      rotationYMatrix(tiltY),
      multiplyMat4(rotationXMatrix(tiltX), rotationZMatrix(spin + openingTurn)),
    ),
  );
}

function updatePhase(state, now) {
  if (state.phase === state.phaseTarget) {
    return;
  }

  const elapsed = now - state.phaseStartedAt;
  const progress = clamp(elapsed / PHASE_MS, 0, 1);
  const eased = easeOutCubic(progress);
  state.phase = state.phaseFrom + (state.phaseTarget - state.phaseFrom) * eased;

  if (progress >= 1) {
    state.phase = state.phaseTarget;
  }
}

function requestFrame(state, render) {
  if (!state.raf && !state.disposed) {
    state.raf = requestAnimationFrame(render);
  }
}

function phaseToTarget(phase) {
  return phase === 'plasko' ? 0 : 1;
}

function createArrayBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

function createIndexBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

function bindAttribute(gl, buffer, location, size) {
  if (location < 0) {
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function identityMatrix() {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function translationMatrix(x, y, z) {
  const out = identityMatrix();
  out[12] = x;
  out[13] = y;
  out[14] = z;
  return out;
}

function scaleMatrix(x, y, z) {
  const out = identityMatrix();
  out[0] = x;
  out[5] = y;
  out[10] = z;
  return out;
}

function rotationXMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
}

function rotationYMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

function rotationZMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function perspectiveMatrix(fov, aspect, near, far) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}

function orthoMatrix(left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  return new Float32Array([
    -2 * lr,
    0,
    0,
    0,
    0,
    -2 * bt,
    0,
    0,
    0,
    0,
    2 * nf,
    0,
    (left + right) * lr,
    (top + bottom) * bt,
    (far + near) * nf,
    1,
  ]);
}

function multiplyMat4(a, b) {
  const out = new Float32Array(16);

  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      out[col * 4 + row] =
        a[0 * 4 + row] * b[col * 4 + 0] +
        a[1 * 4 + row] * b[col * 4 + 1] +
        a[2 * 4 + row] * b[col * 4 + 2] +
        a[3 * 4 + row] * b[col * 4 + 3];
    }
  }

  return out;
}

function mixMat4(a, b, t) {
  const out = new Float32Array(16);
  for (let i = 0; i < 16; i++) {
    out[i] = a[i] + (b[i] - a[i]) * t;
  }
  return out;
}

function mat3FromMat4(m) {
  return new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

export function getZebatka3DTriangleCount() {
  return TRIANGLE_COUNT;
}

export default function Zebatka3D({faza = 'bryla', className}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const fazaRef = useRef(faza);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    fazaRef.current = faza;
    rendererRef.current?.setPhase(faza);
  }, [faza]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root || unavailable) {
      return undefined;
    }

    let disposed = false;
    let idleId = 0;
    let fallbackId = 0;
    let resizeObserver;
    let intersectionObserver;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointerFine = window.matchMedia('(pointer: fine)').matches;

    const boot = () => {
      if (disposed) {
        return;
      }

      const renderer = createRenderer(canvas, fazaRef.current, reducedMotion);
      if (!renderer) {
        setUnavailable(true);
        return;
      }

      rendererRef.current = renderer;
      renderer.resize();
      renderer.start();

      resizeObserver = new ResizeObserver(() => renderer.resize());
      resizeObserver.observe(root);

      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver(
          ([entry]) => renderer.setVisible(Boolean(entry?.isIntersecting)),
          {threshold: 0.01},
        );
        intersectionObserver.observe(root);
      }
    };

    const onVisibilityChange = () => {
      rendererRef.current?.setPageVisible(document.visibilityState !== 'hidden');
    };
    const onPointerMove = (event) => {
      rendererRef.current?.setPointer(event.clientX, event.clientY, root.getBoundingClientRect());
    };
    const onPointerLeave = () => {
      rendererRef.current?.resetPointer();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    if (pointerFine) {
      root.addEventListener('pointermove', onPointerMove);
      root.addEventListener('pointerleave', onPointerLeave);
    }

    // Header strony powinien wygrac z WebGL-em w pierwszej kolejce pracy.
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(boot, {timeout: 200});
    } else {
      fallbackId = window.setTimeout(boot, 200);
    }

    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (fallbackId) {
        window.clearTimeout(fallbackId);
      }
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [unavailable]);

  if (unavailable) {
    return null;
  }

  return (
    <div ref={rootRef} className={[styles.root, className].filter(Boolean).join(' ')}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
