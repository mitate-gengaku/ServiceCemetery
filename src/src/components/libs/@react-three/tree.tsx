"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import { TREE_POSITIONS } from "@/config/tree";

export const Tree = (props: ThreeElements["group"]) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Tree-2.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <group {...props} ref={groupRef} castShadow>
      {TREE_POSITIONS.map(({ position, scale }, index) => {
        const clonedScene = scene.clone(true);

        clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        return (
          <group key={index} position={position} castShadow receiveShadow>
            <primitive object={clonedScene} scale={scale} />
          </group>
        );
      })}
    </group>
  );
};
