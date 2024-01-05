import { ref } from "vue"
import { defineStore } from "pinia"

export const useProductStore = defineStore("product", () => {
	const categories = ref([])
	const categoriesLoading = ref(false)
	const selectedCategories = ref([])

	function setCategories(cats) {
		categories.value = cats
	}
	function setCategoriesLoading(loading) {
		categoriesLoading.value = loading
	}
	function setSelectedCategories(cats) {
		selectedCategories.value = cats
	}

	return { categories, selectedCategories, setSelectedCategories, setCategories, setCategoriesLoading}
})
