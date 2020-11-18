module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'google'
    ],
    'rules': {
        'max-len': ['error', {'code': 125}],
        'indent': ['error', 4],
    },
    'parserOptions': {
        'sourceType': 'module',
    },
    'parser': '@typescript-eslint/parser',
}

