"use client";

import { OrbitControls, Loader, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import { Cemetery } from "@/components/libs/@react-three/cemetery";
import { GraveStone } from "@/components/libs/@react-three/grave-stone";
import { Ground } from "@/components/libs/@react-three/ground";
import { Road } from "@/components/libs/@react-three/road";
import { Tree } from "@/components/libs/@react-three/tree";

export const MainCanvas = () => (
  <>
    <Loader />
    <Canvas
      shadows
      camera={{
        position: [-40, 50, 50],
        fov: 55,
        near: 0.1,
        far: 1000,
      }}
      className="min-h-screen md:min-h-[calc(100%-64px)]"
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[0, 250, 0]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-far={300}
        shadow-bias={-0.0005}
      />
      <spotLight
        position={[0, 10, -35]}
        angle={0.8}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        shadow-camera-near={1}
        shadow-camera-far={50}
        distance={60}
        decay={2}
      />
      <Suspense>
        <Sky
          sunPosition={[5, 100, -100]}
          inclination={0.49}
          azimuth={0.25}
          rayleigh={0.5}
          turbidity={8}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        <group castShadow>
          <Tree />
          <GraveStone />
          <Road />
          <Ground />
          <Cemetery />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={65}
          target={[0, 0, 0]}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      </Suspense>
    </Canvas>
  </>
);
