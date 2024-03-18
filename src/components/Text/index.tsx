import { Heading, Text, TextProps } from "@chakra-ui/react";

export const Title = (props: TextProps) => (
  <Heading fontSize="30px" lineHeight="38px" color="text.title" {...props} />
);

export const Paragraph = (props: TextProps) => (
  <Text fontWeight={500} fontSize="16px" lineHeight="21px" {...props} />
);
