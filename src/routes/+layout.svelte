<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>LANFS</title>
	<meta name="description" content="Transfer files and text within your LAN" />
</svelte:head>

<div class="flex flex-col items-center gap-2 pt-5">
	<h1 class="text-4xl font-semibold">LANFS</h1>
	<p class="text-sm">By Simon Schippl</p>
</div>

{@render children()}
