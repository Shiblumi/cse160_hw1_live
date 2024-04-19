// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
// Documentation for functions created by Github Copilot's /doc command

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_PointSize;
  }
`;

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

var g_shape = "square";
function main() {
  setupWebGL();
  connectVariablesToGLSL();

  // Initialize event handlers
  document.getElementById("btn-clear-canvas").addEventListener("click", () => {
    shapes_to_render = [];
    renderAllShapes();
  });
  document.getElementById("btn-square").addEventListener("click", () => {
    g_shape = "square";
  });
  document.getElementById("btn-triangle").addEventListener("click", () => {
    g_shape = "triangle";
  });
  document.getElementById("btn-circle").addEventListener("click", () => {
    g_shape = "circle";
  });

  canvas.onmousedown = (ev) => {
    click(ev);
  };

  canvas.onmousemove = (ev) => {
    if (ev.buttons === 1) click(ev);
  };

  clearCanvas();
}


/**
 * Sets up the WebGL context for rendering.
 */
function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl");

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
}


/**
 * Connects variables to GLSL shaders.
 */
function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }

  // Get the storage location of attribute and uniform variables
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }
  u_PointSize = gl.getUniformLocation(gl.program, "u_PointSize");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of u_PointSize");
    return;
  }
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }
}

/**
 * Renders all shapes on the canvas.
 */
function renderAllShapes() {
  var len = shapes_to_render.length;
  if (len == 0) {
    clearCanvas();
    console.log("No shapes to render");
  }
  for (var i = 0; i < len; i++) {
    shapes_to_render[i].render();
  }
  shapes_to_render = [];
}


/**
 * Handles the click event on the canvas.
 * Retrieves the mouse coordinates, adjusts them relative to the canvas size,
 * and stores the color settings and shape size for the point to be rendered.
 * Finally, adds the shape to the list of shapes to be rendered and triggers a redraw.
 * @param {MouseEvent} ev - The click event object.
 */
var shapes_to_render = [];
var g_colors = [];
function click(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  // Adjust the mouse coordinates to be relative to the canvas size
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  console.log("x,y = " + x + ", " + y);

  // Store slider values for size, rgba, and segment count
  var pointSize = document.getElementById("slider-shape-size").value;
  var r = document.getElementById("slider-red").value;
  var g = document.getElementById("slider-green").value;
  var b = document.getElementById("slider-blue").value;
  var a = document.getElementById("slider-alpha").value;
  var rgba = [r, g, b, a];
  var segments = document.getElementById("slider-segment-count").value;

  console.log("shape = " + g_shape);
  switch (g_shape) {
    case "triangle":
      shapes_to_render.push(new Triangle([x, y], rgba, pointSize));
      break;
    case "square":
      shapes_to_render.push(new Point([x, y], rgba, pointSize));
      break;
    case "circle":
      shapes_to_render.push(new Circle([x, y], rgba, pointSize, segments));
      break;
  }
  renderAllShapes();
}


/**
 * Clears the canvas by setting the clear color and clearing the color buffer.
 */
function clearCanvas() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}