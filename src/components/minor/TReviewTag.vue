<script setup>
defineProps(["review"])
</script>

<template>
	<div class="t-review-tag">
		<div class="t-review-tag__stars">
			<van-icon name="star" color="var(--orange)"></van-icon>
			4.9
		</div>

		<div class="t-review-tag__count">(77 &nbspOценок)</div>
	</div>
</template>

<style scoped lang="scss">
.t-review-tag {
	@include flex(.8rem, row, start, center);
	@include getFont('p4');

	font-weight: 200 !important;
	box-shadow: var(--shadow-1);
	border: 1px solid var(--bg-secondary-3);
	background-color: var(--bg-primary);
	padding: .4rem .8rem;
	border-radius: .8rem;
	white-space: nowrap;

	&__stars {

		color: var(--gs-100);
	}

	&__count {

		color: var(--main-secondary-2);
	}
}
</style>