<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from './Button.svelte';

	let {
		type,
		id = undefined
	}: {
		type: 'file' | 'text';
		id?: string;
	} = $props();

	async function handleClick() {
		let url =
			type === 'file'
				? id
					? `/api/files/${id}`
					: `/api/files`
				: id
					? `/api/text/${id}`
					: `/api/text`;

		await fetch(url, { method: 'DELETE' });
		invalidate('app:load-text-files');
	}
</script>

<Button color="red" icon={{ src: '/bin.svg', alt: 'Trash bin' }} onClick={handleClick} />
