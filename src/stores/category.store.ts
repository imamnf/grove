import type { CategoryState, CategoryResponse } from '@tp/stores/category.types';

export const useCategoryStore = defineStore('category', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/categories`;

  /**
   * Get All Category
   */

  // State
  const state = reactive<CategoryState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });

  // Method
  const getAllCategory = async () => {
    state.data = [];
    state.error = false;
    state.loading = true;
    state.show = false;

    try {
      const { data } = await $api<CategoryResponse>(url, { method: 'POST' });

      state.data = data;
    } catch (error: any) {
      state.error = true;
    } finally {
      state.loading = false;
      state.show = true;
    }
  };

  return {
    state,
    getAllCategory
  };
});
