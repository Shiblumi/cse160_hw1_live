class Triangle {
  constructor([x, y], rgba, size) {
    this.xy = [x, y];
    this.rgba = rgba;
    this.size = size;
  }

  render() {
    console.log("Rendering Triangle at  " + this.xy);
    var pos = this.xy;

    gl.uniform4f(
      u_FragColor,
      this.rgba[0] / 255,
      this.rgba[1] / 255,
      this.rgba[2] / 255,
      this.rgba[3] / 255
    );

    gl.uniform1f(u_PointSize, this.size);

    var d = this.size / 200.0;
    this.drawTriangle([pos[0], pos[1], pos[0] + d, pos[1], pos[0], pos[1] + d]);
  }

  drawTriangle(vertices) {
    var n = 3; // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // clearCanvas();

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }
}
