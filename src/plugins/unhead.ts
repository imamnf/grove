import type { App } from 'vue'
import { createHead, type MergeHead, type VueHeadClient } from '@unhead/vue'

export const head: VueHeadClient<MergeHead> = createHead()

export default function (app: App): void {
  app.use(head)
}
