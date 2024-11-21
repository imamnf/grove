import type { State, Response } from '@tp/index.types';

/**
 * Data of a category.
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {boolean} status - Status
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  status: boolean;
  addtime: string;
  updtime: string;
}
/**
 * The state of the category store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface CategoryState extends State<Data[]> {}
/**
 * The response of the category store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface CategoryResponse extends Response<Data[]> {}
