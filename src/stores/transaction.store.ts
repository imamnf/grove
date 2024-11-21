import type {
  Payload,
  // Transaction All & Single
  TransactionState,
  TransactionResponse
} from '@tp/stores/transaction.types';

export const useTransactionStore = defineStore('transaction', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/transactions`;

  /*****************************
   *                           *
   * -> Get All Transaction <- *
   *                           *
   *****************************/

  /**
   * The state of the all transaction store.
   *
   * @property {TransactionState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const state = reactive<TransactionState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });

  /**
   * The function of the all transaction action.
   *
   * @returns {Promise<void>}
   */
  const getAllTransaction = async (): Promise<void> => {
    state.loading = true;
    state.error = false;
    state.show = false;

    try {
      const { data } = await $api<TransactionResponse>(url, { method: 'POST' });

      state.data = data;
    } catch (error: any) {
      state.error = true;
    } finally {
      state.loading = false;
      state.show = true;
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
   * @property {null} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const addState = reactive({
    error: false,
    loading: false,
    show: false
  });

  // action
  const addTransaction = async (payload: Payload) => {
    addState.error = false;
    addState.loading = true;
    addState.show = false;

    const formattedDate = (() => {
      const today = payload.date;
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');

      return year + month + day;
    })();

    const transformPayload =
      payload.transfer_id !== 0
        ? [
            {
              name: payload.name,
              slug: useSlug(payload.name),
              code: `${formattedDate}-${useRandomString(25)}`,
              description: payload.description,
              amount: Number(payload.amount),
              date: payload.date,
              status_id: 3,
              category_id: payload.category_id,
              wallet_id: payload.wallet_id
            },
            {
              name: payload.name,
              slug: useSlug(payload.name),
              code: `${formattedDate}-${useRandomString(25)}`,
              description: payload.description,
              amount: Number(payload.amount),
              date: payload.date,
              status_id: 2,
              category_id: payload.category_id,
              wallet_id: payload.wallet_id
            },
            {
              name: payload.name,
              slug: useSlug(payload.name),
              code: `${formattedDate}-${useRandomString(25)}`,
              description: payload.description,
              amount: Number(payload.amount),
              date: payload.date,
              status_id: 1,
              category_id: payload.category_id,
              wallet_id: payload.transfer_id
            }
          ]
        : [
            {
              name: payload.name,
              slug: useSlug(payload.name),
              code: `${formattedDate}-${useRandomString(25)}`,
              description: payload.description,
              amount: Number(payload.amount),
              date: payload.date,
              status_id: payload.status_id,
              category_id: payload.category_id,
              wallet_id: payload.wallet_id
            }
          ];

    try {
      const { message } = await $api(`${url}/add`, {
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

  /****************************
   *                          *
   * -> Update Transaction <- *
   *                          *
   ****************************/

  /**
   * The state of the add transaction store.
   *
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const updateState = reactive({
    error: false,
    loading: false,
    show: false
  });

  const updateTransaction = async (payload: Payload, slode: string) => {
    updateState.error = false;
    updateState.loading = true;
    updateState.show = false;

    const formattedDate = (() => {
      const today = payload.date;
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');

      return year + month + day;
    })();

    const transformPayload = {
      id: payload.id,
      name: payload.name,
      slug: useSlug(payload.name),
      code: `${formattedDate}-${useRandomString(25)}`,
      description: payload.description,
      amount: Number(payload.amount),
      date: payload.date,
      status_id: payload.status_id,
      category_id: payload.category_id,
      wallet_id: payload.wallet_id
    };

    try {
      const { message } = await $api(`${url}/${slode}`, {
        method: 'PUT',
        body: transformPayload
      });

      if (message) {
        updateState.show = true;
      }
    } catch (error) {
      updateState.error = true;
    } finally {
      updateState.loading = false;
    }
  };

  return {
    // Get All Transaction
    state,
    getAllTransaction,

    // Add Transaction
    addState,
    addTransaction,

    // Update Transaction
    updateState,
    updateTransaction
  };
});
