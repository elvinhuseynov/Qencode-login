import { publicApi, privateApi } from "./axios";

/**
 * Performs a public GET request to the specified URL.
 * This function is suitable for requests that do not require user authentication.
 *
 * @template T The expected type of the response data.
 * @param {string} url The endpoint from which data is to be fetched.
 * @returns {Promise<T>} A promise that resolves to the response data of type T.
 */
export const fetchPublicData = async <T>(url: string): Promise<T> => {
  const response = await publicApi.get<T>(url);

  return response.data;
};

/**
 * Performs a private GET request to the specified URL.
 * This function is suitable for requests that require user authentication.
 * The privateApi instance automatically attaches the necessary authentication tokens.
 *
 * @template T The expected type of the response data.
 * @param {string} url The endpoint from which data is to be fetched.
 * @returns {Promise<T>} A promise that resolves to the response data of type T.
 */
export const fetchPrivateData = async <T>(url: string): Promise<T> => {
  const response = await privateApi.get<T>(url);

  return response.data;
};
