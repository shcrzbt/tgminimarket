<script setup>

import ProductCardThumbTags from "@/modules/product-card/components/ProductCardThumbTags.vue"

defineProps(["product", "tags", "isNew"])

</script>

<template>
	<div class="product-card__thumb">
		<lazy-component style="width:100%; height:100%">
			<van-image
				lazy-load
				:src="product?.image1"
				v-lazy="product?.image1"
			/>
		</lazy-component>


		<div class="tag-new" v-if="isNew"> Новинка</div>
		<product-card-thumb-tags v-if="tags?.length" :tags="tags" />

	</div>
</template>

<style scoped lang="scss">

@media (min-width : 768px) {
	.product-card__thumb {
		height: 36.6rem !important;
	}
}

.product-card__thumb {
	width: 100%;
	//height: 16.2rem;
	height: calc((100svw - 3.6rem)/2);
	position: relative;
	background-color: var(--bg-primary);
	border-radius: 1.6rem;
	overflow: hidden;

	.tag-new {
		position: absolute;
		top: 1.8rem;
		right: 0;
		transform-origin: center;
		transform: rotate(45deg) scale(.7);
		padding: .4rem .8rem;
		background-color: var(--red);
		color: var(--bg-primary);
		border-radius: .6rem;
	}

	:deep(.van-image) {
		width: 100%;
		height: 100%;
		border-radius: .8rem !important;
		overflow: hidden;

		img {
			object-fit: contain;
		}
	}

}


</style>