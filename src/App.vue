<script setup>
import { RouterView } from "vue-router"
import WebApp from "@twa-dev/sdk"
import { onMounted, ref } from "vue"

const theme = ref('light')

onMounted(()=> {
	theme.value = WebApp.colorScheme

	WebApp.onEvent('themeChanged', ()=> {
		theme.value = WebApp.colorScheme
	})

	WebApp.onEvent('popupClosed', (e)=> {
		e.preventDefault()
		let isBoss = confirm("Вы уверены, что хотите закрыть?");


		if (isBoss) WebApp.close()
	})

})

</script>

<template>
	<van-config-provider :theme="theme">
	<RouterView />
	</van-config-provider>
</template>
