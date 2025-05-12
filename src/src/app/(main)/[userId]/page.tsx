import React from "react";

import { UserSection } from "@/components/clients/user-section";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { TopSection } from "@/components/utils/top-section";
import { HydrateClient } from "@/trpc/server";

const UserPage = async () => {
  return (
    <HydrateClient>
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <UserSection />
        </TopSection>
        <MainCanvas />
      </div>
    </HydrateClient>
  );
};

export default UserPage;
