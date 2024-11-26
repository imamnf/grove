import type {
  // Get All Wallet
  WalletsState,
  WalletsResponse,
  // Get Single Wallet
  WalletState,
  WalletResponse,
  // Add Wallet
  AddPayload,
  AddState,
  AddResponse,
  // Update Wallet Status
  StatusPayload,
  StatusState,
  StatusResponse,
  // Update Wallet
  UpdatePayload,
  UpdateState,
  UpdateResponse,
  // Get All Wallet Type
  WalletTypesState,
  WalletTypesResponse
} from '@tpStr/wallet.types';

export const useWalletStore = defineStore('wallet', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/wallets`;
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
    show: false
  });
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function getAllWallet(): Promise<void> {
    state.data = [];
    state.loading = true;
    state.error = false;
    state.show = false;

    try {
      const { data } = await $api<WalletsResponse>(url, { method: 'POST' });

      if (data) {
        state.data = data;
      }
    } catch (error: any) {
      state.error = true;
    } finally {
      state.loading = false;
      state.show = true;
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
    show: false
  });
  /**
   * The function of the single wallet action.
   *
   * @param {string} slode - The slug and code of wallet
   * @returns {Promise<void>}
   */
  async function getSingleWallet(slode: string): Promise<void> {
    walletState.data = [];
    walletState.loading = true;
    walletState.error = false;
    walletState.show = false;

    try {
      const { data } = await $api<WalletResponse>(`${url}/${slode}`, { method: 'GET' });

      if (data) {
        walletState.data = data;
      }
    } catch (error: any) {
      walletState.error = true;
    } finally {
      walletState.loading = false;
      walletState.show = true;
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
    show: false
  });
  /**
   * The function of the single wallet action.
   *
   * @returns {Promise<void>}
   */
  async function addWallet(payload: AddPayload): Promise<void> {
    addState.loading = true;
    addState.error = false;
    addState.show = false;

    try {
      await $api<AddResponse>(`${url}/add`, { method: 'POST', body: payload });

      getAllWallet()
    } catch (error: any) {
      addState.error = true;
    } finally {
      addState.loading = false;
      addState.show = true;
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
    show: false
  })
  /**
    * The function of the all wallet action.
    *
    * @returns {Promise<void>}
    */
  async function updateWalletStatus(payload: StatusPayload, slode: string): Promise<void> {
    statusState.loading = true
    statusState.error = false;
    statusState.show = false;

    try {
      await $api<StatusResponse>(`${url}/${slode}`, { method: 'PATCH', body: payload })

      getSingleWallet(slode)
    } catch (error) {
      statusState.error = true
    } finally {
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
    show: false
  })
  /**
    * The function of the all wallet action.
    *
    * @returns {Promise<void>}
    */
  async function updateWallet(payload: UpdatePayload, slode: string): Promise<void> {
    updateState.loading = true
    updateState.error = false;
    updateState.show = false;

    try {
      await $api<UpdateResponse>(`${url}/${slode}`, { method: 'PATCH', body: payload })

      getSingleWallet(slode)
    } catch (error) {
      updateState.error = true
    } finally {
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
    show: false
  });
  /**
   * The function of the all wallet type action.
   *
   * @returns {Promise<void>}
   */
  async function getAllWalletType(): Promise<void> {
    typeState.data = [];
    typeState.loading = true;
    typeState.error = false;
    typeState.show = false;

    try {
      const { data } = await $api<WalletTypesResponse>(`${url}/types`, { method: 'POST' });

      if (data) {
        typeState.data = data;
      }
    } catch (error: any) {
      typeState.error = true;
    } finally {
      typeState.loading = false;
      typeState.show = true;
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
    getAllWalletType
  };
});
