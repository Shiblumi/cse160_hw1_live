class Circle {
  constructor([x, y], rgba, size, segments) {
    this.position = [x, y, 0.0];
    this.color = rgba;
    this.size = size;
    this.segments = segments;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(
      u_FragColor,
      rgba[0] / 255,
      rgba[1] / 255,
      rgba[2] / 255,
      rgba[3] / 255
    );

    // Draw
    // Credit for circle calculations: Professor James Davis
    var d = this.size / 200.0; // delta

    let angleStep = 360 / this.segments;
    for (var angle = 0; angle < 360; angle = angle + angleStep) {
      let centerPt = [xy[0], xy[1]];
      let angle1 = angle;
      let angle2 = angle + angleStep;
      let vec1 = [
        Math.cos((angle1 * Math.PI) / 180) * d,
        Math.sin((angle1 * Math.PI) / 180) * d,
      ];
      let vec2 = [
        Math.cos((angle2 * Math.PI) / 180) * d,
        Math.sin((angle2 * Math.PI) / 180) * d,
      ];
      let pt1 = [centerPt[0] + vec1[0], centerPt[1] + vec1[1]];
      let pt2 = [centerPt[0] + vec2[0], centerPt[1] + vec2[1]];

      this.drawTriangle([xy[0], xy[1], pt1[0], pt1[1], pt2[0], pt2[1]]);
    }
  }

  drawTriangle(vertices) {
    console.log("Rendering Circle at  " + this.xy);

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
