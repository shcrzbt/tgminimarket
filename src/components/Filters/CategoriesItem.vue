<script setup lang="js">
import { onMounted, ref } from "vue"
import { CATEGORIES_UI_MAP } from "@/utils/constants"
import WebApp from "@twa-dev/sdk"


const props = defineProps(["value", "checked", "label", "icon"])
// const emit = defineEmits(["update:category"])
const chbxRef = ref(null)

const toggleCheckbox = () => {
	WebApp.HapticFeedback.impactOccurred("heavy")
	if (chbxRef.value)
		chbxRef.value.toggle()
}

defineExpose({
	toggleCheckbox
})

onMounted(() => {
	if (chbxRef.value)
		chbxRef.value.shown = false
})
</script>


<template>
	<div class="category-item">
		<div class="category-item__icon"
				 :style="{  color: CATEGORIES_UI_MAP[value].color }">
<!--			<component :is="CATEGORIES_UI_MAP[value].icon" />-->
			<img :src="CATEGORIES_UI_MAP[value].img" alt="" srcset="">
		</div>
		<div class="category-item__label van-ellipsis" :class="{'category-item__label--checked': checked}">
			{{ label }}
		</div>
		<van-checkbox
			style="display:none"
			:name="value"
			ref="chbxRef"
			@click.stop
		/>
	</div>
</template>

<style scoped lang="scss">
.category-item {
	@include flex(.8rem, column, center, center);
	cursor: pointer;
	max-width: 84px;

	&:first-child {
		margin-left: 12px;
	}

	&:last-child {
		margin-right: 24px;
	}

	&__icon {
		@include flex(0, column, center, center);

		width: 64px;
		height: 64px;
		border-radius: 50%;
		padding: 4px;
		background-color: var(--bg-primary);
		overflow: hidden;

		svg {
			font-size: 24px;
			width: 24px;
			height: 24px;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&__label {
		@include getFont('p4');
		font-size: 12px;
		display: block;
		color: black;
		text-align: center;
		padding: .2rem .8rem;
		border-radius: 12px;
		max-width: 100%;

		&:not(.category-item__label--checked) {
			background-color: transparent !important;
		}

		&--checked {
			background-color: var(--main-secondary);
			color: var(--bg-primary);
		}
	}


}

</style>

