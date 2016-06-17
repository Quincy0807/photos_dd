<template lang="jade">
fieldset.uk-margin-top.uk-margin-bottom
	span
		span.select-button(@click.stop.prevent= 'uploadFiles')
			b select files
		| &nbsp;or&nbsp;
		b drag files
		template(v-if='detailData.length > 0')
			| &nbsp;or&nbsp;
			input(type='submit', value='submit', @click.stop.prevent='submit')
</template>
