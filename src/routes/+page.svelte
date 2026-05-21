<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import { chatterState } from '$lib/chatter.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		chatterState.loadFromStorage();
	});

	$effect(() => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('chatter-state', JSON.stringify({
				history: chatterState.history,
				testedKeys: Array.from(chatterState.testedKeys),
				chatteringKeys: Array.from(chatterState.chatteringKeys),
				threshold: chatterState.threshold
			}));
		}
	});

	function handleKeyDown(e: KeyboardEvent) {
		e.preventDefault(); // Prevent default browser actions for some keys
		chatterState.onKeyDown(e);
	}

	function handleKeyUp(e: KeyboardEvent) {
		e.preventDefault();
		chatterState.onKeyUp(e);
	}

	function handleBlur() {
		chatterState.onBlur();
	}
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} onblur={handleBlur} />

<div
	class="flex min-h-screen flex-col items-center gap-8 bg-slate-950 p-8 font-sans text-slate-200"
>
	<header class="flex w-full max-w-5xl flex-col gap-4 text-center">
		<h1
			class="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent"
		>
			Key Chatter Scanner
		</h1>
		<p class="text-slate-400">Press keys to test for mechanical chatter.</p>

		<div
			class="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4"
		>
			<div class="flex items-center gap-4">
				<label for="threshold" class="text-sm font-medium">Chatter Threshold (ms):</label>
				<input
					id="threshold"
					type="number"
					bind:value={chatterState.threshold}
					class="w-24 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-center focus:border-teal-500 focus:outline-none"
				/>
			</div>
			<button
				onclick={() => chatterState.reset()}
				class="rounded-lg border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm transition-colors hover:bg-slate-700"
			>
				Reset State
			</button>
		</div>
	</header>

	<main class="flex w-full justify-center overflow-x-auto pb-8">
		<Keyboard />
	</main>

	<!-- History Log -->
	<section class="flex w-full max-w-3xl flex-col gap-2">
		<h2 class="border-b border-slate-800 pb-2 text-lg font-semibold">Chatter History</h2>
		{#if chatterState.history.length === 0}
			<p class="py-8 text-center text-slate-500">No chatter detected yet.</p>
		{:else}
			<div class="flex flex-col gap-2">
				{#each chatterState.history as event (event.key)}
					<label
						class="flex cursor-pointer items-center justify-between rounded-lg border border-red-500/30 bg-red-900/20 p-3 text-red-400 transition-colors hover:bg-red-900/40"
					>
						<div class="flex items-center gap-3">
							<input
								type="checkbox"
								class="h-4 w-4 cursor-pointer rounded border-red-500/50 bg-red-900/20 text-red-500 accent-red-500 focus:ring-red-500/50"
								onchange={() => chatterState.clearKey(event.key)}
							/>
							<div class="flex items-center gap-2">
								<span class="rounded bg-red-950 px-2 py-1 font-mono text-sm">{event.key}</span>
								{#if event.count > 1}
									<span class="rounded-full bg-red-800 px-1.5 py-0.5 text-xs font-bold text-red-100"
										>x{event.count}</span
									>
								{/if}
							</div>
							<span>Chatter detected! (Click to reset)</span>
						</div>
						<span class="font-mono font-bold text-red-300">{event.delta.toFixed(1)}ms</span>
					</label>
				{/each}
			</div>
		{/if}
	</section>
</div>
