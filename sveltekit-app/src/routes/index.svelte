<script context="module" lang="ts">
	export const prerender = true;
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/profiles');
		if (res.ok) {
			const { profiles } = await res.json();
			return {
				props: { profiles }
			};
		}
	};
</script>

<script lang="ts">
	export let profiles: [];
	let firstName = '';
	let lastName = '';
	let position = '';
	let uid: number;

	const onSubmit = () => {
		fetch('/graphql/profiles', {
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ firstName, lastName, position })
		})
			.then((r) => r.json())
			.then((data) => console.log('data returned:', data))
			.catch((err) => console.log('Err:', err));
	};
	const onDelete = (id: number) => {
		console.log(id);
		fetch('/graphql/profiles', {
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'DELETE',
			body: JSON.stringify({ id })
		})
			.then((r) => r.json())
			.then((data) => console.log('data returned:', data))
			.catch((err) => console.log('Err:', err));
	};
	const onEdit = ($id, $firstName, $lastName, $position) => {
		uid = $id;
		firstName = $firstName;
		lastName = $lastName;
		position = $position;
		console.log(uid, firstName, lastName, position);
	};
	const onUpdate = () => {
		fetch('/graphql/profiles', {
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({ id: uid, firstName, lastName, position })
		})
			.then((r) => r.json())
			.then((data) => console.log('data returned:', data))
			.catch((err) => console.log('Err:', err));
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="mx-4 my-4">
	<div class="my-2">
		fisrtName: <input type="text" bind:value={firstName} class="m-2 text-black" /> <br />
		lastName: <input type="text" bind:value={lastName} class="m-2 text-black" /> <br />
		position: <input type="text" bind:value={position} class="m-2 text-black" /> <br />
		{#if uid}
			<button class="p-2 bg-blue-600 text-white rounded" on:click={onUpdate}>Update profile</button>
		{:else}
			<button class="p-2 bg-blue-600 text-white rounded" on:click={onSubmit}>Add profile</button>
		{/if}
	</div>
	<div class="min-w-min">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each profiles as { id, firstName, lastName, position }}
				<div class="w-full bg-white rounded-lg p-5 flex flex-col justify-center items-center">
					<div class="mb-3">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							class="object-center object-cover rounded-full h-24 w-24"
							src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
							alt="photo"
						/>
					</div>
					<div class="text-center">
						<p class="text-xl text-gray-700 font-bold mb-2">{firstName} {lastName}</p>
						<p class="text-base text-gray-400 font-normal">{position}</p>
						<button class="text-base text-red-600 font-normal" on:click={() => onDelete(id)}
							>Delete</button
						>
						<button
							class="text-base text-purple-500 font-normal"
							on:click={() => onEdit(id, firstName, lastName, position)}>Edit</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
