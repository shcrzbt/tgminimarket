import { ref } from "vue"
import { defineStore } from "pinia"

export const useProductStore = defineStore("product", () => {
	const categories = ref([])
	const categoriesLoading = ref(false)

	function setCategories(cats) {
		categories.value = cats
	}	function setCategoriesLoading(loading) {
		categoriesLoading.value = loading
	}

	return { categories, setCategories, setCategoriesLoading}
})
