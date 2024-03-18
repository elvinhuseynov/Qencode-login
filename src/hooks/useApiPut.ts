import { useState } from "react";

import { putPublicData, putPrivateData, ApiErrorResponse } from "@api";

/**
 * Custom hook for performing PUT requests.
 * It can handle both public and private API calls.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @returns An object containing the put function, loading state, and error state.
 */
export const useApiPut = <T, U = unknown>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const put = async (url: string, data: U, isPrivate: boolean = false) => {
    setIsLoading(true);
    try {
      const responseData = isPrivate
        ? await putPrivateData<T, U>(url, data)
        : await putPublicData<T, U>(url, data);
      setIsLoading(false);

      return responseData;
    } catch (err) {
      setError(err as ApiErrorResponse);
      setIsLoading(false);
      throw err as ApiErrorResponse;
    }
  };

  return { put, isLoading, error };
};
