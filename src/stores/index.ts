import type { App } from "vue";
import { createPinia } from "pinia";

export function setupPinia(app: App<Element>) {
  app.use(createPinia());
}
