import { extend, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useState, useRef } from "react";
import { BoxHelper, MeshStandardMaterial } from "three";
import {
  DRACOLoader,
  GLTFLoader,
  OBJLoader,
} from "three/examples/jsm/Addons.js";

const Item = ({
  file,
  type = "gltf",
  position = [0, 0, 0],
  scale = [0, 0, 0],
  rotation = [0, 0, 0],
  debug = false,
}) => {
  const { debugPosition, debugScale, debugRotation } = useControls({
    debugPosition: { value: [0, 0, 0], step: 0.1 },
    debugScale: { value: [1, 1, 1], step: 0.1 },
    debugRotation: { value: [0, 0, 0], step: 0.1, min: 0, max: Math.PI * 2 },
  });
  const item = useLoader(GLTFLoader, file);
  const clone = useMemo(() => item.clone(), [item]);

  // useEffect(() => {
  //   if (debug) {
  //     clone.scale.set(...debugScale);
  //     clone.position.set(...debugPosition);
  //     clone.rotation.set(...debugRotation);
  //   } else {
  //     clone.scale.set(...scale);
  //     clone.position.set(...position);
  //     clone.rotation.set(...rotation);
  //   }
  // }, []);

  return <primitive object={clone} />;
};

export default Item;
