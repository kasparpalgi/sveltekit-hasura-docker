import { client } from '$lib/graphql/graphql-client';
import { gql } from 'graphql-request';

export const get = async (): Promise<unknown> => {
    try {
        const query = gql`
			query {
				profiles {
					id
					firstName
					lastName,
                    position
				}
			}
		`;
        const { profiles } = await client.request(query);
        return {
            status: 200,
            body: { profiles }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'internal server error' }
        };
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = async (request) => {
    const { body } = request;
    try {
        const mutation = gql`
			mutation ProfileMutation($firstName: String!, $lastName: String!, $position: String!) {
                insert_profiles(objects: {firstName: $firstName, lastName: $lastName, position: $position}) {
                    affected_rows
                    returning {
                        firstName
                        id
                        lastName,
                        position
                    }
                }
            }

		`;
        const { insert_profiles } = await client.request(mutation, { ...body });
        return {
            status: 200,
            body: insert_profiles
        };
    } catch (error) {
        return {
            status: 500,
            body: error
        };
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const del = async (request) => {
    const { body } = request;
    try {
        const mutation = gql`
			mutation DeleteProfile($id: Int!) {
                delete_profiles(where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        firstName
                        id
                        lastName
                        position
                    }
                }
            }
		`;
        const { delete_profiles } = await client.request(mutation, { ...body });
        return {
            status: 200,
            body: delete_profiles
        };
    } catch (error) {
        return {
            status: 500,
            body: error
        };
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const put = async (request) => {
    const { body } = request;
    try {
        const mutation = gql`
			mutation UpdtaeProfile($id: Int!, $firstName: String!, $lastName: String!, $position: String!) {
                update_profiles(where: {id: {_eq: $id}}, _set: {firstName: $firstName, lastName: $lastName, position: $position}) {
                    affected_rows
                    returning {
                        firstName
                        id
                        lastName
                        position
                    }
                }
            }

		`;
        const { update_profiles } = await client.request(mutation, { ...body });
        return {
            status: 200,
            body: update_profiles
        };
    } catch (error) {
        return {
            status: 500,
            body: error
        };
    }
};

