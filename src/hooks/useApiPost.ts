import { useState } from "react";

import { postPublicData, postPrivateData, ApiErrorResponse } from "@api";

/**
 * Custom hook for performing POST requests.
 * Supports both public and private endpoints based on the `isPrivate` flag.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @returns An object containing the post function, loading state, and error state.
 */
export const useApiPost = <T, U = unknown>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const post = async (url: string, data: U, isPrivate: boolean = false) => {
    setIsLoading(true);
    try {
      const responseData = isPrivate
        ? await postPrivateData<T, U>(url, data)
        : await postPublicData<T, U>(url, data);
      setIsLoading(false);

      return responseData;
    } catch (err) {
      setError(err as ApiErrorResponse);
      setIsLoading(false);
      throw err as ApiErrorResponse;
    }
  };

  return { post, isLoading, error };
};
