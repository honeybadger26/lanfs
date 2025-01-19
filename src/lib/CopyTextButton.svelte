<script lang="ts">
	import Button from './Button.svelte';

	let { text }: { text: string } = $props();
</script>

<Button
	icon={{ src: '/copy.svg', alt: 'Copy documents' }}
	onClick={() => {
		navigator.clipboard.writeText(text);
	}}
/>
