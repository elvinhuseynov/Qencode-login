import { ApiErrorResponse } from "@api";
import { Flex, FormLabel, useBoolean, useToast } from "@chakra-ui/react";
import {
  AuthWrapper,
  Button,
  Loader,
  Paragraph,
  PasswordInput,
  Title,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiPost, useQueryParam } from "@hooks";
import { PasswordSetRequest } from "@models";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface PasswordSetForm {
  password: string;
  confirmPassword: string;
}

const validationSchema: yup.ObjectSchema<PasswordSetForm> = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const PasswordSetPage = () => {
  const toast = useToast();

  const token = useQueryParam("token") || "";
  const secret = useQueryParam("secret") || "";

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<PasswordSetForm>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [showPassword, setShowPassword] = useBoolean();

  const { post, isLoading } = useApiPost<
    { accessToken: string; refreshToken: string },
    PasswordSetRequest
  >();

  const onSubmit = async ({ confirmPassword, password }: PasswordSetForm) => {
    try {
      const response = await post("/v1/auth/password-set", {
        password,
        token,
        secret,
        password_confirm: confirmPassword,
      });

      console.log({ response });
    } catch (err) {
      console.error(err);
      toast({
        title: "Login error",
        description: (err as ApiErrorResponse).response?.data.detail,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <AuthWrapper>
      <Flex direction="column" maxW="400px" w="100%" px="12px">
        {isLoading && <Loader />}
        <Title textAlign="center">Create new Password?</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" mt="32px">
            <FormLabel fontWeight={500} htmlFor="password" mb="8px">
              Password
            </FormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="password"
                  showPassword={showPassword}
                  onToggleShowPassword={setShowPassword.toggle}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  isInvalid={!!errors.password}
                  borderColor={
                    errors.password ? "border.error" : "border.input"
                  }
                  {...field}
                />
              )}
            />
            {errors.password && (
              <Paragraph color="text.error" mt="12px">
                {errors.password.message}
              </Paragraph>
            )}
          </Flex>

          <Flex direction="column" mt="12px">
            <FormLabel fontWeight={500} htmlFor="confirmPassword" mb="8px">
              Confirm Password
            </FormLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="confirmPassword"
                  showPassword={showPassword}
                  onToggleShowPassword={setShowPassword.toggle}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  isInvalid={!!errors.confirmPassword}
                  borderColor={
                    errors.confirmPassword ? "border.error" : "border.input"
                  }
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <Paragraph color="text.error" mt="12px">
                {errors.confirmPassword.message}
              </Paragraph>
            )}
          </Flex>

          <Button
            btnType="SUBMIT"
            mt="24px"
            isDisabled={!isValid}
            type="submit"
          >
            <Paragraph>Reset Password</Paragraph>
          </Button>
        </form>
      </Flex>
    </AuthWrapper>
  );
};
