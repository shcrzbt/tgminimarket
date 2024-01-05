<script setup lang="js">
import { onBeforeMount, ref } from "vue"
import axios from "@/plugins/axios"
import { useProductStore } from "@/stores/productStore"

const productStore = useProductStore()

defineProps(["category"])
const emit = defineEmits(["update:category"])


const categories = ref([])
const catModel = ref([])

const checkboxRefs = ref([])
const isCheckAll = ref(false)
const isIndeterminate = ref(false)

const getCategoriesList = async () => {
	await axios.get("category-list/").then(({ data }) => {
		categories.value = data.map((el)=> {
			return {...el, checked: false}
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
	checkboxRefs.value[index].toggle()
}
const checkAllChange = (val) => {
	let catlist = []

	for (const catKey in categories.value){
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
	<van-cell-group inset title="Категории" title-style="color: black">


			<van-cell
				clickable
				@click="onCheckAllCellClick"
				title="Выбрать все"
			>
				<template #right-icon>
					<van-checkbox
						v-model="isCheckAll"
						:indeterminate="isIndeterminate"
						@change="checkAllChange"
						@click.stop
					/>
				</template>

			</van-cell>
		<van-checkbox-group v-model="catModel" @change="checkedResultChange">
			<van-cell
				v-for="(cat, index) in categories"
				clickable
				:key="cat.id"
				:title="cat.name"
				@click="onToggleCategories(index)"
			>
				<template #right-icon>
					<van-checkbox
						:name="cat.id"
						:ref="el => checkboxRefs[index] = el"
						@click.stop
					/>
				</template>
			</van-cell>
		</van-checkbox-group>
	</van-cell-group>
</template>

