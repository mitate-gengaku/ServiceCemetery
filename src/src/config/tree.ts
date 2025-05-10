import { Vector3 } from "@react-three/fiber";

export const TREE_POSITIONS: { position: Vector3; scale?: number | undefined }[] = [
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