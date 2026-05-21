import { SvelteSet } from 'svelte/reactivity';

export class ChatterState {
	threshold = $state(40);
	pressedKeys = new SvelteSet<string>();
	testedKeys = new SvelteSet<string>();
	chatteringKeys = new SvelteSet<string>();
	lastReleaseTimes = new Map<string, number>();
	history = $state<{ key: string; delta: number; time: number; count: number }[]>([]);

	onKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;

		const key = e.code;
		const now = performance.now();

		this.pressedKeys.add(key);
		this.testedKeys.add(key);

		const lastRelease = this.lastReleaseTimes.get(key);
		if (lastRelease !== undefined) {
			const delta = now - lastRelease;
			if (delta <= this.threshold) {
				this.chatteringKeys.add(key);
				const existingIndex = this.history.findIndex((h) => h.key === key);
				if (existingIndex !== -1) {
					const existing = this.history[existingIndex];
					this.history.splice(existingIndex, 1);
					this.history.unshift({ ...existing, delta, time: Date.now(), count: existing.count + 1 });
				} else {
					this.history.unshift({ key, delta, time: Date.now(), count: 1 });
				}
			}
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

	clearKey(key: string) {
		this.chatteringKeys.delete(key);
		this.testedKeys.delete(key);
		this.history = this.history.filter(h => h.key !== key);
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
