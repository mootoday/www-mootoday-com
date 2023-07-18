// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		D1: D1Database;
	}
	// interface PageData {}
	interface Platform {
		env: {
			D1: D1Database;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}
}
