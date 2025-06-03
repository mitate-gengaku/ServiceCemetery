import React, { Suspense } from "react";

import { SearchUserLength } from "@/components/clients/search-user-length";
import { SearchUserList } from "@/components/clients/search-user-list";
import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { MainContainer } from "@/components/layout/main-container";
import { HydrateClient } from "@/trpc/server";

const Search = async () => {
  return (
    <Suspense>
      <HydrateClient>
        <MainContainer>
          <LeftSectionContainer className="pt-8 pb-0">
            <SearchUserLength />
          </LeftSectionContainer>
          <SearchUserList />
        </MainContainer>
      </HydrateClient>
    </Suspense>
  );
};

export default Search;
