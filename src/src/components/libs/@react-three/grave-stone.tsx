"use client";

import { useGLTF, useCursor, Html } from "@react-three/drei";
import React, { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  showDialog?: boolean | undefined;
};

export const GraveStone = ({ showDialog }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const { scene } = useGLTF("/models/Gravestone.glb");

  useCursor(typeof showDialog === "undefined" ? false : clicked);
  useCursor(typeof showDialog === "undefined" ? false : hovered);

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
        <Dialog open={typeof showDialog === "undefined" ? false : clicked} onOpenChange={setClicked}>
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
