<script setup lang="js">
import { computed, ref } from "vue"
import CategoriesItem from "@/components/Filters/CategoriesItem.vue"
import { useProductStore } from "@/stores/productStore"

const productStore = useProductStore()

defineProps(["category", "cell"])

const emit = defineEmits(["update:category"])

const catModel = computed({
  get: ()=> productStore.selectedCategories,
  set:(val)=> productStore.setSelectedCategories(val)
})

const checkboxRefs = ref([])

const updateCategory = (val) => {
  productStore.setSelectedCategories(val)
	emit("update:category", val)
}
const onToggleCategories = (index) => {
	checkboxRefs.value[index].toggleCheckbox()
}

</script>


<template>
	<div class="categories-list" :class="{'categories-list--cell':cell}">
		<van-checkbox-group v-if="!productStore.categoriesLoading" v-model="catModel" @change="updateCategory">

			<categories-item v-for="(cat, index) in productStore.categories" @click="onToggleCategories(index)"
											 :checked="catModel.includes(cat.id)" :image="cat.image" :key="cat.id" :cell="cell"
											 :value="cat.id" :ref="el => checkboxRefs[index] = el" :label="cat.name" />
		</van-checkbox-group>
		<div v-else class="categories-skeleton-list" >
			<categories-skeleton v-for="cat in 10"  />
		</div>
	</div>
</template>

<style scoped lang="scss">
.categories-list {
	width: 100%;

	&--cell:deep(.van-checkbox-group) {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: .8rem;
		width: 100%;
		overflow: hidden;
		flex-wrap: wrap;
		padding: 8px;
		clip-path: none;

	}

	:deep(.van-checkbox-group::-webkit-scrollbar)  {
      display: none;
	}

  &:not(.categories-list--cell) :deep(.van-checkbox-group) {
		@include flex(.4rem, row, start, start);

		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		//padding: 8px 0 12px 0;

	}

	:deep(.van-checkbox-group:after) {
		content: 'f';
		opacity: 0;
		display: block;
		width: 12px;
		height: 12px;

	}


}
</style>

