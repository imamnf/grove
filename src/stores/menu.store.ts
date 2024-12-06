/* eslint-disable unused-imports/no-unused-vars */
import type {
  AddResponse,
  AddState,
  Data,
  DeleteResponse,
  DeleteState,
  MenuResponse,
  MenusResponse,
  MenusState,
  MenuState,
  Payload,
  UpdateResponse,
  UpdateState,
} from '@tpStr/menu.types'

import { useToast } from 'primevue/usetoast'

export const useMenuStore = defineStore('menu', () => {
  const toast = useToast()
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/menus`
  /**********************
   *                    *
   * -> Get All Menu <- *
   *                    *
   **********************/
  /**
   * The state of the all menu store
   *
   * @property {boolean} error - The error state of the store
   * @property {boolean} loading - The loading state of the store
   * @property {boolean} show - The show state of the store
   */
  const state = reactive<MenusState>({
    error: false,
    loading: false,
    show: false,
  })
  const menu = useLocalStorage('menu', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: Data[]) => JSON.stringify(v),
    },
  })
  const menuListSidebar = computed(() => {
    return [
      {
        label: 'Home',
        items: menu.value.map(item => ({
          label: item.name,
          icon: item.icon,
          to: item.to,
        })),
      },
    ]
  })
  const menuList = computed(() => {
    return menu.value.map(item => ({
      key: useId(),
      label: item.name,
      data: item.slug,
      icon: item.icon,
    }))
  })
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function getAllMenu(): Promise<void> {
    state.loading = true
    state.error = false
    state.show = false

    try {
      const { status, data } = await $api<MenusResponse>(
        url,
        { method: 'POST' },
      )

      if (status === 200) {
        menu.value = data.data
      }
    }
    catch (e: any) {
      state.error = true
    }
    finally {
      state.loading = false
      state.show = true
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
    show: false,
  })
  const menuSingleList = computed(() => {
    return menuState.data?.map((item) => {
      const toData = item.to.split('/').slice(1)
      const iconData = item.icon.split(' ').slice(1)

      return {
        name: item.name,
        slug: item.slug,
        to: toData.length === 1 ? toData[0] : toData[1],
        icon: iconData[0],
      }
    })[0]
  })

  // Action
  async function getSingleMenu(slug: string) {
    menuState.data = []
    menuState.loading = true
    menuState.error = false
    menuState.show = false

    try {
      const { data, status } = await $api<MenuResponse>(
        `${url}/${slug}`,
        { method: 'GET' },
      )

      if (status === 200) {
        menuState.data = data.data
      }
    }
    catch (e: any) {
      menuState.error = true
    }
    finally {
      menuState.loading = false
      menuState.show = true
    }
  };

  /**
   *  Add Menu
   */

  // State
  const addState = reactive<AddState>({
    error: false,
    loading: false,
    show: false,
  })

  // Action
  async function addMenu(payload: Payload) {
    addState.loading = true
    addState.error = false
    addState.show = false

    try {
      const { data, status } = await $api<AddResponse>(
        `${url}/add`,
        { method: 'POST', body: payload },
      )

      if (status === 201) {
        toast.add({
          severity: 'success',
          summary: 'Add Menu Successful!',
          detail: data.message,
          life: 3000,
        })

        getAllMenu()
      }
    }
    catch (e: any) {
      addState.error = true
    }
    finally {
      addState.loading = false
      addState.show = true
    }
  };

  /**
   *  Update Menu
   */

  // State
  const updateState = reactive<UpdateState>({
    error: false,
    loading: false,
    show: false,
  })

  // Action
  async function updateMenu(payload: Payload, slug: string) {
    updateState.loading = true
    updateState.error = false
    updateState.show = false

    try {
      const { data, status } = await $api<UpdateResponse>(
        `${url}/${slug}`,
        { method: 'PATCH', body: payload },
      )

      if (status === 200) {
        toast.add({
          severity: 'info',
          summary: 'Update Menu Successful!',
          detail: data.message,
          life: 3000,
        })

        getAllMenu()
      }
    }
    catch (e: any) {
      updateState.error = true
    }
    finally {
      updateState.loading = false
      updateState.show = true
    }
  };

  /**
   *  Delete Menu
   */

  // State
  const deleteState = reactive<DeleteState>({
    error: false,
    loading: false,
    show: false,
  })

  // Action
  async function deleteMenu(slug: string) {
    deleteState.loading = true
    deleteState.error = false
    deleteState.show = false

    try {
      const { data, status } = await $api<DeleteResponse>(
        `${url}/${slug}`,
        { method: 'DELETE' },
      )

      if (status === 200) {
        toast.add({
          severity: 'error',
          summary: 'Delete Menu Successful!',
          detail: data.message,
          life: 3000,
        })

        getAllMenu()
      }
    }
    catch (e: any) {
      deleteState.error = true
    }
    finally {
      deleteState.loading = false
      deleteState.show = true
    }
  };

  return {
    // Get All Menu
    state,
    getAllMenu,
    menuListSidebar,
    menuList,
    // Get Single Menu
    menuState,
    getSingleMenu,
    menuSingleList,
    // Add Menu
    addState,
    addMenu,
    // Update Menu
    updateState,
    updateMenu,
    // Delete Menu
    deleteState,
    deleteMenu,
  }
})
