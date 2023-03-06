import { AudioAnalyzer } from "../lib/audio";
import { Color } from "three";
import { extendMeshLine } from "../lib/meshline";
import { useRef } from "react";
import { MeshLineGeometry } from "meshline";
import { useFrame } from "@react-three/fiber";
import { normalizeBetween, radians } from "../lib/math";

extendMeshLine();

type Prop = {
  analyzer: AudioAnalyzer;
  lineWidth?: number;
  color?: number;
  segments?: number;
  height?: number;
  radius?: number;
};

export default function Visualizer({
  analyzer,
  lineWidth = 0.04,
  color = 0xffffff,
  segments = 100,
  height = 1,
  radius = 2,
}: Prop) {
  const lineRef = useRef<MeshLineGeometry>(null);
  useFrame(() => {
    console.log(height);
    if (!analyzer) return;
    const fft = analyzer.getFft();
    const points: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = i * (360 / segments);
      const theta = radians(angle);
      const value =
        normalizeBetween(fft[i < segments ? i : 0], 0, 255) * height * 2;
      const x = (radius + value) * Math.cos(theta);
      const y = -(radius + value) * Math.sin(theta);
      points.push(x, y, 0);
    }
    lineRef.current?.setPoints(points);
  });

  return (
    <mesh>
      <meshLineGeometry
        ref={lineRef}
        attach="geometry"
        points={[0, 0, 0, 1, 0, 0, 1, 1, 0]}
      />
      <meshLineMaterial
        attach="material"
        lineWidth={lineWidth}
        color={new Color(color)}
      />
    </mesh>
  );
}
