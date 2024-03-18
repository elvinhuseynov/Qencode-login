import { Input, InputProps } from "@chakra-ui/react";

export const TextInput = ({ placeholder, ...props }: InputProps) => (
  <Input
    w="100%"
    h="48px"
    type="text"
    placeholder={placeholder}
    borderRadius="6px"
    border="1px solid"
    borderColor="border.input"
    _placeholder={{
      color: "#A1ABB5",
    }}
    {...props}
  />
);
