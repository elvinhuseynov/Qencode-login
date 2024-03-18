import { publicApi, privateApi } from "./axios";

/**
 * Performs a POST request to the specified URL using the public API instance.
 * This is typically used for creating new resources in a public context.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the POST request is sent.
 * @param {U} data The data to be posted.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const postPublicData = async <T, U = unknown>(
  url: string,
  data: U
): Promise<T> => {
  const response = await publicApi.post<T>(url, data);

  return response.data;
};

/**
 * Performs a POST request to the specified URL using the private API instance.
 * This is typically used for creating new resources that require authentication.
 *
 * @template T The expected type of the response data.
 * @template U The type of the data being sent in the request.
 * @param {string} url The endpoint to which the POST request is sent.
 * @param {U} data The data to be posted.
 * @returns {Promise<T>} A promise resolving to the response data of type T.
 */
export const postPrivateData = async <T, U = unknown>(
  url: string,
  data: U
): Promise<T> => {
  const response = await privateApi.post<T>(url, data);

  return response.data;
};
