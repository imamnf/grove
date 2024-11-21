import {
  Payload,

  // Get All & Single Type
  TypeState,
  TypeResponse,

  // Add Type
  AddState,
  AddResponse,

  // Update Type
  UpdateState,
  UpdateResponse,

  // Delete Type
  DeleteState,
  DeleteResponse
} from '@tp/stores/type.types';

export const useTypeStore = defineStore('type', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/types`;

  /*****************************
   *                           *
   * -> Get All Wallet Type <- *
   *                           *
   *****************************/

  /**
   * The state of the all wallet type store.
   *
   * @property {TypeState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const state = reactive<TypeState>({
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
  const getAllType = async (): Promise<void> => {
    state.data = [];
    state.loading = true;
    state.error = false;
    state.show = false;

    try {
      const { data } = await $api<TypeResponse>(url, { method: 'POST' });

      state.data = data;
    } catch (error: any) {
      state.error = true;
    } finally {
      state.loading = false;
      state.show = true;
    }
  };

  /********************************
   *                              *
   * -> Get Single Wallet Type <- *
   *                              *
   ********************************/

  /**
   * The state of the single wallet type store.
   *
   * @property {TypeState['data']} data - The data of the store.
   * @property {boolean} error - The error state of the store.
   * @property {boolean} loading - The loading state of the store.
   * @property {boolean} show - The show state of the store.
   */
  const typeState = reactive<TypeState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });

  /**
   * The function of the single wallet type action.
   *
   * @param {string} slug - The slug of wallet type
   * @returns {Promise<void>}
   */
  const getSingleType = async (slug: string): Promise<void> => {
    typeState.data = [];
    typeState.loading = true;
    typeState.error = false;
    typeState.show = false;

    try {
      const { data } = await $api<TypeResponse>(`${url}/${slug}`, { method: 'GET' });

      typeState.data = data;
    } catch (error: any) {
      typeState.error = true;
    } finally {
      typeState.loading = false;
      typeState.show = true;
    }
  };

  /*************************
   *                       *
   * -> Add Wallet Type <- *
   *                       *
   *************************/

  /**
   * The state of the add wallet type store.
   *
   * @property {null} data - The data of the store.
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
   * The function of the add wallet type action.
   *
   * @param {Payload} payload - The payload of adding wallet type
   * @returns {Promise<void>}
   */
  const addType = async (payload: Payload): Promise<void> => {
    addState.loading = true;
    addState.error = false;
    addState.show = false;

    const transformPayload = {
      name: payload.name,
      slug: useSlug(payload.name),
      code: payload.code
    };

    try {
      const { message } = await $api<AddResponse>(`${url}/add`, { method: 'POST', body: transformPayload });

      if (message) {
        addState.show = true;
      }
    } catch (error: any) {
      addState.error = true;
    } finally {
      addState.loading = false;
    }
  };

  /**
   *  Update Type
   */

  // State
  const updateState = reactive<UpdateState>({
    error: false,
    loading: false,
    show: false
  });

  /**
   * Update Type
   * @param {string} slug - Slug of type
   * @param {Payload} payload - Payload of type
   * @returns {Promise<void>}
   */
  const updateType = async (slug: string, payload: Payload): Promise<void> => {
    updateState.loading = true;
    updateState.error = false;
    updateState.show = false;

    const transformPayload = {
      name: payload.name,
      slug: useSlug(payload.name),
      code: payload.code
    };

    try {
      $api<UpdateResponse>(`${url}/${slug}`, { method: 'PUT', body: transformPayload });
    } catch (error: any) {
      updateState.error = true;
    } finally {
      updateState.loading = false;
      updateState.show = true;
    }
  };

  /**
   *  Delete Type
   */

  // State
  const deleteState = reactive<DeleteState>({
    error: false,
    loading: false,
    show: false
  });

  /**
   * Delete Type
   * @param {string} slug - Slug of type
   * @returns {Promise<void>}
   */
  const deleteType = async (slug: string): Promise<void> => {
    deleteState.loading = true;
    deleteState.error = false;
    deleteState.show = false;

    try {
      await $api<DeleteResponse>(`${url}/${slug}`, { method: 'DELETE' });
    } catch (error: any) {
      deleteState.error = true;
    } finally {
      deleteState.loading = false;
      deleteState.show = true;
    }
  };

  return {
    // Get All Wallet Type
    state,
    getAllType,

    // Get Single Wallet Type
    typeState,
    getSingleType,

    // Add Type
    addState,
    addType,

    // Update Type
    updateState,
    updateType,

    // Delete Type
    deleteState,
    deleteType
  };
});
