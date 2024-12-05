import type { Response, State } from '@tp/index.types'

interface Basic {
  name: string
  slug: string
  code: string
}

interface Category extends Basic { }
interface Type extends Basic { }
interface Wallet extends Basic { }
interface Data {
  name: string
  slug: string
  code: string
  amount: number
  description: string
  date: string
  category: Category
  type: Type
  wallet: Wallet
}
/**
 * The state of the transaction store
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface TransactionsState extends State<Data[]> { }
/**
 * The response of the transaction store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface TransactionsResponse extends Response<Data[]> { }
/**
 * Payload of add transaction
 */
interface TransactionPayload {
  name: string
  amount: number
  description: string
  type_id: number
  category_id: number
  wallet_id: number
}
/**
 * The state of the add transaction store
 *
 * @property {null} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface AddState extends State<null> { }
/**
 * The response of the add transaction store.
 *
 * @property {null} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface AddResponse extends Response<null> { }
/**
 * The state of the delete transaction store
 *
 * @property {null} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface DeleteState extends State<null> { }
/**
 * The response of the delete transaction store.
 *
 * @property {null} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface DeleteResponse extends Response<null> { }
/**
 * Data of transaction type
 */
interface TypeData {
  id: number
  name: string
  slug: 'revenue' | 'expense' | 'transfer'
  icon: string
}
/**
 * The state of the transaction type store
 *
 * @property {TypeData[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface TransactionTypesState extends State<TypeData[]> { }
/**
 * The response of the transaction type store.
 *
 * @property {TypeData[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface TransactionTypesResponse extends Response<TypeData[]> { }
