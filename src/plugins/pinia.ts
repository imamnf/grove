import type { Pinia } from 'pinia'
import type { App } from 'vue'

export const store: Pinia = createPinia()

export default function (app: App): void {
  app.use(store)
}
