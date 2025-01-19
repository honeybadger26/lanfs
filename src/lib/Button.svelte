<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	const COLOR_CLASSES = {
		blue: 'bg-blue-500 active:bg-blue-600 disabled:bg-blue-400',
		red: 'bg-red-500 active:bg-red-600 disabled:bg-blue-400'
	};

	let {
		padding = 'px-4 py-2',
		classes = '',
		color = 'blue',
		children = undefined,
		icon = undefined,
		disabled = false,
		onClick
	}: {
		padding?: string;
		classes?: string;
		color?: 'blue' | 'red';
		children?: Snippet;
		icon?: { src: string; alt: string };
		disabled?: boolean;
		onClick: MouseEventHandler<HTMLButtonElement>;
	} = $props();

	const colorClasses = COLOR_CLASSES[color];
</script>

<button
	{disabled}
	class={`${padding} flex items-center justify-center gap-2 text-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 ${colorClasses} ${classes}`}
	onclick={onClick}
>
	{#if icon}
		<img
			class="min-h-6 min-w-6"
			color="#fff"
			src={icon.src}
			alt={icon.alt}
			width="24"
			height="24"
		/>
	{/if}
	{#if children}
		<div>{@render children()}</div>
	{/if}
</button>
