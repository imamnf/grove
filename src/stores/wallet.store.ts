import type {
  Payload,

  // Get All & Single Wallet
  WalletState,
  WalletResponse,

  // Get Wallet Transaction
  WalletTransactionState,
  WalletTransactionResponse,

  // Add Wallet
  AddWalletState,
  AddWalletResponse,

  // Change Status Wallet
  ChangeStatusPayload,
  ChangeStatusState,
  ChangeStatusResponse,

  // Rename Wallet
  RenamePayload,
  RenameState,
  RenameResponse
} from '@tp/stores/wallet.types';

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
   * @property {WalletState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const state = reactive<WalletState>({
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
  const getAllWallet = async (): Promise<void> => {
    state.data = [];
    state.loading = true;
    state.error = false;
    state.show = false;

    try {
      const { data } = await $api<WalletResponse>(url, { method: 'POST' });

      state.data = data;
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
  const getSingleWallet = async (slode: string): Promise<void> => {
    walletState.data = [];
    walletState.loading = true;
    walletState.error = false;
    walletState.show = false;

    try {
      const { data } = await $api<WalletResponse>(`${url}/${slode}`, { method: 'GET' });

      walletState.data = data;
    } catch (error: any) {
      walletState.error = true;
    } finally {
      walletState.loading = false;
      walletState.show = true;
    }
  };

  /********************************
   *                              *
   * -> Get Wallet Transaction <- *
   *                              *
   ********************************/

  /**
   * The state of the wallet transaction store.
   *
   * @property {WalletTransactionState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const walletTransactionState = reactive<WalletTransactionState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });
  /**
   * The function of the wallet transaction action.
   *
   * @param {string} slode - The slug and code of wallet
   * @returns {Promise<void>}
   */
  const getWalletTransaction = async (slode: string): Promise<void> => {
    walletTransactionState.data = [];
    walletTransactionState.loading = true;
    walletTransactionState.error = false;
    walletTransactionState.show = false;

    try {
      const { data } = await $api<WalletTransactionResponse>(`${url}/${slode}/transaction`, {
        method: 'POST'
      });

      walletTransactionState.data = data;
    } catch (error: any) {
      walletTransactionState.error = true;
    } finally {
      walletTransactionState.loading = false;
      walletTransactionState.show = true;
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
  const addState = reactive<AddWalletState>({
    error: false,
    loading: false,
    show: false
  });
  /**
   * The function of the add wallet action.
   *
   * @param {Payload} payload - The payload of adding wallet
   * @returns {Promise<void>}
   */
  const addWallet = async (payload: Payload): Promise<void> => {
    addState.error = false;
    addState.loading = true;
    addState.show = false;
    /**
     * Generate a formatted date string (YYMMDD) from the current date.
     *
     * @returns {string} The formatted date string.
     */
    const formattedDate = (() => {
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');

      return year + month + day;
    })();
    /**
     * Split the type code into two parts and generate
     * a new code by concatenating the first part with
     * the formatted date and the second part.
     *
     * @param {string} code - The type code.
     * @returns {string} The new code.
     */
    const generateCode = (code: string): string => {
      const type = code.split('_');
      const codeArray = type[1].split('');

      return codeArray[0] + formattedDate + codeArray[1];
    };

    const transformPayload = {
      name: payload.name,
      slug: useSlug(payload.name),
      code: `${generateCode(payload.type_code)}-${useRandomString()}`,
      wallet_type_id: Number(payload.type_code.split('_')[0])
    };

    try {
      const { message } = await $api<AddWalletResponse>(`${url}/add`, {
        method: 'POST',
        body: transformPayload
      });

      if (message) {
        addState.show = true;
      }
    } catch (error) {
      addState.error = true;
    } finally {
      addState.loading = false;
    }
  };

  /******************************
   *                            *
   * -> Change Wallet Status <- *
   *                            *
   ******************************/

  /**
   * The state of the change wallet status store.
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const changeStatusState = reactive<ChangeStatusState>({
    error: false,
    loading: false,
    show: false
  });
  /**
   * The function of the change status wallet action.
   *
   * @param {ChangeStatusPayload} payload - The payload of change status wallet
   * @param {string} slode - The slug and code of wallet
   * @returns {Promise<void>}
   */
  const changeStatusWallet = async (payload: ChangeStatusPayload, slode: string): Promise<void> => {
    changeStatusState.error = false;
    changeStatusState.loading = true;
    changeStatusState.show = false;

    try {
      const { message } = await $api<ChangeStatusResponse>(`${url}/status/${slode}`, {
        method: 'POST',
        body: payload
      });

      if (message) {
        changeStatusState.show = true;

        Promise.all([getSingleWallet(slode), getAllWallet()]);
      }
    } catch (error) {
      changeStatusState.error = true;
    } finally {
      changeStatusState.loading = false;
    }
  };

  /***********************
   *                     *
   * -> Rename Wallet <- *
   *                     *
   ***********************/

  /**
   * The state of the rename wallet store.
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const renameState = reactive<RenameState>({
    error: false,
    loading: false,
    show: false
  });
  /**
   * The function of the change status wallet action.
   *
   * @param {RenamePayload} payload - The payload of change status wallet
   * @param {string} slode - The slug and code of wallet
   * @returns {Promise<void>}
   */
  const renameWallet = async (payload: RenamePayload, slode: string): Promise<void> => {
    renameState.error = false;
    renameState.loading = true;
    renameState.show = false;

    try {
      const { message } = await $api<RenameResponse>(`${url}/rename/${slode}`, {
        method: 'POST',
        body: payload
      });

      if (message) {
        renameState.show = true;

        Promise.all([getSingleWallet(slode), getAllWallet()]);
      }
    } catch (error) {
      renameState.error = true;
    } finally {
      renameState.loading = false;
    }
  };

  return {
    // Get All Wallet
    state,
    getAllWallet,

    // Get Single Wallet
    walletState,
    getSingleWallet,

    // Get Wallet Transaction
    walletTransactionState,
    getWalletTransaction,

    // Add Wallet
    addState,
    addWallet,

    // Change Status Wallet
    changeStatusState,
    changeStatusWallet,

    // Rename Wallet
    renameState,
    renameWallet
  };
});
