import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function DebugDesk() {
  const controls = useControls({
    position: { value: [0, 0, 0], step: 0.1 },
    scale: { value: 1, step: 0.05 },
    rotation: { value: [0, 0, 0], step: Math.PI / 180, min: 0, max: Math.PI * 2 },
  });

  return (
    <Desk {...controls} />
  )
}

export function Desk({position, rotation = [0, 0, 0], scale=0.1}) {
  const { nodes, materials } = useGLTF("/desk.glb");

  return (
    <group
      dispose={null}
      position={position}
      rotation={rotation}
      scale={scale}
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
