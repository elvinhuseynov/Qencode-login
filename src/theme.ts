import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "'Basis Grotesque Pro', sans-serif",
  body: "'Basis Grotesque Pro', sans-serif",
};

const colors = {
  text: {
    title: "#1A1919",
    secondary: "#BEC5CC",
    brand: "#316FEA",
    error: "#FF0000",
  },
  border: {
    button: "#D3D8DC",
    input: "#D3D8DC",
    error: "#AB3939",
  },
  buttonText: {
    submit: "#FFFFFF",
    secondary: "#060E1E",
    cancel: "#060E1E",
  },
  button: {
    submit: "#316FEA",
    secondary: "#FFFFFF",
    cancel: "#FFFFFF",
  },
};

const theme = extendTheme({
  fonts,
  colors,
});

export default theme;
