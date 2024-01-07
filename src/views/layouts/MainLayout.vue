<script setup lang="ts">
import SearchHeader from "@/components/layout/SearchHeader.vue"
import BackToTop from "@/components/BackToTop.vue"
</script>

<template>
	<div class="main-layout">
		<search-header />

		<div class="main-layout__content">
			<router-view v-slot="{ Component }">
				<component ref="currentPageRef" :is="Component" />
			</router-view>
		</div>

		<back-to-top />
	</div>
</template>

<style lang="scss">
.main-layout {
	//padding-bottom: 6rem;
}
</style>