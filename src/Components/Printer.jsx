import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState, useRef } from "react";
import { BoxHelper, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const colorMap = {
  Operational: "green",
  Printing: "red",
  "Not Connected": "red",
};

// this will load a OBJLoader file, we can also load other file types
const Printer = ({
  file,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  link,
  apiKey,
  setActive,
  debug = false,
}) => {
  const printer = useLoader(OBJLoader, file);
  const clone = useMemo(() => printer.clone(), [printer]);

  const [hovered, setHovered] = useState(false);
  const [state, setState] = useState("Operational");

  const { scene } = useThree();
  const boxRef = useRef();

  useEffect(() => {
    clone.position.set(...position);
    clone.rotation.set(...rotation);
    clone.scale.set(...scale);

    const helper = new BoxHelper(clone, 0xffffff);
    boxRef.current = helper;
    scene.add(helper);

    const getData = async () => {
      if (link === undefined || apiKey === undefined) setState("Not Connected");

      try {
        const response = await fetch(`${link}/api/job`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-key": apiKey,
          },
        }).then((res) => res.json());

        setState(response.state);
      } catch (error) {
        setState("Not Connected");
      }
    };

    getData();

    return () => {
      scene.remove(helper);
    };
  }, []);

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: colorMap[state] || "red",
          transparent: state !== "Operational",
          opacity: state === "Operational" ? 1 : 0.5,
        });
      }
    });
  }, [state]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.visible = hovered;
      if (hovered) boxRef.current.update();
    }
  }, [hovered]);

  return (
    <>
      <primitive
        castshadow
        onClick={(e) => {
          setActive(true);
        }}
        object={clone}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      />
    </>
  );
};

export default Printer;
