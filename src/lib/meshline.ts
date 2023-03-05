import { extend, Object3DNode } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// This code is extending the functionality of the @react-three/fiber library to
// include the MeshLineGeometry and MeshLineMaterial classes from the meshline library.

// The declare global block is declaring global namespace for JSX elements,
// which allows us to use JSX syntax to create instances of meshLine and meshLineMaterial components.

// The extendMeshLine function is then using the extend method from @react-three/fiber to add
// the MeshLineGeometry and MeshLineMaterial classes to the list of supported Three.js classes.

// Overall, this code is providing a way to use the meshline library to create line geometries and materials
// in a Three.js scene using JSX syntax.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}

export function extendMeshLine() {
  extend({ MeshLineGeometry, MeshLineMaterial });
}
