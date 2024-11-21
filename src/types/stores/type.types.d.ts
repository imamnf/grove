import type { State, Response } from '@tp/index.types';

/**
 * Data
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {number} code - Code
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  code: number;
  addtime: string;
  updtime: string;
}
/**
 * Payload
 *
 * @property {string} name - Name
 * @property {number} code - Code
 */
interface Payload {
  name: string;
  code: number;
}

/**
 * The state of the type store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface TypeState extends State<Data[]> {}
/**
 * The response of the type store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface TypeResponse extends Response<Data[]> {}

/**
 * The state of the add type store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface AddState extends State<null> {}
/**
 * The response of the add type store.
 *
 * @property {string} message - The message of the response.
 */
interface AddResponse extends Response<null> {}

/**
 * The state of the update type store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface UpdateState extends State<null> {}
/**
 * The response of the update type store.
 *
 * @property {string} message - The message of the response.
 */
interface UpdateResponse extends Response<null> {}

/**
 * The state of the delete type store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface DeleteState extends State<null> {}
/**
 * The response of the delete type store.
 *
 * @property {string} message - The message of the response.
 */
interface DeleteResponse extends Response<null> {}
