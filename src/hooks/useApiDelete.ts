import { useState } from "react";

import { deletePublicData, deletePrivateData, ApiErrorResponse } from "@api";

/**
 * Custom hook for performing DELETE requests.
 * It can handle both public and private API calls based on the `isPrivate` flag.
 *
 * @template T The expected type of the response data.
 * @returns An object containing the delete function, loading state, and error state.
 */
export const useApiDelete = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const del = async (url: string, isPrivate: boolean = false) => {
    setIsLoading(true);
    try {
      const responseData = isPrivate
        ? await deletePrivateData<T>(url)
        : await deletePublicData<T>(url);
      setIsLoading(false);

      return responseData;
    } catch (err) {
      setError(err as ApiErrorResponse);
      setIsLoading(false);
      throw err as ApiErrorResponse;
    }
  };

  return { del, isLoading, error };
};
