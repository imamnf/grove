import type { App } from 'vue';
import type { Pinia } from 'pinia';

export const store: Pinia = createPinia();

export default function (app: App): void {
  app.use(store);
}
