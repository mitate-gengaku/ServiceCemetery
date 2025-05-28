"use client";

import { useGLTF } from "@react-three/drei";
import React from "react";

export const GraveStone = () => {
  const { scene } = useGLTF("/models/Gravestone.glb");

  return (
    <group position={[0, 2.5, -45]} scale={0.046875} castShadow>
      <primitive object={scene} />
    </group>
  );
};
