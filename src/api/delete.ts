import { publicApi, privateApi } from "./axios";

/**
 * Performs a public DELETE request to the specified URL.
 * This function uses the `publicApi` instance which does not require authentication.
 *
 * @param url - The endpoint to which the DELETE request is sent.
 * @returns The response data from the API.
 */
export const deletePublicData = async <T>(url: string): Promise<T> => {
  const response = await publicApi.delete<T>(url);

  return response.data;
};

/**
 * Performs a private DELETE request to the specified URL.
 * This function uses the `privateApi` instance and includes authentication headers.
 *
 * @param url - The endpoint to which the DELETE request is sent.
 * @returns The response data from the API.
 */
export const deletePrivateData = async <T>(url: string): Promise<T> => {
  const response = await privateApi.delete<T>(url);

  return response.data;
};
