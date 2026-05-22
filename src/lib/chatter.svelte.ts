import { SvelteSet } from 'svelte/reactivity';
import clickSfxUrl from '$lib/assets/sfx/click.mp3';
import fartSfxUrl from '$lib/assets/sfx/fart.mp3';

export class ChatterState {
	threshold = $state(40);
	pressedKeys = new SvelteSet<string>();
	testedKeys = new SvelteSet<string>();
	chatteringKeys = new SvelteSet<string>();
	lastReleaseTimes = new Map<string, number>();
	history = $state<{ key: string; delta: number; time: number; count: number; status: 'chattering' | 'retesting' | 'resolved'; retestTimeoutId?: number }[]>([]);

	onKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;

		const key = e.code;
		const now = performance.now();

		this.pressedKeys.add(key);
		this.testedKeys.add(key);

		let isChatter = false;
		const lastRelease = this.lastReleaseTimes.get(key);
		if (lastRelease !== undefined) {
			const delta = now - lastRelease;
			if (delta <= this.threshold) {
				isChatter = true;
				this.chatteringKeys.add(key);
				const existingIndex = this.history.findIndex((h) => h.key === key);
				if (existingIndex !== -1) {
					const existing = this.history[existingIndex];
					if (existing.retestTimeoutId) clearTimeout(existing.retestTimeoutId);
					this.history.splice(existingIndex, 1);
					this.history.unshift({ ...existing, delta, time: Date.now(), count: existing.count + 1, status: 'chattering' });
				} else {
					this.history.unshift({ key, delta, time: Date.now(), count: 1, status: 'chattering' });
				}
			}
		}

		if (typeof window !== 'undefined') {
			const audio = new Audio(isChatter ? fartSfxUrl : clickSfxUrl);
			audio.play().catch((err) => console.error("Error playing audio:", err));
		}
	}

	onKeyUp(e: KeyboardEvent) {
		const key = e.code;
		this.pressedKeys.delete(key);
		this.lastReleaseTimes.set(key, performance.now());
	}

	onBlur() {
		this.pressedKeys.clear();
	}

	startRetest(key: string) {
		const item = this.history.find((h) => h.key === key);
		if (!item || item.status === 'retesting') return;

		item.status = 'retesting';
		this.chatteringKeys.delete(key);

		if (item.retestTimeoutId) clearTimeout(item.retestTimeoutId);
		item.retestTimeoutId = window.setTimeout(() => {
			item.status = 'resolved';
		}, 3000);
	}

	loadFromStorage() {
		if (typeof localStorage === 'undefined') return;
		try {
			const stored = localStorage.getItem('chatter-state');
			if (stored) {
				const data = JSON.parse(stored);
				if (data.history) this.history = data.history;
				if (data.testedKeys) {
					this.testedKeys.clear();
					data.testedKeys.forEach((k: string) => this.testedKeys.add(k));
				}
				if (data.chatteringKeys) {
					this.chatteringKeys.clear();
					data.chatteringKeys.forEach((k: string) => this.chatteringKeys.add(k));
				}
				if (typeof data.threshold === 'number') this.threshold = data.threshold;
			}
		} catch (e) {
			console.error("Failed to load chatter state from local storage", e);
		}
	}

	reset() {
		this.pressedKeys.clear();
		this.testedKeys.clear();
		this.chatteringKeys.clear();
		this.lastReleaseTimes.clear();
		this.history = [];
	}
}

export const chatterState = new ChatterState();
