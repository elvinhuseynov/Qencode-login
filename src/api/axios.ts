import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

/**
 * Interface for the expected API error structure.
 */
interface ApiError {
  detail: string;
  error: number;
  timestamp: number;
}

/**
 * Interface extending AxiosError to include a custom response structure.
 */
export interface ApiErrorResponse extends AxiosError {
  response?: AxiosResponse<ApiError>;
}

// Base URL for the API.
// Can be ENV dependant
const BASE_URL = "https://auth-qa.qencode.com";

/**
 * Public API instance for unauthenticated requests.
 */
export const publicApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Private API instance for authenticated requests.
 * Includes interceptors for handling authentication tokens.
 */
export const privateApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Request interceptor to attach the authentication token.
 */
privateApi.interceptors.request.use(
  (config) => {
    // Retrieve the access token from cookies.
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      // Attach the token to the authorization header.
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for handling token expiration.
 * If a 401 error is encountered, it tries to refresh the token.
 */
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the request has not been retried and if the error is 401.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token.
        const response = await axios.post(
          "https://your-api-url.com/refresh-token",
          {
            refreshToken: Cookies.get("refreshToken"),
          }
        );

        // Extract the new tokens.
        const { accessToken, refreshToken } = response.data;

        // Update tokens in cookies.
        Cookies.set("accessToken", accessToken, {
          secure: true,
          httpOnly: true,
        });
        Cookies.set("refreshToken", refreshToken, {
          secure: true,
          httpOnly: true,
        });

        // Update the header and retry the original request.
        privateApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return privateApi(originalRequest);
      } catch (refreshError) {
        // Handle the error in case of refresh token failure.
        return Promise.reject(refreshError);
      }
    }

    // Return the original error if conditions are not met.
    return Promise.reject(error);
  }
);
