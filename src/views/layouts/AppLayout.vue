<script setup>
import MainLayout from "./MainLayout.vue"
import EmptyLayout from "./EmptyLayout.vue"

import { markRaw, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const layout = ref()

watch(
	() => route.meta?.layout,
	async (metaLayout) => {
		try {
			switch (metaLayout) {
				case 'MainLayout':
					layout.value = markRaw(MainLayout)
					break;
				default:
					layout.value = markRaw(EmptyLayout)
					break;
			}
		} catch (e) {
			layout.value = markRaw(EmptyLayout)
		}
	},
	{ immediate: true }
)
</script>

<template>
	<component :is="layout">
		<router-view v-slot="{ Component, route }">
			<transition>
				<component :is="Component" :key="route.path" />
			</transition>
		</router-view>
	</component>
</template>