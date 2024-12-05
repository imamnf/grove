/* eslint-disable unused-imports/no-unused-vars */
import type {
  AddResponse,
  AddState,
  DeleteResponse,
  DeleteState,
  TransactionPayload,
  TransactionsResponse,
  TransactionsState,
  TransactionTypesResponse,
  TransactionTypesState,
} from '@tpStr/transaction.types'

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
  /********************************
   *                              *
   * -> Get Single Transaction <- *
   *                              *
   ********************************/
  /**
   * The state of the single transaction store.
   *
   * @property {TransactionsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const transactionState = reactive<TransactionsState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the single transaction action.
   *
   * @returns {Promise<void>}
   */
  async function getSingleTransaction(slode: string): Promise<void> {
    transactionState.data = []
    transactionState.loading = true
    transactionState.error = false
    transactionState.show = false

    try {
      const { data, status } = await $api<TransactionsResponse>(`${url}/${slode}`, { method: 'GET' })

      if (status === 200) {
        transactionState.data = data.data
      }
    }
    catch (error: any) {
      transactionState.error = true
    }
    finally {
      transactionState.loading = false
      transactionState.show = true
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
    }
    catch (error: any) {
      addState.error = true
    }
    finally {
      addState.loading = false
      addState.show = true
    }
  }
  /****************************
   *                          *
   * -> Delete Transaction <- *
   *                          *
   ****************************/
  /**
   * The state of the delete transaction store.
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const deleteState = reactive<DeleteState>({
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function to delete transaction.
   *
   * @param {string} slode - Slode
   * @returns {Promise<{status: number}>}
   */
  async function deleteTransaction(slode: string): Promise<{ status: number }> {
    deleteState.loading = true
    deleteState.error = false
    deleteState.show = false

    try {
      const { status } = await $api<DeleteResponse>(`${url}/${slode}`, { method: 'DELETE' })

      return {
        status,
      }
    }
    catch (error: any) {
      deleteState.error = true

      return {
        status: 500,
      }
    }
    finally {
      deleteState.loading = false
      deleteState.show = true
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
    // Get Single Transaction
    transactionState,
    getSingleTransaction,
    // Add Transaction
    addState,
    addTransaction,
    // Delete Transaction
    deleteState,
    deleteTransaction,
    // Get All Transaction Type
    typeState,
    getAllTransactionType,
  }
})
