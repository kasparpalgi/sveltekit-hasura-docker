<script context="module" lang="ts">
	export const prerender = true;
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res: Response = await fetch('/api/graphql');
		if (res.ok) {
			const { data } = await res.json();
			return {
				props: { ...data }
			};
		}
	};
</script>

<script lang="ts">
	export let data = {};
	export let loading: boolean;
	export let networkStatus: number;
	let obj = {
		firstName: '',
		lastName: '',
		position: ''
	};
	async function handleOnSubmit() {
		const res: Response = await fetch('/api/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(obj)
		});
		if (res.ok) {
			console.log(res);
		} else {
			console.log(res);
		}
	}
</script>

<section class="px-4 py-4 mx-4 my-4 bg-white rounded">
	<h2 class="text-2xl">Sveltekit ApolloClient</h2>
	<form class="mx-2 my-2" on:submit|preventDefault={handleOnSubmit}>
		FistName: <input type="text" class="form-input rounded-full w-60" bind:value={obj.firstName} />
		LastName:
		<input type="text" class="form-input rounded-full w-60" bind:value={obj.lastName} />
		Posiiton:
		<input type="text" class="form-input rounded-full w-60" bind:value={obj.position} />
		<button type="submit" class="rounded-full bg-gray-500 p-2 text-white">Submit Job</button>
		<button type="reset" class="rounded-full bg-red-500 p-2 text-white">Clear Job</button>
	</form>
	{#if !loading}
		{#each data['profiles'] as { firstName, lastName, position }}
			<div class="flex">
				<div class="p-2 m-1 bg-blue-600 rounded-full text-sm text-white">
					{firstName}
					{lastName}
				</div>
				<div class="p-2 m-1 bg-red-600 rounded-full text-sm text-white">{position}</div>
			</div>
		{/each}
	{:else}
		<div class="text-red-600">No record...</div>
	{/if}
</section>
