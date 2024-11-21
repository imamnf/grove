import type { StatusState, StatusResponse } from '@tp/stores/status.types';

export const useStatusStore = defineStore('status', () => {
  /**
   * The base URL for all API requests.
   *
   * @type {string}
   */
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/statuses`;

  /**
   * Get All Transaction Status
   */

  // State
  const state = reactive<StatusState>({
    data: [],
    error: false,
    loading: false,
    show: false
  });

  // Method
  const getAllStatus = async () => {
    state.data = [];
    state.error = false;
    state.loading = true;
    state.show = false;

    try {
      const { data } = await $api<StatusResponse>(url, { method: 'POST' });

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
    getAllStatus
  };
});
