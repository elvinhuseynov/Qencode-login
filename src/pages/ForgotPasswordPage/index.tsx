import { ApiErrorResponse } from "@api";
import { Flex, useToast } from "@chakra-ui/react";
import {
  AuthWrapper,
  Button,
  Loader,
  Paragraph,
  TextInput,
  Title,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiPost } from "@hooks";
import { ForgotPasswordRequest } from "@models";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface ForgotPasswordForm {
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ForgotPasswordPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { post, isLoading } = useApiPost<void, ForgotPasswordRequest>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await post("/v1/auth/password-reset", {
        ...data,
        // TODO ENV
        redirectUrl: "http://localhost:5173/password-set",
      });

      console.log({ response });
      navigate("/password-set");
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AuthWrapper>
      <Flex direction="column" maxW="400px" w="100%" px="12px">
        {isLoading && <Loader />}
        <Title textAlign="center">Forgot Password?</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="24px" mt="32px">
            <Flex direction="column" gap="12px">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Enter your email"
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
          </Flex>

          <Button
            btnType="SUBMIT"
            mt="24px"
            isDisabled={!isValid}
            type="submit"
          >
            <Paragraph>Send</Paragraph>
          </Button>
          <Button btnType="CANCEL" mt="24px" onClick={handleGoBack}>
            <Paragraph>Cancel</Paragraph>
          </Button>
        </form>
      </Flex>
    </AuthWrapper>
  );
};
