import { ViewOffIcon } from "@chakra-ui/icons";
import {
  IconButton,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { EyeIcon } from "@components";

import { TextInput } from "./TextInput";

interface PasswordInputProps extends InputProps {
  showPassword: boolean;
  onToggleShowPassword: () => void;
}

export const PasswordInput = ({
  showPassword,
  onToggleShowPassword,
  ...props
}: PasswordInputProps) => (
  <InputGroup>
    <TextInput type={showPassword ? "text" : "password"} {...props} />
    <InputRightElement height="100%">
      <IconButton
        onClick={onToggleShowPassword}
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        icon={showPassword ? <ViewOffIcon color="#67717B" /> : <EyeIcon />}
        aria-label={showPassword ? "Hide password" : "Show password"}
        size="sm"
      />
    </InputRightElement>
  </InputGroup>
);
