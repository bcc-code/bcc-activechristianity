const AC_ID = 'AC';
const AC_VERSION = 'v1';

function ACStorage(local?: boolean) {
	if (typeof window === 'undefined')
		return {
			setItem(key: string, content: string): undefined {
				return undefined;
			},
			getItem(key: string): string {
				return '';
			},
			clear(): void {},
			key(index: number): string | null {
				return null;
			},
			removeItem(key: string): void {}
		};
	return local ? localStorage : sessionStorage;
}

export function clear(local?: boolean) {
	ACStorage(local).clear();
}

export function remove(key: string, local?: boolean) {
	ACStorage(local).removeItem(`${AC_ID}.${key}`);
}

export function save(key: string, content: string, local?: boolean) {
	return ACStorage(local).setItem(`${AC_ID}.${key}`, content);
}

export function load(key: string, local?: boolean) {
	return ACStorage(local).getItem(`${AC_ID}.${key}`);
}

export function saveJson(key: string, json: any, local?: boolean) {
	try {
		const jsonString = JSON.stringify(json);
		save(key, jsonString, local);
		return true;
	} catch (error) {
		console.warn(`AC: Failed to stringify json for ${key}`);
		return false;
	}
}

export function loadJson(key: string, fallback?: any, local?: boolean) {
	try {
		const content = load(key, local);
		const obj = content ? JSON.parse(content) : fallback;
		return obj || {};
	} catch (error) {
		console.warn(`AC: Failed to parse json for ${key}, cleaning it`);
		saveJson(key, fallback || {}, local);
		return fallback || {};
	}
}

if (load('version', true) !== AC_VERSION) {
	clear(false);
	clear(true);
	save('version', AC_VERSION, true);
}
