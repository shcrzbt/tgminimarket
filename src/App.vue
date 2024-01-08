<script setup>
import { onMounted, ref } from "vue"
import AppLayout from "@/views/layouts/AppLayout.vue"
import WebApp from "@twa-dev/sdk"

const theme = ref('light')

onMounted(()=> {
	WebApp.backgroundColor = "#fff"
	WebApp.themeParams.bg_color = "#fff"

	WebApp.enableClosingConfirmation()
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
