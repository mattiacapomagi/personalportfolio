let current = $state('en');

export const language = {
	get current() { return current; },
	toggle() { current = current === 'en' ? 'it' : 'en'; },
	set(value) { current = value; }
};
