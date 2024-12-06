import type { DashboardResponse, DashboardState, Data } from '@tpStr/dashboard.types'

export const useDashboardStore = defineStore('dashboard', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/dashboard`
  /***********************
   *                     *
   * -> Get Dashboard <- *
   *                     *
   ***********************/
  /**
   * The state of the all menu store
   *
   * @property {boolean} error - The error state of the store
   * @property {boolean} loading - The loading state of the store
   * @property {boolean} show - The show state of the store
   */
  const state = reactive<DashboardState>({
    error: false,
    loading: false,
    show: false,
  })
  const dashboard = useLocalStorage('dashboard', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: Data) => JSON.stringify(v),
    },
  })
  /**
   * The function of the all wallet action.
   *
   * @returns {Promise<void>}
   */
  async function getDashboard(): Promise<void> {
    state.loading = true
    state.error = false
    state.show = false

    try {
      const { status, data } = await $api<DashboardResponse>(
        url,
        { method: 'POST' },
      )

      if (status === 200) {
        dashboard.value = data.data
      }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e: any) {
      state.error = true
    }
    finally {
      state.loading = false
      state.show = true
    }
  }

  return {
    state,
    dashboard,
    getDashboard,
  }
})
