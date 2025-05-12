import React from "react";

import { UserSection } from "@/components/clients/user-section";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { TopSection } from "@/components/utils/top-section";

const UserPage = async () => {
  return (
    <div className="w-full h-full relative flex flex-col md:flex-row">
      <TopSection>
        <UserSection />
      </TopSection>
      <MainCanvas />
    </div>
  );
};

export default UserPage;
