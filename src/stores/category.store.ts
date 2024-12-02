import type { CategoryResponse, CategoryState } from '@tpStr/category.types'

export const useCategoryStore = defineStore('category', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/categories`

  /**
   * Get All Category
   */

  // State
  const state = reactive<CategoryState>({
    data: [],
    error: false,
    loading: false,
    show: false,
  })

  // Method
  const getAllCategory = async () => {
    state.data = []
    state.error = false
    state.loading = true
    state.show = false

    try {
      const { data, status } = await $api<CategoryResponse>(url, { method: 'POST' })

      if (status === 200) {
        state.data = data.data
      }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error: any) {
      state.error = true
    }
    finally {
      state.loading = false
      state.show = true
    }
  }

  return {
    state,
    getAllCategory,
  }
})
