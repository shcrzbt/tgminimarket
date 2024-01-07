<script setup lang="ts">
import BaseHeader from "@/components/layout/BaseHeader.vue"
</script>
<template>
	<div class="empty-layout">
		<div class="empty-header">
			<BaseHeader />
		</div>
		<div class="container">
			<router-view />
		</div>
	</div>
</template>
<style scoped lang="scss">
.empty-layout {
	padding-top: calc(9.6rem + 4.8rem);
}
</style>