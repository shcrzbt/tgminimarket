<script setup>
import { RouterView } from "vue-router"
import { onMounted, ref } from "vue"

const theme = ref('light')

onMounted(()=> {
	WebApp.themeVars.buttonColor = "#96D1C7"
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
	<RouterView />
	</van-config-provider>
</template>
