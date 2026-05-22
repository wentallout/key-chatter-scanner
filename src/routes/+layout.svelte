<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	// Supports weights 100-900
	import '@fontsource-variable/geist-mono/wght.css';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Hallmark · genre: atmospheric · macrostructure: Workbench · theme: Terminal · nav: N8 · footer: Ft4 -->
<div class="flex min-h-screen flex-col bg-paper text-ink selection:bg-accent selection:text-paper">
	<main class="w-full flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
