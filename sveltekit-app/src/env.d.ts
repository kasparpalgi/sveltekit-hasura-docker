interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
