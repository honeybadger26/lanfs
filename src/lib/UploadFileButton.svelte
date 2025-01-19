<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { ChangeEventHandler } from 'svelte/elements';

	let numFilesUploaded: number | undefined = $state();
	let numTotalFiles: number | undefined = $state();

	const onchange: ChangeEventHandler<HTMLInputElement> = async (event) => {
		const { files } = event.currentTarget;
		if (!files) return;

		numFilesUploaded = 0;
		numTotalFiles = files.length;

		for (const file of files) {
			const formData = new FormData();
			formData.append('file', file);

			await fetch('/api/files', {
				method: 'POST',
				body: formData
			});

			numFilesUploaded++;
		}

		numFilesUploaded = undefined;
		numTotalFiles = undefined;
		invalidate('app:load-text-files');
	};
</script>

{#if numFilesUploaded === undefined}
	<input type="file" id="upload-button" hidden multiple {onchange} />
	<label
		for="upload-button"
		class="flex w-32 cursor-pointer items-center justify-center bg-blue-500 px-4 py-2 text-slate-100 active:bg-blue-600"
	>
		<img
			class="min-h-6 min-w-6"
			color="#fff"
			src="/upload.svg"
			alt="Upload symbol"
			width="24"
			height="24"
		/>
	</label>
{:else}
	<div class="px-6 text-center text-slate-500">
		Uploading: {numFilesUploaded + 1}/{numTotalFiles}
	</div>
{/if}
