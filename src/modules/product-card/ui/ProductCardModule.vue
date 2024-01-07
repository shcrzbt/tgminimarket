<script setup lang="js">
import { computed } from "vue"
import ProductCardThumb from "@/modules/product-card/components/ProductCardThumb.vue"
import ProductCardDetails from "@/modules/product-card/components/ProductCardDetails.vue"

const props = defineProps(["product", "index"])
defineEmits(["update:search", "cart"])

const getLastWeeksDate = () => {
	const now = new Date()

	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - 6
	)
}

const isNewProduct = computed(() => new Date(props.product.create_time) >= getLastWeeksDate())

const tags = computed(() => {
	let tagsArray = []
	if (props.product.discounted_price) tagsArray.push({ title: "% Скидка" })
	return tagsArray
})

</script>


<template>
	<div class="product-card">
		<product-card-thumb :product="product" :tags="tags" :is-new="isNewProduct" />

		<product-card-details :product="product" />
	</div>
</template>

<style lang="scss" scoped>
.product-card {
	@include flex(1.2rem, column, space-between, start);
	
	width: 100%;
	height: 100%;
}
</style>
