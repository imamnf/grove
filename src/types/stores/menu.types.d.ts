import type { Response, State } from '@tp/index.types'

/**
 * Data of a menu
 *
 * @property {string} name - Name
 * @property {string} slug - Slug
 * @property {string} to - To
 * @property {string} icon - Icon
 */
interface Data {
  name: string
  slug: string
  to: string
  icon: string
}
/**
 * Menu payload
 *
 * @property {string} name - Name
 * @property {string} to - To
 * @property {string} icon - Icon
 */
interface Payload {
  name: string
  to: string
  icon: string
}
/**
 * The state of the menu store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface MenusState extends State<null> { }
/**
 * The response of the menu store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface MenusResponse extends Response<Data[]> { }
/**
 * The state of the single menu store.
 *
 * @property {Data[]} data - The data of the store.
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface MenuState extends State<Data[]> { }
/**
 * The response of the single menu store.
 *
 * @property {Data[]} data - The data of the response.
 * @property {string} message - The message of the response.
 */
interface MenuResponse extends MenusResponse { }
/**
 * The state of the add menu store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface AddState extends State<null> { }
/**
 * The response of the add menu store.
 *
 * @property {string} message - The message of the response.
 */
interface AddResponse extends Response<null> { }
/**
 * The state of the update menu store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface UpdateState extends State<null> { }
/**
 * The response of the update menu store.
 *
 * @property {string} message - The message of the response.
 */
interface UpdateResponse extends Response<null> { }
/**
 * The state of the delete menu store.
 *
 * @property {boolean} error - The error state of the store.
 * @property {boolean} loading - The loading state of the store.
 * @property {boolean} show - The show state of the store.
 */
interface DeleteState extends State<null> { }
/**
 * The response of the delete menu store.
 *
 * @property {string} message - The message of the response.
 */
interface DeleteResponse extends Response<null> { }
