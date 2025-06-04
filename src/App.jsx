import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import printers from "./assets/printers.json";
import Printer from "./Components/Printer";
import Info from "./Components/Info";
import Background from "./Components/Background";
import { Desk } from "./Components/Desk";
import { useControls } from "leva";

function XL(props) {
  const { nodes, _ } = useGLTF("/xl.glb");
  const { position, rotation, scale } = useControls({
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, 0, 0], step: Math.PI / 180 },
    scale: { value: 1, step: 0.01 },
  });

  return (
    <group
      {...props}
      dispose={null}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Prusa_XL.geometry}
        material={nodes.Prusa_XL.material}
        rotation={[-0.002, -0.169, 0.004]}
        scale={0.14}
      />
    </group>
  );
}

useGLTF.preload("/xl.glb");

export const Light = ({ target }) => {
  const directionalLightRef = useRef();

  const { positionLight, colorLight, distance, angle, penumbra, intensity } =
    useControls({
      positionLight: { value: [-5.5, 21.3, 5.5], step: 0.1 },
      colorLight: { value: "#fafafa" },
      distance: { value: 100, step: 1 },
      angle: { value: Math.PI / 4, step: Math.PI / 180 },
      penumbra: { value: 0.5, step: 0.01 },
      intensity: { value: 10, step: 0.1 },
    });

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={positionLight}
        color={colorLight}
        intensity={intensity}
        angle={angle}
        target-position={[8, 3, 16]}
        penumbra={penumbra}
        distance={distance}
        castShadow
      />
      {directionalLightRef.current && (
        <directionalLightHelper
          position={positionLight}
          args={[directionalLightRef.current]}
        />
      )}
    </>
  );
};

function App() {
  const states = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
          position: [64, 50, -72],
        }}
      >
        <color attach="background" args={["#f7f3e6"]} />

        <ambientLight intensity={2} color="#e9e5dc" />
        <Desk position={[-16, 4.5, 8.5]} />
        <Desk position={[-8, 4.5, -8.5]} rotation={[0, Math.PI / 2, 0]} />
        <Background />
        {printers.map((printer, index) => (
          <Printer
            key={printer.apiKey}
            setActive={states[index][1]}
            {...printer}
          />
        ))}
        <OrbitControls
          zoomToCursor={true}
          enablePan={true}
          enableZoom={true}
          maxDistance={100}
        />
      </Canvas>

      {printers.map(({ name, link }, index) => (
        <Info
          name={name}
          link={link}
          active={states[index][0]}
          setActive={states[index][1]}
          key={index}
        />
      ))}
    </>
  );
}

export default App;
