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
	class="flex min-h-[3rem] min-w-[3rem] items-center justify-center border border-solid px-2 py-1 text-sm font-mono transition-all duration-75 select-none
    {className} 
    {isPressed ? 'scale-95' : ''}
    {isChattering
		? isPressed 
			? 'border-red-400 bg-red-900/80 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.8)]'
			: 'border-red-500 bg-red-900/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]'
		: isTested
			? isPressed
				? 'border-emerald-400 bg-emerald-900/80 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.8)]'
				: 'border-emerald-500/50 bg-emerald-900/40 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
			: isPressed
				? 'border-ink bg-ink text-paper shadow-[0_0_10px_var(--color-ink)]'
				: 'border-rule-2 bg-paper-2 text-neutral shadow-sm hover:border-rule'}">
	{label || code}
</div>
