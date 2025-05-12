import React from "react";

import { RegisterProjectForm } from "@/components/clients/register-project-form";
import { TopSectionClient } from "@/components/clients/top";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { TopSection } from "@/components/utils/top-section";
import { auth } from "@/server/auth";

const Home = async () => {
  const session = await auth();

  return (
    <div className="w-full h-full relative flex flex-col md:flex-row">
      <TopSection>{session ? <RegisterProjectForm /> : <TopSectionClient />}</TopSection>
      <MainCanvas isMyProject={true} />
    </div>
  );
};

export default Home;
