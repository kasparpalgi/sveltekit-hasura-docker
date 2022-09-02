
import { client } from "$lib/utilities/apolloClient";
import { gql } from '@apollo/client'


export const get = async (): Promise<unknown> => {
    try {
        const query = gql`
			query ProfileQuery {
				profiles {
					id
					firstName
					lastName
                    position
				}
			}
		`;
        const data = await client.query({
            query
        });
        return {
            status: 200,
            body: { data }
        };
    } catch (error) {
        console.error('Error: ', error);
        return {
            status: 500,
            error: 'Error receiving data'
        };
    }
}
export const post = async ({ body }): Promise<unknown> => {
    try {
        const mutation = gql`
			mutation ProfileMutation($firstName: String!, $lastName: String!, $position: String!) {
                insert_profiles(objects: {firstName: $firstName, lastName: $lastName, position: $position}) {
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
        const { data } = await client.mutate({
            mutation,
            variables: { ...body }
        });
        return {
            status: 200,
            body: { data }
        };
    } catch (error) {
        console.error('Error: ', error);
        return {
            status: 500,
            error: 'Error receiving data'
        };
    }
}