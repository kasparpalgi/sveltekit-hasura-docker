import preprocess from 'svelte-preprocess';


const config = {
	preprocess: [preprocess({
        postcss: true
    })],

	kit: {
		target: '#svelte',
		vite: {
			optimizeDeps: {
				exclude: ['@urql/svelte'],
			}

		}
	}
};

export default config;
