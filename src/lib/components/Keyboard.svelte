<script lang="ts">
	import Key from './Key.svelte';

	let { showNumpad = true }: { showNumpad?: boolean } = $props();
</script>

<div class="mx-auto w-max">
	<div class="flex gap-6 text-left">
		<!-- Main Cluster -->
		<div class="flex shrink-0 flex-col gap-2">
			<!-- Row 1 -->
			<div class="mb-4 flex gap-2">
				<Key code="Escape" label="Esc" class="mr-6" />
				<Key code="F1" label="F1" />
				<Key code="F2" label="F2" />
				<Key code="F3" label="F3" />
				<Key code="F4" label="F4" class="mr-4" />
				<Key code="F5" label="F5" />
				<Key code="F6" label="F6" />
				<Key code="F7" label="F7" />
				<Key code="F8" label="F8" class="mr-4" />
				<Key code="F9" label="F9" />
				<Key code="F10" label="F10" />
				<Key code="F11" label="F11" />
				<Key code="F12" label="F12" />
			</div>
			<!-- Row 2 -->
			<div class="flex gap-2">
				<Key code="Backquote" label="`" />
				<Key code="Digit1" label="1" />
				<Key code="Digit2" label="2" />
				<Key code="Digit3" label="3" />
				<Key code="Digit4" label="4" />
				<Key code="Digit5" label="5" />
				<Key code="Digit6" label="6" />
				<Key code="Digit7" label="7" />
				<Key code="Digit8" label="8" />
				<Key code="Digit9" label="9" />
				<Key code="Digit0" label="0" />
				<Key code="Minus" label="-" />
				<Key code="Equal" label="=" />
				<Key code="Backspace" label="Backspace" class="flex-1" />
			</div>
			<!-- Row 3 -->
			<div class="flex gap-2">
				<Key code="Tab" label="Tab" class="w-[4.5rem]" />
				<Key code="KeyQ" label="Q" />
				<Key code="KeyW" label="W" />
				<Key code="KeyE" label="E" />
				<Key code="KeyR" label="R" />
				<Key code="KeyT" label="T" />
				<Key code="KeyY" label="Y" />
				<Key code="KeyU" label="U" />
				<Key code="KeyI" label="I" />
				<Key code="KeyO" label="O" />
				<Key code="KeyP" label="P" />
				<Key code="BracketLeft" label="[" />
				<Key code="BracketRight" label="]" />
				<Key code="Backslash" label="\" class="flex-1" />
			</div>
			<!-- Row 4 -->
			<div class="flex gap-2">
				<Key code="CapsLock" label="Caps Lock" class="w-[5.5rem]" />
				<Key code="KeyA" label="A" />
				<Key code="KeyS" label="S" />
				<Key code="KeyD" label="D" />
				<Key code="KeyF" label="F" />
				<Key code="KeyG" label="G" />
				<Key code="KeyH" label="H" />
				<Key code="KeyJ" label="J" />
				<Key code="KeyK" label="K" />
				<Key code="KeyL" label="L" />
				<Key code="Semicolon" label=";" />
				<Key code="Quote" label="'" />
				<Key code="Enter" label="Enter" class="flex-1" />
			</div>
			<!-- Row 5 -->
			<div class="flex gap-2">
				<Key code="ShiftLeft" label="Shift" class="w-[7.5rem]" />
				<Key code="KeyZ" label="Z" />
				<Key code="KeyX" label="X" />
				<Key code="KeyC" label="C" />
				<Key code="KeyV" label="V" />
				<Key code="KeyB" label="B" />
				<Key code="KeyN" label="N" />
				<Key code="KeyM" label="M" />
				<Key code="Comma" label="," />
				<Key code="Period" label="." />
				<Key code="Slash" label="/" />
				<Key code="ShiftRight" label="Shift" class="flex-1" />
			</div>
			<!-- Row 6 -->
			<div class="flex gap-2">
				<Key code="ControlLeft" label="Ctrl" class="w-[4.5rem]" />
				<Key code="MetaLeft" label="Win" class="w-[3.5rem]" />
				<Key code="AltLeft" label="Alt" class="w-[3.5rem]" />
				<Key code="Space" label="Space" class="flex-1" />
				<Key code="AltRight" label="Alt" class="w-[3.5rem]" />
				<Key code="ContextMenu" label="Menu" class="w-[3.5rem]" />
				<Key code="ControlRight" label="Ctrl" class="w-[4.5rem]" />
			</div>
		</div>

		<!-- Nav Cluster -->
		<div class="flex w-max shrink-0 flex-col gap-2">
			<!-- Nav row 1 -->
			<div class="mb-4 grid w-full grid-cols-3 gap-2">
				<Key code="PrintScreen" label="PrtSc" class="w-full" />
				<Key code="ScrollLock" label="ScrLk" class="w-full" />
				<Key code="Pause" label="Pause" class="w-full" />
			</div>
			<!-- Nav row 2 -->
			<div class="grid w-full grid-cols-3 gap-2">
				<Key code="Insert" label="Ins" class="w-full" />
				<Key code="Home" label="Home" class="w-full" />
				<Key code="PageUp" label="PgUp" class="w-full" />
			</div>
			<!-- Nav row 3 -->
			<div class="grid w-full grid-cols-3 gap-2">
				<Key code="Delete" label="Del" class="w-full" />
				<Key code="End" label="End" class="w-full" />
				<Key code="PageDown" label="PgDn" class="w-full" />
			</div>
			<!-- Spacer -->
			<div class="flex-1"></div>
			<!-- Nav arrows -->
			<div class="mt-2 grid w-full grid-cols-3 gap-2">
				<div></div>
				<Key code="ArrowUp" label="↑" class="w-full" />
				<div></div>
			</div>
			<div class="grid w-full grid-cols-3 gap-2">
				<Key code="ArrowLeft" label="←" class="w-full" />
				<Key code="ArrowDown" label="↓" class="w-full" />
				<Key code="ArrowRight" label="→" class="w-full" />
			</div>
		</div>

		{#if showNumpad}
		<!-- Numpad Cluster -->
		<div class="flex shrink-0 flex-col gap-2">
			<div class="mb-4 flex h-[3rem] gap-2">
				<!-- Spacer for alignment with F keys -->
			</div>
			<div class="grid auto-rows-[3rem] grid-cols-4 grid-rows-5 gap-2">
				<Key code="NumLock" label="Num" />
				<Key code="NumpadDivide" label="/" />
				<Key code="NumpadMultiply" label="*" />
				<Key code="NumpadSubtract" label="-" />

				<Key code="Numpad7" label="7" />
				<Key code="Numpad8" label="8" />
				<Key code="Numpad9" label="9" />
				<Key code="NumpadAdd" label="+" class="row-span-2 h-full" />

				<Key code="Numpad4" label="4" />
				<Key code="Numpad5" label="5" />
				<Key code="Numpad6" label="6" />

				<Key code="Numpad1" label="1" />
				<Key code="Numpad2" label="2" />
				<Key code="Numpad3" label="3" />
				<Key code="NumpadEnter" label="Enter" class="row-span-2 h-full" />

				<Key code="Numpad0" label="0" class="col-span-2 w-full" />
				<Key code="NumpadDecimal" label="." />
			</div>
		</div>
		{/if}
	</div>
</div>
