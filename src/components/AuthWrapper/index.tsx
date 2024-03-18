import { ReactElement } from "react";

import { Flex } from "@chakra-ui/react";
import { Logo } from "@components";

interface PageWrapperProps {
  children: ReactElement;
}

export const AuthWrapper = ({ children }: PageWrapperProps) => (
  <Flex
    alignItems="center"
    mt={{ base: "48px", md: "178px" }}
    direction="column"
    gap={{ base: "48px", md: "141px" }}
  >
    <Logo />
    {children}
  </Flex>
);
