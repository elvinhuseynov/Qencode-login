import { publicApi, privateApi } from "./axios";

/**
 * Performs a PATCH request to the specified URL using the public API instance.
 * This is suitable for partial updates to resources in public contexts.
 * 
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the PATCH request is sent.
 * @param {U} data The partial data to update.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const patchPublicData = async <T, U = unknown>(url: string, data: U): Promise<T> => {
  const response = await publicApi.patch<T>(url, data);

  return response.data;
};

/**
 * Performs a PATCH request to the specified URL using the private API instance.
 * This is suitable for partial updates to resources that require authentication.
 * 
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the PATCH request is sent.
 * @param {U} data The partial data to update.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const patchPrivateData = async <T, U = unknown>(url: string, data: U): Promise<T> => {
  const response = await privateApi.patch<T>(url, data);

  return response.data;
};
