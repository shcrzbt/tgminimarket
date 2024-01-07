<script setup>
import TTag from "@/components/minor/TTag.vue"
import TReviewTag from "@/components/minor/TReviewTag.vue"

defineProps(["tags", "hideReview"])
</script>

<template>
	<div v-if="tags.length" class="product-view-tags">

		<div class="product-view-tags__auto">
			<t-review-tag v-if="!hideReview" />
		</div>
		<div class="product-view-tags__scrollable">
			<div class="product-view-tags__scrollable-content">
				<t-tag v-for="(tag, i) in tags" :key="`t-tag-${i}`" :tag="tag" />

			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$scroll-container-negative-margin: .6rem;

.product-view-tags {
	@include flex(0, row, start, center);

	//flex-wrap: wrap;
	max-width: calc(100% + var(--side-padding));
	padding: 0 0 .8rem 0;
	margin: 0 0 -0.8rem 0;

	&__auto {
		flex: 0 0 auto;
		width: auto;
	}

	&__scrollable {
		flex: 1 0 0%;

		&-content {
			@include flex(.8rem, row, start, center);
			overflow-x: auto;
			width: 100%;

			margin-left: calc(0rem - $scroll-container-negative-margin);
			//margin-right: calc(0rem - var(--side-padding));

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}


	.t-review-tag {
		z-index: 9;
	}

	.t-tag {
		z-index: 1;

		&:first-of-type {
			margin-left: calc(var(--side-padding) + $scroll-container-negative-margin);;
		}

		&:last-of-type {
			margin-right: var(--side-padding);
		}
	}


}

</style>