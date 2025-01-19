<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from './Button.svelte';

	let text = $state('');

	async function submitText() {
		await fetch('/api/text', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text })
		});

		text = '';
		invalidate('app:load-text-files');
	}
</script>

<div class="flex max-w-xl grow">
	<textarea placeholder="Enter text" class="min-h-8 w-full text-black" bind:value={text}></textarea>
	<Button icon={{ src: '/upload.svg', alt: 'Upload symbol' }} onClick={submitText} />
</div>
