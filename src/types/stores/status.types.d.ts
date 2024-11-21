import type { State, Response } from '@tp/index.types';

/**
 * Data of the status.
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} icon - Icon
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  icon: string;
  addtime: string;
  updtime: string;
}
/**
 * The state of the status store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface StatusState extends State<Data[]> {}
/**
 * The response of the status store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface StatusResponse extends Response<Data[]> {}
