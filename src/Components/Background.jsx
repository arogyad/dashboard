import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { TextureLoader } from "three";

const Wall0 = () => {
  return (
    <>
      <mesh position={[8, 17, 9]} receiveShadow castShadow>
        <boxGeometry args={[50, 25, 1]} />
        {/* Default material for all faces */}
        <directionalLight
          castShadow
          position={[-30.0, 10.0, -30.0]}
          shadow-mapSize={[1024, 1024]}
          intensity={10}
          color={"#fed33c"}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-15.3, 26.0, 40, -30]}
          />
        </directionalLight>
        <meshStandardMaterial emissive={"gray"} color="white" />
      </mesh>
    </>
  );
};

const Wall1 = () => {
  return (
    <mesh position={[-16.5, 17, -16.5]} receiveShadow castShadow>
      <boxGeometry args={[1, 25, 50]} />
      <meshStandardMaterial emissive={"gray"} color="white" />
    </mesh>
  );
};

const Base = () => {
  const colorMap = useLoader(TextureLoader, "88843.jpg");
  return (
    <mesh position={[8, 4, -16]} receiveShadow>
      <boxGeometry args={[50, 1, 51]} />
      <meshStandardMaterial map={colorMap} displacementScale={0.2} />
    </mesh>
  );
};

const BasePlane = () => {
  return (
    <mesh position={[8, 3, -16]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial emissive={"#e9e5dc"} color="#e9e5dc" />
    </mesh>
  );
};

const Background = () => {
  return (
    <>
      <Wall0 />
      <Wall1 />
      <Base />
      <BasePlane />
    </>
  );
};

export default Background;
