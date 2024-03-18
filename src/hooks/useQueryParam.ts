import { useLocation } from "react-router-dom";

/**
 * Custom hook to retrieve a specific query parameter value from the URL.
 *
 * @param {string} param The name of the query parameter to retrieve.
 * @returns {string | null} The value of the query parameter or null if not found.
 */
export const useQueryParam = (param: string) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return searchParams.get(param);
};
