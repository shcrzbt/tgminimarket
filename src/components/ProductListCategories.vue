<script setup lang="js">
import { onBeforeMount, ref } from "vue"
import axios from "@/plugins/axios"
import CategoriesItem from "@/components/Filters/CategoriesItem.vue"


defineProps(["category", "cell"])
const emit = defineEmits(["update:category"])


const categories = ref([])
const catModel = ref([])

const checkboxRefs = ref([])
const isCheckAll = ref(false)
const isIndeterminate = ref(false)

const getCategoriesList = async () => {
	await axios.get("categories").then(({ data }) => {
		categories.value = data.map((el) => {
			return { ...el, checked: false }
		})
	})
}

const checkedResultChange = (value) => {
	const checkedCount = value.length
	isCheckAll.value = checkedCount === categories.value.length
	isIndeterminate.value = checkedCount > 0 && checkedCount < categories.value.length
	updateCategory(value)
}
const updateCategory = (val) => {
	emit("update:category", val)
}

const onToggleCategories = (index) => {
	checkboxRefs.value[index].toggleCheckbox()
}
const checkAllChange = (val) => {
	let catlist = []

	for (const catKey in categories.value) {
		catlist.push(categories.value[catKey].id)
	}

	catModel.value = val ? catlist : []
	isIndeterminate.value = false
}
const onCheckAllCellClick = () => isCheckAll.value = !isCheckAll.value

onBeforeMount(async () => {
	await getCategoriesList()
})
</script>


<template>
	<div class="categories-list" :class="{'categories-list--cell':cell}">
		<van-checkbox-group v-model="catModel" @change="checkedResultChange">

			<categories-item v-for="(cat, index) in categories" @click="onToggleCategories(index)"
											 :checked="catModel.includes(cat.id)" :key="cat.id" :cell="cell"
											 :value="cat.id" :ref="el => checkboxRefs[index] = el" :label="cat.name" />
			<!--					<van-checkbox-->
			<!--						:name="cat.id"-->
			<!--						:ref="el => checkboxRefs[index] = el"-->
			<!--						@click.stop-->
			<!--					/>-->
		</van-checkbox-group>
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

	&:not(.categories-list--cell) :deep(.van-checkbox-group) {
		@include flex(.4rem, row, start, start);

		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		padding: 8px 0 12px 0;
		clip-path: inset(0 0 10px 0);

	}

	:deep(.van-checkbox-group:after) {
		content: 'f';
		opacity: 0;
		display: block;
		width: 12px;
		height: 12px;

	}

	&::-webkit-scrollbar {
		display: none;
	}
}
</style>

