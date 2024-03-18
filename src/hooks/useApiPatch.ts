import { useState } from "react";

import { patchPublicData, patchPrivateData, ApiErrorResponse } from "@api";

/**
 * Custom hook for performing PATCH requests.
 * It supports both public and private API endpoints.
 *
 * @template T The expected response data type.
 * @template U The data type for the request body.
 * @returns An object containing the patch function, loading state, and error state.
 */
export const useApiPatch = <T, U = unknown>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const patch = async (url: string, data: U, isPrivate: boolean = false) => {
    setIsLoading(true);
    try {
      const responseData = isPrivate
        ? await patchPrivateData<T, U>(url, data)
        : await patchPublicData<T, U>(url, data);
      setIsLoading(false);

      return responseData;
    } catch (err) {
      setError(err as ApiErrorResponse);
      setIsLoading(false);
      throw err as ApiErrorResponse;
    }
  };

  return { patch, isLoading, error };
};
