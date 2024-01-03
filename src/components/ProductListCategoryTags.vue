<script setup lang="js">
import { onBeforeMount, ref } from "vue"
import axios from "@/plugins/axios"
import CategoryTag from "@/components/Filters/CategoryTag.vue"


defineProps(["category", "cell"])
const emit = defineEmits(["update:category"])

const categories = ref([])
const catModel = ref([])
const checkboxRefs = ref([])

const getCategoriesList = async () => {
	await axios.get("category-list").then(({ data }) => {
		categories.value = data.map((el) => {
			return { ...el, checked: false }
		})
	})
}

const updateCategory = (val) => {
	emit("update:category", val)
}

const onToggleCategories = (index) => {
	checkboxRefs.value[index].toggleCheckbox()
}


onBeforeMount(async () => {
	await getCategoriesList()
})
</script>


<template>

	<div class="category-tags-list" :class="{'category-tags-list--reveal':cell, }">
		<van-checkbox-group v-model="catModel" @change="updateCategory">
			<category-tag v-for="(cat, index) in categories" @click="onToggleCategories(index)"
										:checked="catModel.includes(cat.id)" :key="cat.id"
										:value="cat.id" :ref="el => checkboxRefs[index] = el" :label="cat.name" />

		</van-checkbox-group>
	</div>
</template>

<style scoped lang="scss">
.category-tags-list {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	background-color: var(--bg-primary);
	box-shadow: var(--shadow-4);

	:deep(.van-checkbox-group) {
		@include flex(.4rem, row, start, start);

		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		padding: .8rem 0;

		&::-webkit-scrollbar {
			display: none;
		}
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

