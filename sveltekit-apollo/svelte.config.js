import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-static';


const config = {
	preprocess: [preprocess({
        postcss: true
    })],

	kit: {
		// adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
