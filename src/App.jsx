import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls, useGLTF } from "@react-three/drei";
import printers from "./assets/printers.json";
import Printer from "./Components/Printer";
import Info from "./Components/Info";
import Background from "./Components/Background";
import { Desk } from "./Components/Desk";
import { useControls } from "leva";
import { create } from "zustand";

/* This is a helper function for lights */
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

export const usePrinterStore = create((set) => ({
  printer: {name: "", link: "", key: ""},
  setPrinter: (newState) => set((state) => {
    return {printer: newState}
  }),
}))

function App() {
  const states = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  const cameraRef = useRef();

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
          position: [64, 50, -72],
          // position: [0, 25, -80]
        }}
      >
        <color attach="background" args={["#f7f3e6"]} />
        
        <CameraControls ref={cameraRef} />
        <ambientLight intensity={2} color="#e9e5dc" />
        <Desk position={[-16, 4.5, 8.5]} />
        <Desk position={[-8, 4.5, -8.5]} rotation={[0, Math.PI / 2, 0]} />
        <Background />
        {printers.map((printer, index) => (
          <Printer
            key={printer.apiKey}
            setActive={states[index][1]}
            cameraRef={cameraRef}
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

      {/* {printers.map(({ name, link }, index) => (
        <Info
          name={name}
          link={link}
          active={states[index][0]}
          setActive={states[index][1]}
          key={index}
        />
      ))} */}
    </>
  );
}

export default App;
