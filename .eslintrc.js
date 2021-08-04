module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		settings: {
			react: {
				version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
			}
		},
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	extends: [
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		//'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	rules: {
		'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
		'@typescript-eslint/explicit-function-return-type': 'off'
	},
	overrides: [
		// Override some TypeScript rules just for .js files
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off' //
			}
		}
	]
};
