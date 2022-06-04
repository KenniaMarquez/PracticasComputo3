declare const registryUrl: {
	/**
	Get the set npm registry URL.

	@param scope - Retrieve the registry URL associated with an [npm scope](https://docs.npmjs.com/misc/scope). If the provided scope is not in the user's `.npmrc` file, then `registry-url` will check for the existence of `registry`, or if that's not set, fallback to the default npm registry.

	@example
	```
	import registryUrl = require('registry-url');

	// # .npmrc
	// registry = 'https://custom-registry.com/'

	console.log(registryUrl());
	//=> 'https://custom-registry.com/'


	// # .npmrc
	// @myco:registry = 'https://custom-registry.com/'

	console.log(registryUrl('@myco'));
	//=> 'https://custom-registry.com/'
	```
	*/
	(scope?: string): string;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function registryUrl(scope?: string): string;
	// export = registryUrl;
	default: typeof registryUrl;
};

export = registryUrl;
