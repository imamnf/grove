import type { State, Response } from '@tp/index.types';

/**
 * Data of a wallet
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 * @property {boolean} status - Status
 * @property {number} balance - Balance
 * @property {object} type - Type
 * @property {string} type.name - Type Name
 * @property {string} type.slug - Type Slug
 * @property {string} type.code - Type Code
 */
interface Data {
  id: number;
  name: string;
  slug: string;
  code: string;
  status: boolean;
  balance: number;
  type: {
    name: string
    slug: string
    code: string
  }
}
/**
 * The state of the wallet store
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface WalletsState extends State<Data[]> { }
/**
 * The response of the wallet store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface WalletsResponse extends Response<Data[]> { }
/**
 * Data of a single wallet
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 * @property {boolean} status - Status
 * @property {number} balance - Balance
 * @property {object} type - Type
 * @property {string} type.name - Type Name
 * @property {string} type.slug - Type Slug
 * @property {string} type.code - Type Code
 * @property {object} transaction - Transaction
 * @property {number} transaction.revenue - Transaction Revenue
 * @property {number} transaction.expense - Transaction Expense
 * @property {number} transaction.transfer - Transaction Transfer
 */
interface WalletData {
  id: number;
  name: string;
  slug: string;
  code: string;
  status: boolean;
  balance: number;
  type: {
    name: string
    slug: string
    code: string
  };
  transaction: {
    revenue: number;
    expense: number;
    transfer: number;
  }
}
/**
 * The state of the single wallet store
 *
 * @property {WalletData[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface WalletState extends State<WalletData[]> { }
/**
 * The response of the single wallet store.
 *
 * @property {WalletData[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface WalletResponse extends Response<WalletData[]> { }
/**
 * Data of add payload 
 */
interface AddPayload {
  name: string;
  type_id: number;
}
/**
 * The state of the add wallet store
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface AddState extends State<null> { }
/**
 * The response of the add wallet store.
 *
 * @property {string} message - The message of the response.
 */
interface AddResponse extends Response<null> { }
/**
 * Data of status payload 
 */
interface StatusPayload {
  status: boolean
}
/**
 * The state of the update status store
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface StatusState extends State<null> { }
/**
 * The response of the update status store.
 *
 * @property {string} message - The message of the response.
 */
interface StatusResponse extends Response<null> { }
/**
 * Data of a update wallet
 *
 * @property {string} slug - Slug
 * @property {string} code - Code
 */
interface UpdateData {
  slug: string;
  code: string;
}
/**
 * Data of update payload 
 */
interface UpdatePayload {
  name: string
}
/**
 * The state of the update wallet store
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface UpdateState extends State<null> { }
/**
 * The response of the update wallet store.
 *
 * @property {string} message - The message of the response.
 */
interface UpdateResponse extends Response<UpdateData[]> { }
/**
 * Data of a single wallet
 *
 * @property {number} id - ID
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} code - Code
 */
interface WalletTypeData {
  id: number;
  name: string;
  slug: string;
  code: string;
}
/**
 * The state of the wallet type store
 *
 * @property {WalletTypeData[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface WalletTypesState extends State<WalletTypeData[]> { }
/**
 * The response of the single wallet store.
 *
 * @property {WalletTypeData[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface WalletTypesResponse extends Response<WalletTypeData[]> { }