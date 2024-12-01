/* eslint-disable unused-imports/no-unused-vars */
import type { AddResponse, AddState, TransactionPayload, TransactionsResponse, TransactionsState, TransactionTypesResponse, TransactionTypesState } from '@tpStr/transaction.types'

export const useTransactionStore = defineStore('transaction', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/transactions`
  /*****************************
   *                           *
   * -> Get All Transaction <- *
   *                           *
   *****************************/
  /**
   * The state of the all transaction store.
   *
   * @property {TransactionsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const state = reactive<TransactionsState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all transaction action.
   *
   * @returns {Promise<void>}
   */
  async function getAllTransaction(): Promise<void> {
    state.data = []
    state.loading = true
    state.error = false
    state.show = false

    try {
      const { data, status } = await $api<TransactionsResponse>(url, { method: 'POST' })

      if (status === 200) {
        state.data = data.data
      }
    }
    catch (error: any) {
      state.error = true
    }
    finally {
      state.loading = false
      state.show = true
    }
  };
  /*************************
   *                       *
   * -> Add Transaction <- *
   *                       *
   *************************/
  /**
   * The state of the add transaction store.
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const addState = reactive<AddState>({
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function to add a new transaction.
   *
   * @param {TransactionPayload} payload - The transaction data to add
   * @returns {Promise<void>}
   */
  async function addTransaction(payload: TransactionPayload): Promise<void> {
    addState.loading = true
    addState.error = false
    addState.show = false

    try {
      const { status } = await $api<AddResponse>(`${url}/add`, { method: 'POST', body: payload })

      if (status === 201) {
        getAllTransaction()
      }
      else {
        addState.error = true
      }
    }
    catch (error: any) {
      addState.error = true
    }
    finally {
      addState.loading = false
      addState.show = true
    }
  }

  /**********************************
   *                                *
   * -> Get All Transaction Type <- *
   *                                *
   **********************************/
  /**
   * The state of the all transaction type store.
   *
   * @property {TransactionsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const typeState = reactive<TransactionTypesState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all transaction action.
   *
   * @returns {Promise<void>}
   */
  async function getAllTransactionType(): Promise<void> {
    typeState.data = []
    typeState.loading = true
    typeState.error = false
    typeState.show = false

    try {
      const { data, status } = await $api<TransactionTypesResponse>(`${url}/types`, { method: 'POST' })

      if (status === 200) {
        typeState.data = data.data
      }
    }
    catch (error: any) {
      typeState.error = true
    }
    finally {
      typeState.loading = false
      typeState.show = true
    }
  };

  return {
    // Get All Transaction
    state,
    getAllTransaction,
    // Add Transaction
    addState,
    addTransaction,
    // Get All Transaction Type
    typeState,
    getAllTransactionType,
  }
})
