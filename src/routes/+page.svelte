<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import { chatterState } from '$lib/chatter.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		chatterState.loadFromStorage();
	});

	$effect(() => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(
				'chatter-state',
				JSON.stringify({
					history: chatterState.history,
					testedKeys: Array.from(chatterState.testedKeys),
					chatteringKeys: Array.from(chatterState.chatteringKeys),
					threshold: chatterState.threshold
				})
			);
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

	let showNumpad = $state(true);
	let totalKeys = $derived(showNumpad ? 103 : 86);
	let healthyKeys = $derived(
		Math.max(0, chatterState.testedKeys.size - chatterState.chatteringKeys.size)
	);
	let rawPercentage = $derived((healthyKeys / totalKeys) * 100);
	let percentage = $derived(Math.min(100, Math.round(rawPercentage)));
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} onblur={handleBlur} />

<!-- Hallmark · genre: atmospheric · macrostructure: Workbench · theme: Terminal -->
<div class="mx-auto flex w-full max-w-[80rem] flex-col gap-lg px-gutter py-xl font-body text-ink">
	<!-- Compact Toolbar / Header -->
	<header
		class="flex w-full flex-col gap-md border-b border-rule pb-md md:flex-row md:items-end md:justify-between">
		<div class="flex flex-col gap-xs">
			<h1 class="m-0 font-display text-2xl leading-none font-bold tracking-tight">
				Key Chatter Scanner
			</h1>
			<p class="m-0 text-sm text-neutral">
				Press keys to test for mechanical chatter. Microsecond precision.
			</p>
		</div>

		<div class="flex flex-col gap-md sm:flex-row sm:items-center">
			<div class="flex items-center gap-sm border-rule sm:border-r sm:pr-sm">
				<label for="threshold" class="text-xs font-bold tracking-label text-neutral"
					>THRESHOLD (ms)</label>
				<input
					id="threshold"
					type="number"
					bind:value={chatterState.threshold}
					class="w-16 border-b border-rule-2 bg-transparent px-1 py-0.5 text-center font-mono text-sm text-ink focus:border-accent focus:outline-none" />
			</div>

			<!-- Compact Progress -->
			<div class="flex items-center gap-sm border-rule sm:border-r sm:pr-sm">
				<span class="text-xs font-bold tracking-label text-neutral">PROGRESS</span>
				<div class="relative flex h-6 w-32 items-center overflow-hidden bg-rule">
					<div
						class="absolute top-0 left-0 h-full transition-all duration-300 {percentage === 100
							? 'bg-emerald-500/80'
							: 'bg-accent/80'}"
						style="width: {percentage}%">
					</div>
					<span
						class="relative z-10 w-full text-center font-mono text-xs font-bold {percentage > 50
							? 'text-paper'
							: 'text-ink'}">
						{percentage}%
					</span>
				</div>
			</div>

			<button
				onclick={() => (showNumpad = !showNumpad)}
				class="border border-rule-2 px-sm py-xs text-xs transition-colors hover:border-accent hover:text-accent">
				[ Numpad: {showNumpad ? 'ON' : 'OFF'} ]
			</button>

			<button
				onclick={() => chatterState.reset()}
				class="border border-rule-2 px-sm py-xs text-xs transition-colors hover:border-accent hover:text-accent">
				[ Reset ]
			</button>
		</div>
	</header>

	<!-- The "Workbench frame" - the Keyboard -->
	<figure
		class="m-0 flex flex-col gap-sm overflow-hidden border border-rule-2 bg-paper-2 p-md shadow-sm md:p-xl">
		<main class="w-full overflow-x-auto pb-4">
			<Keyboard {showNumpad} />
		</main>
	</figure>

	<!-- History Log -->
	<section class="mx-auto flex w-full max-w-[65ch] flex-col gap-lg">
		<h2 class="m-0 border-b border-rule pb-xs font-display text-2xl tracking-tight">Chatter Log</h2>
		{#if chatterState.history.length === 0}
			<p class="py-xl text-center text-neutral">No chatter detected yet. Awaiting input...</p>
		{:else}
			<div class="flex flex-col gap-xs">
				{#each chatterState.history as event (event.key)}
					<label
						class="flex cursor-pointer items-center justify-between border p-sm transition-colors {event.status ===
						'resolved'
							? 'border-rule bg-paper text-ink hover:border-accent'
							: event.status === 'retesting'
								? 'border-accent bg-paper-2 text-accent'
								: 'border-red-500/50 bg-red-900/20 text-red-400 hover:border-red-500/80 hover:bg-red-900/40'}">
						<div class="flex items-center gap-md">
							<input
								type="checkbox"
								checked={event.status === 'resolved'}
								disabled={event.status === 'retesting'}
								class="h-4 w-4 cursor-pointer appearance-none border border-rule bg-transparent checked:border-accent checked:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
								onchange={(e) => {
									if (e.currentTarget.checked) chatterState.startRetest(event.key);
								}} />
							<div class="flex items-center gap-sm">
								<span class="bg-rule-2 px-2 py-1 font-mono text-sm text-ink">{event.key}</span>
								{#if event.count > 1}
									<span class="bg-ink px-1.5 py-0.5 text-xs font-bold text-paper"
										>x{event.count}</span>
								{/if}
							</div>
							<span class="text-sm"
								>{event.status === 'resolved'
									? 'Retest successful'
									: event.status === 'retesting'
										? 'Retesting (3s)...'
										: 'Chatter detected! (Click to retest)'}</span>
						</div>
						<span
							class="font-mono font-bold {event.status === 'resolved'
								? 'text-neutral'
								: event.status === 'retesting'
									? 'text-accent'
									: 'text-red-400'}">{event.delta.toFixed(1)}ms</span>
					</label>
				{/each}
			</div>
		{/if}
	</section>

	<!-- How to Use Guide -->
	<section
		class="mx-auto mb-3xl flex w-full max-w-[65ch] flex-col gap-xl border border-rule-2 bg-paper-2 p-xl">
		<div
			class="flex items-center gap-sm border-b border-rule pb-sm font-display text-xl tracking-tight">
			<span class="text-accent">&gt;</span> Diagnostics Manual
		</div>

		<div class="grid gap-xl md:grid-cols-2">
			<div class="flex flex-col gap-xs">
				<h3 class="font-mono text-sm font-bold tracking-label text-accent">01. THE PROBLEM</h3>
				<p class="m-0 text-sm leading-normal text-neutral">
					Mechanical switches wear out. A single physical press can register as multiple rapid
					inputs (e.g., "heello"). This tool detects inputs faster than humanly possible.
				</p>
			</div>

			<div class="flex flex-col gap-xs">
				<h3 class="font-mono text-sm font-bold tracking-label text-accent">02. EXECUTION</h3>
				<p class="m-0 text-sm leading-normal text-neutral">
					Type normally or press every key sequentially. The progress indicator tracks testing
					across all 103 standard keys.
				</p>
			</div>

			<div class="flex flex-col gap-xs md:col-span-2">
				<h3 class="font-mono text-sm font-bold tracking-label text-accent">
					03. STATUS INDICATORS
				</h3>
				<ul class="m-0 flex list-none flex-col gap-sm pl-0 text-sm text-neutral">
					<li class="flex items-center gap-sm">
						<span class="h-3 w-3 border border-rule bg-paper"></span> <strong>Gray:</strong> Untested.
					</li>
					<li class="flex items-center gap-sm">
						<span
							class="h-3 w-3 border border-emerald-500/50 bg-emerald-900/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
						></span> <strong class="text-emerald-400">Green:</strong> Key tested and healthy.
					</li>
					<li class="flex items-center gap-sm">
						<span
							class="h-3 w-3 border border-red-500/50 bg-red-900/40 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
						></span> <strong class="text-red-400">Red:</strong> Chatter detected.
					</li>
				</ul>
			</div>
		</div>

		<div class="flex flex-col gap-sm border-t border-rule pt-md">
			<h3 class="font-mono text-sm font-bold tracking-label text-ink">RETEST PROTOCOL</h3>
			<p class="m-0 text-sm leading-normal text-neutral">
				If chatter is found, clean the switch (compressed air / isopropyl). Check the box in the log
				to initiate a 3-second retest phase. Mash the key rapidly. If no chatter occurs, the fault
				is cleared.
			</p>
		</div>
	</section>
</div>
