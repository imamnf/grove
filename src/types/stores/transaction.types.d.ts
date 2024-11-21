import type { State, Response } from '@tp/index.types';

/**
 * Data of the transaction.
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 * @property {string} description - Description
 * @property {number} amount - Amount
 * @property {string} category_name - Category Name
 * @property {string} category_slug - Category Slug
 * @property {string} status_name - Status Name
 * @property {string} status_slug - Status Slug
 * @property {string} status_icon - Status Icon
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  amount: number;
  category_name: string;
  category_slug: string;
  status_name: string;
  status_slug: string;
  status_icon: string;
  addtime: string;
  updtime: string;
}
/**
 * Transaction payload.
 *
 * @property {string} name - Name
 * @property {string} description - Description
 * @property {string} amount - Amount
 * @property {date} date - Date
 * @property {number} status_id - Status ID
 * @property {number} transfer_id - Transfer ID
 * @property {number} category_id - Category ID
 * @property {number} wallet_id - Wallet ID
 */
interface Payload {
  id?: number;
  name: string;
  description: string;
  amount: string;
  date: Date;
  status_id: number;
  transfer_id: number;
  category_id: number;
  wallet_id: number;
}

/**
 * The state of the transaction store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface TransactionState extends State<Data[]> {}
/**
 * The response of the transaction store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface TransactionResponse extends Response<Data[]> {}
