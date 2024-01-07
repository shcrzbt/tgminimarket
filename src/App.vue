<script setup>
import { onMounted, ref } from "vue"
import AppLayout from "@/views/layouts/AppLayout.vue"

const theme = ref('light')

onMounted(()=> {
	// theme.value = WebApp.colorScheme
	//
	// WebApp.onEvent('themeChanged', ()=> {
	// 	theme.value = WebApp.colorScheme
	// })
	//
	// WebApp.onEvent('popupClosed', (e)=> {
	// 	e.preventDefault()
	// 	let isBoss = confirm("Вы уверены, что хотите закрыть?");
	//
	//
	// 	if (isBoss) WebApp.close()
	// })

})

</script>

<template>
	<van-config-provider :theme="theme">
		<app-layout />
	</van-config-provider>
</template>
