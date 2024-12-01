import type { App } from 'vue'

/**
 * Registers all plugins in the `src/plugins` directory.
 *
 * Uses `import.meta.glob` to import all files in the `src/plugins` directory,
 * and then registers each plugin with the Vue app.
 *
 * The sort order of the plugins is determined by the file name.
 *
 * @param app The Vue app to register the plugins with.
 */
export function registerPlugins(app: App<Element>): void {
  const imports: Record<string, { default: (app: App<Element>) => void }> = import.meta.glob(
    ['@/plugins/*.{ts,js}', '@/plugins/*/index.{ts,js}'],
    { eager: true },
  )

  const importPaths: string[] = Object.keys(imports).sort()

  importPaths.forEach((path: string) => {
    const pluginImportModule: { default: (app: App<Element>) => void } = imports[path]

    pluginImportModule.default?.(app)
  })
}
