import { useState, useEffect } from "react";

import { fetchPublicData, fetchPrivateData, ApiErrorResponse } from "@api";

/**
 * Custom hook for performing GET requests.
 * It automatically fetches data on mount or when the URL changes.
 *
 * @template T The expected type of the response data.
 * @param url The URL to fetch from.
 * @param isPrivate If true, uses the private API instance with authentication.
 * @returns An object with fetched data, loading state, and error state.
 */
export const useApiGet = <T>(url: string, isPrivate: boolean = false) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = isPrivate
          ? await fetchPrivateData<T>(url)
          : await fetchPublicData<T>(url);
        setData(responseData);
      } catch (err) {
        setError(err as ApiErrorResponse);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, isPrivate]);

  return { data, isLoading, error };
};
