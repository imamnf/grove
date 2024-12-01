/* eslint-disable unused-imports/no-unused-vars */
import type {
  AddPayload,
  AddResponse,
  AddState,
  StatusPayload,
  StatusResponse,
  StatusState,
  UpdatePayload,
  UpdateResponse,
  UpdateState,
  WalletResponse,
  WalletsResponse,
  WalletsState,
  WalletState,
  WalletTransactionsResponse,
  WalletTransactionsState,
  WalletTypesResponse,
  WalletTypesState,
} from '@tpStr/wallet.types'

export const useWalletStore = defineStore('wallet', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/wallets`
  /************************
   *                      *
   * -> Get All Wallet <- *
   *                      *
   ************************/
  /**
   * The state of the all wallet store.
   *
   * @property {WalletsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const state = reactive<WalletsState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function getAllWallet(): Promise<void> {
    state.data = []
    state.loading = true
    state.error = false
    state.show = false

    try {
      const { data, status } = await $api<WalletsResponse>(url, { method: 'POST' })

      if (status === 200) {
        state.data = data.data
      }
      else {
        state.error = true
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
  /***************************
   *                         *
   * -> Get Single Wallet <- *
   *                         *
   ***************************/
  /**
   * The state of the single wallet store.
   *
   * @property {WalletState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const walletState = reactive<WalletState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the single wallet action.
   *
   * @param {string} slode - The slug and code of wallet
   * @returns {Promise<void>}
   */
  async function getSingleWallet(slode: string): Promise<void> {
    walletState.data = []
    walletState.loading = true
    walletState.error = false
    walletState.show = false

    try {
      const { data, status } = await $api<WalletResponse>(`${url}/${slode}`, { method: 'GET' })

      if (status === 200) {
        walletState.data = data.data
      }
      else {
        walletState.error = true
      }
    }
    catch (error: any) {
      walletState.error = true
    }
    finally {
      walletState.loading = false
      walletState.show = true
    }
  };
  /********************
   *                  *
   * -> Add Wallet <- *
   *                  *
   ********************/
  /**
   * The state of the add wallet store.
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
   * The function of the single wallet action.
   *
   * @returns {Promise<void>}
   */
  async function addWallet(payload: AddPayload): Promise<void> {
    addState.loading = true
    addState.error = false
    addState.show = false

    try {
      const { status } = await $api<AddResponse>(`${url}/add`, { method: 'POST', body: payload })

      if (status === 201) {
        getAllWallet()
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
  };
  /*****************************
  *                            *
  * -> Update Wallet Status <- *
  *                            *
  ******************************/
  /**
   * The state of the update wallet status store
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const statusState = reactive<StatusState>({
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function updateWalletStatus(payload: StatusPayload, slode: string): Promise<void> {
    statusState.loading = true
    statusState.error = false
    statusState.show = false

    try {
      const { status } = await $api<StatusResponse>(`${url}/${slode}`, { method: 'PATCH', body: payload })

      if (status === 200) {
        getSingleWallet(slode)
      }
      else {
        statusState.error = true
      }
    }
    catch (error) {
      statusState.error = true
    }
    finally {
      statusState.loading = false
      statusState.show = true
    }
  }
  /***********************
   *                     *
   * -> Update Wallet <- *
   *                     *
   ***********************/
  /**
   * The state of the update wallet store
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const updateState = reactive<UpdateState>({
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function updateWallet(payload: UpdatePayload, slode: string): Promise<void> {
    updateState.loading = true
    updateState.error = false
    updateState.show = false

    try {
      const { data, status } = await $api<UpdateResponse>(`${url}/${slode}`, { method: 'PATCH', body: payload })

      if (status === 200 && data.data) {
        const { slug, code } = data.data[0]

        getSingleWallet(`${slug}_${code}`)
      }
      else {
        updateState.error = true
      }
    }
    catch (error) {
      updateState.error = true
    }
    finally {
      updateState.loading = false
      updateState.show = true
    }
  }
  /****************************
  *                           *
  * -> Get All Wallet Type <- *
  *                           *
  *****************************/
  /**
   * The state of the all wallet type store
   *
   * @property {WalletsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const typeState = reactive<WalletTypesState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all wallet type action.
   *
   * @returns {Promise<void>}
   */
  async function getAllWalletType(): Promise<void> {
    typeState.data = []
    typeState.loading = true
    typeState.error = false
    typeState.show = false

    try {
      const { data, status } = await $api<WalletTypesResponse>(`${url}/types`, { method: 'POST' })

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
  /***********************************
  *                                  *
  * -> Get All Wallet Transaction <- *
  *                                  *
  ************************************/
  /**
   * The state of the all wallet transaction store
   *
   * @property {WalletsState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const transactionState = reactive<WalletTransactionsState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })
  /**
   * The function of the all wallet transaction action.
   *
   * @returns {Promise<void>}
   */
  async function getAllWalletTransaction(slode: string): Promise<void> {
    transactionState.data = []
    transactionState.loading = true
    transactionState.error = false
    transactionState.show = false

    try {
      const { data, status } = await $api<WalletTransactionsResponse>(`${url}/${slode}/transactions`, { method: 'POST' })

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

  return {
    // Get All Wallet
    state,
    getAllWallet,
    // Get Single Wallet
    walletState,
    getSingleWallet,
    // Add Wallet
    addState,
    addWallet,
    // Update Status Wallet
    statusState,
    updateWalletStatus,
    // Update Wallet
    updateState,
    updateWallet,
    // Get All Wallet Type
    typeState,
    getAllWalletType,
    // Get All Wallet Transaction
    transactionState,
    getAllWalletTransaction,
  }
})
