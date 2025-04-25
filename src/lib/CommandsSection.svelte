<script lang="ts">
	import Button from '$lib/Button.svelte';

	let isShutDownModalOpen = $state(false);
</script>

<div class="w-full">
	<h2 class="mx-auto w-fit text-3xl">Commands</h2>
	<div class="mx-auto mt-4 flex w-fit gap-2">
		<Button onClick={() => fetch('/api/commands/turn-off-screen')}>Turn off screen</Button>
		<Button onClick={() => (isShutDownModalOpen = true)}>Shut down</Button>
	</div>
</div>

{#if isShutDownModalOpen}
	<div
		class="fixed inset-0 z-10 flex min-h-full items-center justify-center bg-gray-800 bg-opacity-80 sm:items-start sm:pt-16"
	>
		<div
			class="size-full max-h-screen overflow-auto bg-slate-900 px-5 py-4 shadow-xl sm:h-auto sm:w-auto sm:max-w-lg"
		>
			<div class="mb-5">Are you sure?</div>
			<div class="mx-auto flex w-fit gap-2">
				<Button color="red" onClick={() => fetch('/api/commands/shut-down')}>Yes</Button>
				<Button onClick={() => (isShutDownModalOpen = false)}>No</Button>
			</div>
		</div>
	</div>
{/if}
