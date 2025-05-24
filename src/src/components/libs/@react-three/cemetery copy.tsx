"use client";

import { useGLTF, useCursor } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { type ReactNode, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { CEMETERY_POSITIONS } from "@/config/cemetery";
import { type Project } from "@/types/project";
import { convertTags } from "@/utils/convert-tags";

interface Props {
  projects: Project[];
  children?: ReactNode;
  clicked: boolean;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Cemetery = ({ projects, children, clicked, setSelectIndex, setClicked }: Props) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Cemetary.glb");
  const [diffuseMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/rock_01_diff_4k.jpg",
    "/textures/rock_01_nor_gl_4k.jpg",
    "/textures/rock_01_rough_4k.jpg",
  ]);
  const mergedProjects = useMemo(() => {
    const convertedProjectTags = convertTags(projects);

    const mergedPositionProjects = convertedProjectTags.map((project, i) => ({
      ...project,
      position: CEMETERY_POSITIONS[i].position,
    }));

    return mergedPositionProjects;
  }, [projects]);

  useCursor(clicked);
  useCursor(hovered);

  return (
    <group ref={groupRef}>
      {mergedProjects.map(({ position }, i) => {
        const clonedScene = scene.clone(true);

        return (
          <group position={position} key={i} castShadow>
            <mesh
              position={[0, -0.5, 0]}
              receiveShadow
              castShadow
              onClick={(e) => (e.stopPropagation(), setClicked(true), setSelectIndex(i))}
              onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
              onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
            >
              <boxGeometry args={[5, 0.5, 4]} />
              <meshStandardMaterial
                map={diffuseMap}
                normalMap={normalMap}
                aoMap={roughnessMap}
                roughnessMap={roughnessMap}
                roughness={1}
              />
            </mesh>
            <group position={[0, 0.25, 0]} scale={2} castShadow>
              <primitive object={clonedScene} />
            </group>
          </group>
        );
      })}
      {mergedProjects && <>{children}</>}
    </group>
  );
};
