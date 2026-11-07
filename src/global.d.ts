import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatDate: (date: Date | string | null | undefined) => string;
  }
}
