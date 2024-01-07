<script setup lang="ts">

</script>

<template>
	<div class="empty-header">
		<div class="empty-header_left"></div>

		<div class="empty-header_right"></div>
	</div>
</template>

<style lang="scss">
.empty-header {
	@include flex(0, row, space-between, center);
	padding: 24px 32px;
	position: fixed;
	width: 100%;
	height: 7rem;
	left: 0;
	top: 0;
	z-index: 99;

	&_left {
		@include flex(3.2rem, row, start, center);
	}

	&_right {
		@include flex(1.6rem, row, start, center);
	}
}
</style>
