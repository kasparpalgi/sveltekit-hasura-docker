<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import {
		debugExchange,
		defaultExchanges,
		initClient,
		operationStore,
		query,
		subscription
	} from '@urql/svelte';
	initClient({
		url: import.meta.env.VITE_APP_GRAPHQL_ENDPOINT.toString(),
		exchanges: [debugExchange, ...defaultExchanges],
		fetchOptions: () => {
			return {
				headers: {
					'x-hasura-admin-secret': import.meta.env.VITE_APP_HASURA_GRAPHQL_ADMIN_SECRET.toString()
				}
			};
		}
	});

	const profiles = operationStore(`
		query MyQuery {
			profiles {
				firstName
				id
				lastName
				position
			}
		}
	`);
	const books = operationStore(`
    subscription BookSub {
		books {
			name
			description
		}
    }
  `);

	query(profiles);

	// const handleSubscription = (profiles = [], data) => {
	// 	console.log('data', data);
	// 	console.log('profiles', data.profiles);
	// 	return [data.profiles, ...profiles];
	// };
	// subscription(profiles, handleSubscription);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="mx-4 px-2 py-2 text-center">
	{#if $profiles.fetching}
		<p class="text-green-600">Loading...</p>
	{:else if $profiles.error}
		<p class="text-red-600">Oh no... {$profiles.error.message}</p>
	{:else}
		<div class="">
			{#each $profiles.data?.profiles as { firstName, lastName, position }}
				<div class="my-2 bg-white px-2 py-2 rounded-lg flex flex-row space-x-4">
					<div class="text-blue-500">
						{firstName}
						{lastName} : <span class="text-sm text-purple-500">{position}</span>

						<span class="text-orange-600">edit</span>
						<span class="text-red-600">delete</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div>
		{JSON.stringify($books)}
		{#if $books.fetching}
			<p>Loading...</p>
		{:else if $books.error}
			<p class="text-red-600">Oh no... {$books.error.message}</p>
		{:else}
			<ul>
				{#each $books.data as { name, description }}
					<li>{name}: {description}</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
