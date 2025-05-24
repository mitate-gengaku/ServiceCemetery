"use client"

import { CEMETERY_PROJECTS } from "@/config/cemetery";
import { Cemetery } from "../libs/@react-three/cemetery copy";
import { useState } from "react";

export const GuestCemetery = () => {
  const [selectIndex, setSelectIndex] = useState<number>(0)
  const projects = CEMETERY_PROJECTS;

  return (
    <Cemetery
      projects={projects}
      setSelectIndex={setSelectIndex}
      />
  )
}