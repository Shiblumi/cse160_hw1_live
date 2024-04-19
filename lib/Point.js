class Point {
  constructor([x, y], color, size) {
    this.xy = [x, y];
    this.rgba = color;
    this.size = size;
  }

  render() {
    console.log("Rendering Point at  " + this.xy);

    gl.disableVertexAttribArray(a_Position);

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, this.xy[0], this.xy[1], 0.0);

    // Pass the size of a point to u_PointSize variable
    gl.uniform1f(u_PointSize, this.size);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(
      u_FragColor,
      this.rgba[0] / 255,
      this.rgba[1] / 255,
      this.rgba[2] / 255,
      this.rgba[3] / 255
    );

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
