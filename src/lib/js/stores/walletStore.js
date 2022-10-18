import { writable} from 'svelte/store';

export let walletAddress = writable(null)
export let errors = writable(null)