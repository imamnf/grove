import { type FetchOptions, ofetch } from 'ofetch';

import { useAuthStore } from '@str/auth.store';

export const $api = ofetch.create({
  /**
   * The base URL for all API requests.
   * @type {string}
   */
  baseURL: import.meta.env.VITE_API_BASE_URL,

  /**
   * The HTTP status codes for which the request should be retried.
   * @type {number[]}
   */
  retryStatusCodes: [401, 500, 504],

  /**
   * The number of times the request should be retried.
   * @type {number}
   */
  retry: 2,

  /**
   * The delay in milliseconds between retries.
   * @type {number}
   */
  retryDelay: 1000,

  /**
   * Adds an authorization header to each request.
   * Retrieves the access token from the cookie.
   * @param {FetchOptions} options - The fetch options.
   * @param {HeadersInit} options.headers - The current headers.
   * @returns {Promise<void>}
   */
  async onRequest({ options }: { options: FetchOptions }): Promise<void> {
    const authStore = useAuthStore();

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${authStore.accessToken}`
    };
  },

  /**
   * Handles the response error.
   * Refreshes the token if the response status is 401 (Unauthorized).
   * @param {Object} options - The options object.
   * @param {Response} options.response - The response object.
   * @returns {Promise<void>}
   */
  async onResponseError({}: { response: Response }): Promise<void> {}
});