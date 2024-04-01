/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import initShader from "./initShader";
import styles from "./app.module.scss";

const VERTEX_SHADER = /*glsl*/ `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

const FRAGMENT_SHADER = /*glsl*/ `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const App: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const gl = canvasRef.current?.getContext("webgl");
  React.useEffect(() => {
    if (gl) {
      const program = initShader(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      const aPosition = gl.getAttribLocation(program, "aPosition");
      const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPosition);
      gl.drawArrays(gl.POINTS, 0, 3);
    }
  }, []);
  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default App;
