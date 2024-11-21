import type { Router } from 'vue-router/auto';

/**
 * Sets up route guards for the given router.
 *
 * The guards check the following:
 *
 * - If the route is public, the guard does nothing.
 * - If the route requires a registration success, the guard checks if the user has
 *   successfully registered. If not, the guard navigates back.
 * - If the route requires authentication, the guard checks if the user is logged in.
 *   If not, the guard navigates to the sign-in page.
 */
export const setupGuards = (router: Router) => {
  router.beforeEach((to) => {
    if (to.meta.public) {
      return;
    }

    const isRegistrationSuccess = ref(localStorage.getItem('isRegistrationSuccess'));

    if (to.meta.registrationSuccess && !isRegistrationSuccess) {
      router.back();
    }

    const isLoggedIn = ref(localStorage.getItem('users'));

    if (to.meta.requiredAuth) {
      if (!isLoggedIn) {
        return '/sign-in';
      }
    }
  });
};
