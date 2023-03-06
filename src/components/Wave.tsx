import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { BufferAttribute, Mesh, PlaneGeometry, Vector2 } from "three";

const noise3D = createNoise3D();

type Props = {
  color?: number;
  segments?: number;
  y?: number;
};
const Wave = ({ color = 0xa23deb, segments = 100, y = -4 }: Props) => {
  const meshRef = useRef<Mesh>(null!);
  const geoRef = useRef<PlaneGeometry>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.1;
    const g = geoRef.current;
    const v2 = new Vector2();
    for (let i = 0; i < g.attributes.position.count; i++) {
      const uvAttr = g.getAttribute("uv") as BufferAttribute;
      v2.fromBufferAttribute(uvAttr, i)
        .addScalar(timeRef.current * 0.1)
        .multiplyScalar(20);

      const h = noise3D(v2.x, v2.y, timeRef.current);
      // @ts-ignore
      g.attributes.position.setZ(i, h);
    }

    g.computeVertexNormals();
    g.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, y, 0]}
      >
        <planeGeometry ref={geoRef} args={[100, 100, segments, segments]} />
        <meshStandardMaterial wireframe color={color} />
      </mesh>
    </group>
  );
};

export default Wave;
