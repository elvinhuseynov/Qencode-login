import { publicApi, privateApi } from "./axios";

/**
 * Performs a PUT request to the specified URL using the public API instance.
 * This is typically used for full updates to resources in a public context.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the PUT request is sent.
 * @param {U} data The data to be updated.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const putPublicData = async <T, U = unknown>(
  url: string,
  data: U
): Promise<T> => {
  const response = await publicApi.put<T>(url, data);

  return response.data;
};

/**
 * Performs a PUT request to the specified URL using the private API instance.
 * This is typically used for full updates to resources that require authentication.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the PUT request is sent.
 * @param {U} data The data to be updated.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const putPrivateData = async <T, U = unknown>(
  url: string,
  data: U
): Promise<T> => {
  const response = await privateApi.put<T>(url, data);

  return response.data;
};
