import { ApiErrorResponse } from "@api";
import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import {
  AuthWrapper,
  Button,
  GithubLogo,
  GoogleLogo,
  Loader,
  Paragraph,
  PasswordInput,
  TextInput,
  Title,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiPost } from "@hooks";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

interface LoginForm {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const LoginPage = () => {
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [showPassword, setShowPassword] = useBoolean();

  const { post, isLoading } = useApiPost<
    { accessToken: string; refreshToken: string },
    LoginForm
  >();

  const onSubmit = async (data: LoginForm) => {
    try {
      const { accessToken, refreshToken } = await post("/v1/auth/login", data);

      // Store tokens in cookies with secure parameters
      Cookies.set("accessToken", accessToken, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        sameSite: "Strict",
      });

      // Redirect or perform additional actions on successful login
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
        <Title textAlign="center">Log in to your account</Title>
        <Flex
          w="100%"
          gap="16px"
          mt="32px"
          direction={{ base: "column", md: "row" }}
        >
          <Button btnType="SECONDARY" leftIcon={<GoogleLogo />}>
            <Paragraph>Google</Paragraph>
          </Button>
          <Button btnType="SECONDARY" leftIcon={<GithubLogo />}>
            <Paragraph>Github</Paragraph>
          </Button>
        </Flex>
        <Box position="relative" my="32px">
          <Divider />
          <AbsoluteCenter bg="white" px="2">
            <Paragraph fontSize="12px" color="text.secondary">
              OR
            </Paragraph>
          </AbsoluteCenter>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="24px">
            <Flex direction="column" gap="12px">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Work email"
                    isInvalid={!!errors.email}
                    borderColor={errors.email ? "border.error" : "border.input"}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <Paragraph color="text.error">{errors.email.message}</Paragraph>
              )}
            </Flex>
            <Flex direction="column" gap="12px">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    placeholder="Password"
                    showPassword={showPassword}
                    onToggleShowPassword={setShowPassword.toggle}
                    isInvalid={!!errors.password}
                    borderColor={
                      errors.password ? "border.error" : "border.input"
                    }
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <Paragraph color="text.error">
                  {errors.password.message}
                </Paragraph>
              )}
            </Flex>
          </Flex>
          <Flex justifyContent="flex-end">
            <Link to='/forgot-password'>
              <Button
                w="fit-content"
                border="none"
                variant="ghost"
                color="text.brand"
                fontSize="14px"
                p="0"
                fontWeight={500}
                mt="6px"
                _hover={{ bg: "none", opacity: 0.7 }}
                _active={{ bg: "none" }}
              >
                Forgot your password?
              </Button>
            </Link>
          </Flex>

          <Button
            btnType="SUBMIT"
            mt="24px"
            isDisabled={!isValid}
            type="submit"
          >
            <Paragraph>Log in to Qencode</Paragraph>
          </Button>
        </form>
        <Paragraph fontSize="14px" textAlign="center" mt="24px">
          Is your company new to Qencode?{" "}
          <Link to="/login">
            <Paragraph as="span" color="text.brand">
              Sign up
            </Paragraph>
          </Link>
        </Paragraph>
      </Flex>
    </AuthWrapper>
  );
};
