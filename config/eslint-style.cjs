module.exports = {
  rules: {
    'no-var': 'error', // Use let, const
    'prefer-const': ['error', { // Use consts when possible
      'destructuring': 'all',
      'ignoreReadBeforeAssign': false
    }],
    'eqeqeq': ['error'], // Require === and !==
    'quotes': ['error', 'single'], // Require '' quotes
    'curly': ['error', 'multi-line'], // Enforce braces for statements
    'indent': ['error', 2], // Require indentation (2 spaces)
    'no-extra-semi': 'error', // Disallow unnecessary semicolons
    'semi': ['error', 'never'], // Disallow semicolons
    'prefer-spread': 'error', // Enforce spread operators (...)
    'prefer-template': 'error', // Enforce string templates (`${}`)
    'dot-notation': 'error', // Enforce prop.name instead of prop['name']
    'default-case': 'error', // Require default case in switch
  }
}