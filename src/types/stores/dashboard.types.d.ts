import type { Response, State } from '@tp/index.types'

/**
 * Data of a dashboard
 *
 */
interface Data {
  balance: {
    total: number
    revenue: number
    expense: number
  }
  wallet: {
    active: number
    inactive: number
  }
  transaction: {
    revenue: number
    expense: number
    transfer: number
  }
}
/**
 * The state of the dashboard store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface DashboardState extends State<Data> { }
/**
 * The response of the menu store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface DashboardResponse extends Response<Data> { }