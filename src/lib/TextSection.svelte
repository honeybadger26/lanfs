<script lang="ts">
	import CopyTextButton from './CopyTextButton.svelte';
	import DeleteButton from './DeleteButton.svelte';
	import TextForm from './TextForm.svelte';

	type TextSectionProps = {
		texts: {
			id: number;
			contents: string;
		}[];
	};

	let { texts }: TextSectionProps = $props();
	let hasTexts = $derived(texts.length > 0);

	function formatTextWithLinks(text: string): string {
		return text
			? text.replace(/https?:\/\/[^\s]+/g, (url) => `<a class="underline" href="${url}">${url}</a>`)
			: '';
	}
</script>

<div class="w-full">
	<h2 class="mx-auto w-fit text-3xl">Text</h2>
	{#if hasTexts}
		<div class="mt-4 flex w-full flex-col gap-1">
			{#each texts as { id, contents } (id)}
				<div class="flex w-full items-center gap-2 border-2 p-2">
					<div class="grow break-all">
						{@html formatTextWithLinks(contents)}
					</div>
					<CopyTextButton text={contents} />
					<DeleteButton type="text" id={id.toString()} />
				</div>
			{/each}
		</div>
	{/if}
	<div class="mx-auto flex justify-center gap-2 pt-4">
		<TextForm />
		{#if hasTexts}
			<DeleteButton type="text" />
		{/if}
	</div>
</div>
