<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { ChangeEventHandler } from 'svelte/elements';

	let numFilesUploaded: number | undefined = $state();
	let numTotalFiles: number | undefined = $state();
	let currentFileProgress: number = $state(0);

	const onchange: ChangeEventHandler<HTMLInputElement> = async (event) => {
		const { files } = event.currentTarget;
		if (!files) return;

		numFilesUploaded = 0;
		numTotalFiles = files.length;

		for (const file of files) {
			currentFileProgress = 0;
			const formData = new FormData();
			formData.append('file', file);

			await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', '/api/files');

				xhr.upload.addEventListener('progress', (e) => {
					if (e.lengthComputable) {
						currentFileProgress = e.loaded / e.total;
					}
				});

				xhr.addEventListener('load', () => {
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(xhr.response);
					} else {
						reject(new Error(`Upload failed with status ${xhr.status}`));
					}
				});

				xhr.addEventListener('error', () => reject(new Error('Upload failed')));
				xhr.send(formData);
			});

			numFilesUploaded++;
		}

		numFilesUploaded = undefined;
		numTotalFiles = undefined;
		currentFileProgress = 0;
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
	<div class="w-full px-6">
		<div class="text-center text-xs text-slate-500">
			Uploading file {numFilesUploaded + 1}/{numTotalFiles} ({Math.round(
				currentFileProgress * 100
			)}% done)
		</div>
		<div class="mt-2 h-2.5 w-full rounded-full bg-gray-200">
			<div
				class="h-2.5 rounded-full bg-green-500 transition-all duration-200"
				style="width: {((currentFileProgress + numFilesUploaded) / numTotalFiles!) * 100}%"
			></div>
		</div>
	</div>
{/if}
