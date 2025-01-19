<script lang="ts">
	import FilesSection from '$lib/FilesSection.svelte';
	import TextSection from '$lib/TextSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-5xl px-4 pb-16 pt-8 md:mx-auto">
	<TextSection texts={data.texts} />
	<FilesSection classes="pt-8" files={data.files} />
</div>
