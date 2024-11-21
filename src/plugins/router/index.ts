import type { App } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes as RouteRecordRaw[])
});

export { router };

export default function (app: App<Element>): void {
  app.use(router);
}
