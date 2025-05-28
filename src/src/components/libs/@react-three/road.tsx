"use client";

import { useGLTF } from "@react-three/drei";
import { type ThreeElements } from "@react-three/fiber";
import React, { useRef } from "react";

import type * as THREE from "three";

import { ROAD_POSITIONS } from "@/config/road";

export const Road = (props: ThreeElements["group"]) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Rock_Path_Round_Thin.glb");

  return (
    <group {...props} ref={groupRef}>
      {ROAD_POSITIONS.map((pos, index) => {
        const clonedScene = scene.clone(true);

        return (
          <group key={index} position={pos.position}>
            <primitive object={clonedScene} scale={2.25} />
          </group>
        );
      })}
    </group>
  );
};
