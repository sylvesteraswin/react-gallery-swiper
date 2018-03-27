module.exports = {
    parser: 'babel-eslint',
    plugins: [
        'react'
    ],
    rules: {
        'indent': [2, 4],
        'strict': 0,
        'quotes': [1, 'single'],
        'curly': [1, 'multi-line'],
        'camelcase': 0,
        'comma-dangle': [1, 'always-multiline'],
        'no-console': 2,
        'no-use-before-define': [1, 'nofunc'],
        'no-underscore-dangle': 0,
        'no-unused-vars': 1,
        'new-cap': 0,
        'prefer-const': 1,
        'max-len': [1, 180, 4],
        'semi': 1
    },
    env: {
        'browser': true,
        'node': true
    },
    globals: {
        React: 'React',
        ReactDOM: 'ReactDOM'
    },
};