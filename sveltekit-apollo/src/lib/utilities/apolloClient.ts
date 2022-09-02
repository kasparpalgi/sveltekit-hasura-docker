
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

// ENV
const GRAPHQL_ENDPOINT: string = import.meta.env.VITE_APP_GRAPHQL_ENDPOINT.toString();
const HASURA_GRAPHQL_ADMIN_SECRET: string = import.meta.env.VITE_APP_HASURA_GRAPHQL_ADMIN_SECRET.toString();


const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
    },
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
