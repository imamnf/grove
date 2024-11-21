import type {
  Payload,
  Data,

  // Get All Menu
  MenusState,
  MenusResponse,

  // Get Single Menu
  MenuState,
  MenuResponse,

  // Add Menu
  AddState,
  AddResponse,

  // Update Menu
  UpdateState,
  UpdateResponse,

  // Delete Menu
  DeleteState,
  DeleteResponse
} from '@tp/stores/menu.types';

export const useMenuStore = defineStore('menu', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/menus`;

  /**
   *  Get All Menu
   */

  // State
  const state = reactive<MenusState>({
    error: false,
    loading: false,
    show: false
  });
  const menu = useLocalStorage('menu', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: Data[]) => JSON.stringify(v)
    }
  });
  const menuList = computed(() => {
    return [
      {
        label: 'Home',
        items: menu.value.map((item) => ({
          label: item.name,
          icon: item.icon,
          to: item.to
        }))
      }
    ];
  });

  // Action
  const getAllMenu = async () => {
    state.loading = true;
    state.error = false;
    state.show = false;

    try {
      const { data } = await $api<MenusResponse>(url, { method: 'POST' });

      if (data) {
        menu.value = data;
      }
    } catch (e: any) {
      console.error(e.data?.message);
      state.error = true;
    } finally {
      state.loading = false;
      state.show = true;
    }
  };

  /**
   *  Get Single Menu
   */

  // State
  const menuState = reactive<MenuState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });

  // Action
  const getSingleMenu = async (slug: string) => {
    menuState.data = [];
    menuState.loading = true;
    menuState.error = false;
    menuState.show = false;

    try {
      const { data } = await $api<MenuResponse>(`${url}/${slug}`, { method: 'GET' });

      if (data) {
        menuState.data = data;
      }
    } catch (e: any) {
      console.error(e.data?.message);
      menuState.error = true;
    } finally {
      menuState.loading = false;
      menuState.show = true;
    }
  };

  /**
   *  Add Menu
   */

  // State
  const addState = reactive<AddState>({
    error: false,
    loading: false,
    show: false
  });

  // Action
  const addMenu = async (payload: Payload) => {
    addState.loading = true;
    addState.error = false;
    addState.show = false;

    try {
      await $api<AddResponse>(`${url}/add`, {
        method: 'POST',
        body: payload
      });

      getAllMenu()
    } catch (e: any) {
      console.error(e.data?.message);
      addState.error = true;
    } finally {
      addState.loading = false;
      addState.show = true;
    }
  };

  /**
   *  Update Menu
   */

  // State
  const updateState = reactive<UpdateState>({
    error: false,
    loading: false,
    show: false
  });

  // Action
  const updateMenu = async (slug: string, payload: Payload) => {
    updateState.loading = true;
    updateState.error = false;
    updateState.show = false;

    try {
      await $api<UpdateResponse>(`${url}/${slug}`, {
        method: 'PATCH',
        body: payload
      });
    } catch (e: any) {
      console.error(e.data?.message);
      updateState.error = true;
    } finally {
      updateState.loading = false;
      updateState.show = true;
    }
  };

  /**
   *  Delete Menu
   */

  // State
  const deleteState = reactive<DeleteState>({
    error: false,
    loading: false,
    show: false
  });

  // Action
  const deleteMenu = async (slug: string) => {
    deleteState.loading = true;
    deleteState.error = false;
    deleteState.show = false;

    try {
      await $api<DeleteResponse>(`${url}/${slug}`, { method: 'DELETE' });
    } catch (e: any) {
      console.error(e.data?.message);
      deleteState.error = true;
    } finally {
      deleteState.loading = false;
      deleteState.show = true;
    }
  };

  return {
    // Get All Menu
    state,
    getAllMenu,
    menuList,

    // Get Single Menu
    menuState,
    getSingleMenu,

    // Add Menu
    addState,
    addMenu,

    // Update Menu
    updateState,
    updateMenu,

    // Delete Menu
    deleteState,
    deleteMenu
  };
});
