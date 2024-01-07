import { ref } from "vue"
import { defineStore } from "pinia"

export const useLayoutStore = defineStore("layout", () => {
	const searchValue = ref("")


	function setSearchValue(val) {
		searchValue.value = val
	}

	return { searchValue,  setSearchValue }
})
