<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';
	import UploadFileButton from './UploadFileButton.svelte';

	type FilesSectionProps = { classes?: string; files: { name: string; link: string }[] };
	let { classes, files }: FilesSectionProps = $props();
	let hasFiles = $derived(files.length > 0);
</script>

<div class={`w-full ${classes}`}>
	<h2 class="mx-auto w-fit text-3xl">Files</h2>
	{#if hasFiles}
		<div class="mt-4 flex w-full flex-col gap-1">
			{#each files as { name, link } (name)}
				<div class="flex w-full items-center gap-2 border-2 p-2">
					<div class="grow">
						<a class="underline" href={link} download>
							{name}
						</a>
					</div>
					<DeleteButton type="file" id={name} />
				</div>
			{/each}
		</div>
	{/if}
	<div class="mx-auto flex items-center justify-center gap-2 pt-4">
		<UploadFileButton />
		{#if hasFiles}
			<DeleteButton type="file" />
		{/if}
	</div>
</div>
