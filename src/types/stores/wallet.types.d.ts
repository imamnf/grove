import type { State, Response } from '@tp/index.types';

/**
 * Data of a wallet
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 * @property {string} type - Type
 * @property {boolean} status - Status
 * @property {number} balance - Balance
 * @property {number} [transaction_revenue] - Revenue from transactions
 * @property {number} [transaction_expense] - Expense from transactions
 * @property {number} [transaction_total] - Total from transactions
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  code: string;
  type: string;
  status: boolean;
  balance: number;
  transaction_revenue?: number;
  transaction_expense?: number;
  transaction_total?: number;
  addtime: string;
  updtime: string;
}
/**
 * Wallet payload.
 *
 * @property {string} name - Name
 * @property {string} type_code - Type Code
 */
interface Payload {
  name: string;
  type_code: string;
}

/**
 * The state of the wallet store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface WalletState extends State<Data[]> {}
/**
 * The response of the wallet store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface WalletResponse extends Response<Data[]> {}

/**
 * Data of a wallet transaction
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 * @property {string} description - Description
 * @property {number} amount - Amount
 * @property {string} category_name - Category Name
 * @property {string} status_name - Status Name
 * @property {string} status_icon - Status Icon
 * @property {string} addtime - Add time
 * @property {string} updtime - Update time
 */
interface WalletTransactionData {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  amount: number;
  date: string;
  category_name: string;
  status_name: string;
  status_icon: string;
  addtime: string;
  updtime: string;
}
/**
 * The state of the wallet transaction store.
 *
 * @property {WalletTransactionData[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface WalletTransactionState extends State<WalletTransactionData[]> {}
/**
 * The response of the wallet transaction store.
 *
 * @property {WalletTransactionData[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface WalletTransactionResponse extends Response<WalletTransactionData[]> {}

/**
 * The state of the add wallet store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface AddWalletState extends State<null> {}
/**
 * The response of the add wallet store.
 *
 * @property {string} message - The message of the response.
 */
interface AddWalletResponse extends Response<null> {}

/**
 * Payload of change status wallet
 *
 * @property {boolean} status - Status
 */
interface ChangeStatusPayload {
  status: boolean;
}
/**
 * The state of the change status store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface ChangeStatusState extends State<null> {}
/**
 * The response of the change status store.
 *
 * @property {string} message - The message of the response.
 */
interface ChangeStatusResponse extends Response<null> {}

/**
 * Payload of rename wallet
 *
 * @property {boolean} status - Status
 */
interface RenamePayload {
  name: string;
  slug: string;
}
/**
 * The state of the rename store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface RenameState extends State<null> {}
/**
 * The response of the change status store.
 *
 * @property {string} message - The message of the response.
 */
interface RenameResponse extends Response<null> {}
