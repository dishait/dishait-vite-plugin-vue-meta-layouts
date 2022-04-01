import type { Plugin } from 'vite'
import {
	createPluginName,
	createVirtualModuleID,
	createVirtualModuleCode
} from './shared/create'

interface Options {
	/**
	 * layouts dir
	 * @default "src/layouts"
	 */
	target?: string
	/**
	 * default layout
	 * @default "default"
	 */
	defaultLayout?: string
}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	const {
		target = 'src/layouts',
		defaultLayout = 'default'
	} = options || {}

	const { virtualModuleId, resolvedVirtualModuleId } =
		createVirtualModuleID('meta-layouts')
	return {
		name: useName('vue-meta-layouts'),
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return createVirtualModuleCode({
					target,
					defaultLayout
				})
			}
		}
	}
}

export default usePlugin
