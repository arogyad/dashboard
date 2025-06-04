import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function Desk(props) {
  const { nodes, materials } = useGLTF("/desk.glb");

  return (
    <group
      {...props}
      dispose={null}
      position={props.position}
      rotation={props.rotation || [0, 0, 0]}
      scale={0.1}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.desk_1.geometry}
          material={materials.ACI_6}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.desk_2.geometry}
          material={materials.ACI_1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.desk_3.geometry}
          material={materials.ACI_40}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/desk.glb");
