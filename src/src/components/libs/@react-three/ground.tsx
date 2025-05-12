"use client";

import { useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export const Ground = () => {
  const [diffuseMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/forrest_ground_01_diff_4k.jpg",
    "/textures/forrest_ground_01_nor_gl_4k.jpg",
    "/textures/forrest_ground_01_rough_4k.jpg",
  ]);

  React.useEffect(() => {
    if (diffuseMap && normalMap && roughnessMap) {
      [diffuseMap, normalMap, roughnessMap].forEach((texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(100, 100);
        texture.anisotropy = 16;
        texture.needsUpdate = true;
      });
    }
  }, [diffuseMap, normalMap, roughnessMap]);

  useLoader.preload(THREE.TextureLoader, [
    "/textures/forrest_ground_01_diff_4k.jpg",
    "/textures/forrest_ground_01_nor_gl_4k.jpg",
    "/textures/forrest_ground_01_rough_4k.jpg",
  ]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <shadowMaterial transparent />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          map={diffuseMap}
          normalMap={normalMap}
          aoMap={roughnessMap}
          roughnessMap={roughnessMap}
          roughness={1}
          transparent
          opacity={0.95}
        />
      </mesh>
    </>
  );
};
