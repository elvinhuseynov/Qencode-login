import { Button, ButtonProps } from "@chakra-ui/react";

enum BUTTON_TYPES {
  SUBMIT = "submit",
  SECONDARY = "secondary",
  CANCEL = "cancel",
}

interface CustomButtonProps extends ButtonProps {
  btnType?: keyof typeof BUTTON_TYPES;
}

export const CustomButton = ({
  btnType = "SECONDARY",
  ...props
}: CustomButtonProps) => (
  <Button
    border={btnType !== "SUBMIT" ? "1px solid" : ""}
    borderColor="border.button"
    color={`buttonText.${BUTTON_TYPES[btnType]}`}
    bg={`button.${BUTTON_TYPES[btnType]}`}
    borderRadius="6px"
    padding="0 20px"
    height="48px"
    w="100%"
    {...props}
  />
);
