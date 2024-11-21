/**
 * State of a store
 *
 * @property {T} [data] - Data of the store
 * @property {boolean} error - Error state of the store
 * @property {boolean} loading - Loading state of the store
 * @property {boolean} show - Show state of the store
 * @template T
 */
export interface State<T extends Record<string, any> | null> {
  data?: T;
  error: boolean;
  loading: boolean;
  show: boolean;
}

/**
 * Response of a store
 *
 * @property {T} [data] - Data of the response
 * @property {string} message - Message of the response
 * @template T
 */
export interface Response<T extends Record<string, any> | null> {
  data?: T;
  message: string;
}
