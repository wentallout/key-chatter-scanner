<script lang="ts">
	import { chatterState } from '$lib/chatter.svelte';

	let {
		code,
		label,
		class: className = ''
	}: {
		code: string;
		label?: string;
		class?: string;
	} = $props();

	let isPressed = $derived(chatterState.pressedKeys.has(code));
	let isChattering = $derived(chatterState.chatteringKeys.has(code));
	let isTested = $derived(chatterState.testedKeys.has(code));
</script>

<div
	class="flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-md border border-solid px-2 py-1 text-sm font-medium transition-all duration-75 select-none
    {className} 
    {isChattering
		? 'border-red-500 bg-red-900/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]'
		: isPressed
			? 'border-slate-300 bg-slate-700 text-white shadow-[0_0_10px_rgba(255,255,255,0.4)] scale-95'
			: isTested
				? 'border-yellow-500/70 bg-yellow-900/20 text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.3)]'
				: 'border-slate-700 bg-slate-800/80 text-slate-400 shadow-sm hover:border-slate-600'}"
>
	{label || code}
</div>
