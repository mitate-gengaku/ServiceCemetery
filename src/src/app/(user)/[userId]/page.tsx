"use client";

import { OrbitControls, useGLTF, Loader, useCursor, Sky, Html } from "@react-three/drei";
import { Canvas, useLoader, ThreeElements, Vector3 } from "@react-three/fiber";
import { InfoIcon, PackagePlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Ground = () => {
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

  if (!diffuseMap || !normalMap || !roughnessMap) return null;

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

const ProgressChart = () => {
  const segments = [
    { value: 55, color: "#3B82F6", start: 0, end: 55, language: "JavaScript" },
    { value: 30, color: "#22C55E", start: 55, end: 85, language: "HTML" },
    { value: 15, color: "#A855F7", start: 85, end: 100, language: "CSS" },
  ];

  const markers = [0, 25, 50, 75, 100];

  return (
    <div className="cursor-default">
      <div className="flex justify-between mb-2">
        {markers.map((marker, index) => (
          <div key={index} className="text-xs font-medium text-gray-700">
            {marker}
          </div>
        ))}
      </div>

      <div className="relative h-2 flex rounded-full overflow-hidden">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              backgroundColor: segment.color,
              width: `${segment.value}%`,
            }}
          />
        ))}
      </div>

      <ul className="py-2 flex items-center gap-4">
        {segments.map(({ value, color, language }, i) => (
          <li className="flex items-center gap-1 text-sm font-semibold" key={`${language}-${i}`}>
            <p
              className="size-2 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />
            {language}
            <p className="font-normal text-sm text-muted-foreground">{value}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cemetary = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Cemetary.glb");
  const [diffuseMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/rock_01_diff_4k.jpg",
    "/textures/rock_01_nor_gl_4k.jpg",
    "/textures/rock_01_rough_4k.jpg",
  ]);
  const positions: { position: Vector3 }[] = [
    { position: [-10, 0.25, -40] },
    { position: [-20, 0.25, -40] },
    { position: [-30, 0.25, -40] },
    { position: [-40, 0.25, -40] },
    { position: [-10, 0.25, -32] },
    { position: [-20, 0.25, -32] },
    { position: [-30, 0.25, -32] },
    { position: [-40, 0.25, -32] },
    { position: [-10, 0.25, -18] },
    { position: [-20, 0.25, -18] },
    { position: [-30, 0.25, -18] },
    { position: [-40, 0.25, -18] },
    { position: [-10, 0.25, -8] },
    { position: [-20, 0.25, -8] },
    { position: [-30, 0.25, -8] },
    { position: [-40, 0.25, -8] },
    { position: [-10, 0.25, 2] },
    { position: [-20, 0.25, 2] },
    { position: [-30, 0.25, 2] },
    { position: [-40, 0.25, 2] },
    { position: [-10, 0.25, 12] },
    { position: [-20, 0.25, 12] },
    { position: [-30, 0.25, 12] },
    { position: [-40, 0.25, 12] },
    { position: [-10, 0.25, 20] },
    { position: [-20, 0.25, 20] },
    { position: [-30, 0.25, 20] },
    { position: [-40, 0.25, 20] },
    { position: [-10, 0.25, 32] },
    { position: [-20, 0.25, 32] },
    { position: [-30, 0.25, 32] },
    { position: [-40, 0.25, 32] },
    { position: [-10, 0.25, 42] },
    { position: [-20, 0.25, 42] },
    { position: [-30, 0.25, 42] },
    { position: [-40, 0.25, 42] },

    //
    { position: [10, 0.25, -40] },
    { position: [20, 0.25, -40] },
    { position: [30, 0.25, -40] },
    { position: [40, 0.25, -40] },
    { position: [10, 0.25, -32] },
    { position: [20, 0.25, -32] },
    { position: [30, 0.25, -32] },
    { position: [40, 0.25, -32] },
    { position: [10, 0.25, -18] },
    { position: [20, 0.25, -18] },
    { position: [30, 0.25, -18] },
    { position: [40, 0.25, -18] },
    { position: [10, 0.25, -8] },
    { position: [20, 0.25, -8] },
    { position: [30, 0.25, -8] },
    { position: [40, 0.25, -8] },
    { position: [10, 0.25, 2] },
    { position: [20, 0.25, 2] },
    { position: [30, 0.25, 2] },
    { position: [40, 0.25, 2] },
    { position: [10, 0.25, 12] },
    { position: [20, 0.25, 12] },
    { position: [30, 0.25, 12] },
    { position: [40, 0.25, 12] },
    { position: [10, 0.25, 20] },
    { position: [20, 0.25, 20] },
    { position: [30, 0.25, 20] },
    { position: [40, 0.25, 20] },
    { position: [10, 0.25, 32] },
    { position: [20, 0.25, 32] },
    { position: [30, 0.25, 32] },
    { position: [40, 0.25, 32] },
    { position: [10, 0.25, 42] },
    { position: [20, 0.25, 42] },
    { position: [30, 0.25, 42] },
    { position: [40, 0.25, 42] },
  ];

  useCursor(clicked);
  useCursor(hovered);

  return (
    <group ref={groupRef}>
      {positions.map(({ position }, i) => {
        const clonedScene = scene.clone(true);

        return (
          <group position={position} key={i} castShadow>
            <mesh
              position={[0, -0.5, 0]}
              receiveShadow
              castShadow
              onClick={(e) => (e.stopPropagation(), setClicked(true))}
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
      <Html>
        <Dialog open={clicked} onOpenChange={setClicked}>
          <DialogContent className="xl:min-w-4xl xl:max-w-4xl font-geist-sans">
            <DialogHeader>
              <DialogTitle>プロジェクトタイトル</DialogTitle>
              <DialogDescription>「プロジェクトタイトル」の情報</DialogDescription>
            </DialogHeader>
            <div>
              <Tabs defaultValue="detail">
                <TabsList>
                  <TabsTrigger value="detail">基本情報</TabsTrigger>
                  <TabsTrigger value="introspection">反省点</TabsTrigger>
                  <TabsTrigger value="ai">AI解析</TabsTrigger>
                </TabsList>
                <TabsContent value="detail">
                  <div className="py-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">プロジェクト名</p>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">プロジェクトタイトル</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">プロジェクトの概要</p>
                      <p className="text-sm tracking-tight">
                        いえ、氷山にぶっつかって船が沈みましてね……その人はしばらく棚をさがしてもむだだああ、どうか。ザネリはうちへ連れられてったジョバンニは言いながら、まるであんな女の子とばかり談しているうちに、もうそれをたべていました。六時がうってしばらくたったころ、ジョバンニは思わず、ほう、と叫びました。僕たちしっかりやろうねえジョバンニが左手をつき出して窓から前の方で誰かとしよりらしい人の、影もなかったのだ。
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">言語</p>
                      <ProgressChart />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">リポジトリのリンク</p>
                      <Link
                        href={`https://github.com/`}
                        className="font-semibold tracking-tight hover:text-emerald-600"
                      >
                        プロジェクトタイトル
                      </Link>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="introspection">
                  <div className="py-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">終了した理由</p>
                      <p className="text-sm tracking-tight">
                        いえ、氷山にぶっつかって船が沈みましてね……その人はしばらく棚をさがしてもむだだああ、どうか。ザネリはうちへ連れられてったジョバンニは言いながら、まるであんな女の子とばかり談しているうちに、もうそれをたべていました。六時がうってしばらくたったころ、ジョバンニは思わず、ほう、と叫びました。僕たちしっかりやろうねえジョバンニが左手をつき出して窓から前の方で誰かとしよりらしい人の、影もなかったのだ。
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">タグ</p>
                      <div className="flex items-center flex-wrap gap-2">
                        <Badge className="cursor-pointer bg-emerald-500 hover:bg-emerald-600">未完成</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="ai">
                  <div className="py-8 flex items-center justify-center flex-col gap-4">
                    <Button type="button" className="bg-emerald-500 hover:bg-blur-600 transition-all cursor-pointer">
                      アーキテクチャ図を作成
                    </Button>
                  </div>
                  <ul className="pl-4 space-y-1">
                    <li className="list-disc text-xs text-muted-foreground">
                      Gemini 1.5 Flash APIの無料プランを使用します
                    </li>
                    <li className="list-disc text-xs text-muted-foreground">
                      送信したデータ内容はGoogleのAIの学習に使用されますのでご注意ください
                    </li>
                    <li className="list-disc text-xs text-muted-foreground">生成に失敗することがあります</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </Html>
    </group>
  );
};

const Tree = (props: ThreeElements["group"]) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Tree-2.glb");

  const positions: { position: Vector3; scale?: number | undefined }[] = [
    { position: [16, 13, -25], scale: 8 },
    { position: [16, 13, 28], scale: 8 },
    { position: [42, 13, -25], scale: 8 },
    { position: [42, 13, 28], scale: 8 },

    //
    { position: [-16, 13, -25], scale: 8 },
    { position: [-16, 13, 28], scale: 8 },
    { position: [-42, 13, -25], scale: 8 },
    { position: [-42, 13, 28], scale: 8 },
  ];

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
      {positions.map(({ position, scale }, index) => {
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

const GraveStone = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const { scene } = useGLTF("/models/Gravestone.glb");

  useCursor(clicked);
  useCursor(hovered);

  return (
    <group
      position={[0, 2.5, -45]}
      scale={0.046875}
      castShadow
      onClick={(e) => (e.stopPropagation(), setClicked(true))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
    >
      <primitive object={scene} />
      <Html>
        <Dialog open={clicked} onOpenChange={setClicked}>
          <DialogContent className="font-geist-sans">
            <DialogHeader>
              <DialogTitle>プロジェクトタイトル</DialogTitle>
              <DialogDescription>失敗も成功も、すべては財産</DialogDescription>
            </DialogHeader>
            <div>
              <p className="text-xs md:text-sm tracking-tight text-muted-foreground">
                終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </Html>
    </group>
  );
};

const models = [
  {
    label: "Cemetary by Poly by Google",
    link: "https://poly.pizza/m/c5L6hAdX3ua",
  },
  {
    label: "Gravestone by Poly by Google",
    link: "https://poly.pizza/m/125x68MbyA0",
  },
  {
    label: "Rock Path Round Thin by Quaternius",
    link: "https://poly.pizza/m/L1GeXpXEPY",
  },
  {
    label: "Tree-2 by Marc Solà",
    link: "https://poly.pizza/m/cRipmFHCEVU",
  },
  {
    label: "Forest Ground 01 by Rob Tuytel",
    link: "https://polyhaven.com/a/forrest_ground_01",
  },
  {
    label: "Rock 01 by Rob Tuytel",
    link: "https://polyhaven.com/a/rock_01",
  },
];

const Road = (props: ThreeElements["group"]) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Rock_Path_Round_Thin.glb");

  const positions: { position: Vector3 }[] = [
    { position: [1.5, -0.5, -40] },
    { position: [1.5, -0.5, -36] },
    { position: [1.5, -0.5, -32] },
    { position: [1.5, -0.5, -28] },
    { position: [1.5, -0.5, -24] },
    { position: [1.5, -0.5, -20] },
    { position: [1.5, -0.5, -16] },
    { position: [1.5, -0.5, -12] },
    { position: [1.5, -0.5, -8] },
    { position: [1.5, -0.5, -4] },
    { position: [1.5, -0.5, 0] },
    { position: [1.5, -0.5, 4] },
    { position: [1.5, -0.5, 8] },
    { position: [1.5, -0.5, 12] },
    { position: [1.5, -0.5, 16] },
    { position: [1.5, -0.5, 20] },
    { position: [1.5, -0.5, 24] },
    { position: [1.5, -0.5, 28] },
    { position: [1.5, -0.5, 32] },
    { position: [1.5, -0.5, 36] },
    { position: [1.5, -0.5, 40] },
    { position: [1.5, -0.5, 44] },
    { position: [1.5, -0.5, 48] },

    //
    { position: [-1.5, -0.5, -40] },
    { position: [-1.5, -0.5, -36] },
    { position: [-1.5, -0.5, -32] },
    { position: [-1.5, -0.5, -28] },
    { position: [-1.5, -0.5, -24] },
    { position: [-1.5, -0.5, -20] },
    { position: [-1.5, -0.5, -16] },
    { position: [-1.5, -0.5, -12] },
    { position: [-1.5, -0.5, -8] },
    { position: [-1.5, -0.5, -4] },
    { position: [-1.5, -0.5, 0] },
    { position: [-1.5, -0.5, 4] },
    { position: [-1.5, -0.5, 8] },
    { position: [-1.5, -0.5, 12] },
    { position: [-1.5, -0.5, 16] },
    { position: [-1.5, -0.5, 20] },
    { position: [-1.5, -0.5, 24] },
    { position: [-1.5, -0.5, 28] },
    { position: [-1.5, -0.5, 32] },
    { position: [-1.5, -0.5, 36] },
    { position: [-1.5, -0.5, 40] },
    { position: [-1.5, -0.5, 44] },
    { position: [-1.5, -0.5, 48] },
  ];

  return (
    <group {...props} ref={groupRef}>
      {positions.map((pos, index) => {
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

const Home = () => {
  return (
    <>
      <header>
        <div className="h-16 px-4 md:px-10 flex justify-between items-center font-geist-sans">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="ml-auto hidden ">
                <PackagePlusIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="font-geist-sans">
              <DialogHeader>
                <DialogTitle>プロジェクトの追加</DialogTitle>
                <DialogDescription>必要な情報を記入してください</DialogDescription>
              </DialogHeader>
              <Button className="bg-emerald-500 hover:bg-emerald-600">プロジェクトを追加</Button>
            </DialogContent>
          </Dialog>
          <Button variant={"ghost"} size={"icon"} className="hidden">
            <InfoIcon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden" asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-64 max-w-64 font-geist-sans">
              <DropdownMenuLabel className="py-4">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Githubアカウントページ</DropdownMenuItem>
              <DropdownMenuItem>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h1 className="font-semibold text-2xl font-cardo cursor-default">
            <Link href="/">RIPro</Link>
          </h1>
          <Button className="bg-emerald-500 hover:bg-emerald-600">ログイン</Button>
        </div>
      </header>
      <main className="w-full h-[calc(100%-64px)] font-geist-sans relative flex flex-col">
        <Card className="min-w-96 max-w-96 absolute top-8 right-8 z-10 hidden">
          <CardHeader>
            <CardTitle>Credit</CardTitle>
            <CardDescription>以下の3Dモデルおよびテクスチャを使用しています</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div>
              <p className="mb-2">一覧</p>
              <ul className="space-y-1">
                {models.map((model) => (
                  <li key={model.label}>
                    <Button variant={"link"} className="p-0 h-fit hover:text-emerald-500" asChild>
                      <Link href={model.link} rel="noopener noreferrer" target="_blank">
                        {model.label}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Loader />
        <Canvas
          shadows
          camera={{
            position: [-40, 50, 50],
            fov: 55,
            near: 0.1,
            far: 1000,
          }}
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
              <Cemetary />
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
      </main>
    </>
  );
};

export default Home;
